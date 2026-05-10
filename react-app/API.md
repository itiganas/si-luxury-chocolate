# SI Luxury Chocolate — Backend API Reference

This document lists every API endpoint the frontend will need once a backend is implemented.
The frontend currently uses `localStorage` for the cart. Each section notes exactly where in the code the swap needs to happen.

---

## Base URL

All endpoints are relative to a base URL, e.g. `https://api.si-luxury-chocolate.ch/v1`.

---

## 1. Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Return all products |
| `GET` | `/products/:id` | Return a single product by ID |

### `GET /products` — Response
```json
[
  {
    "id": 1,
    "name": "Dark Truffle",
    "price": 12,
    "image": "/images/choco_truffle.png",
    "description": "Rich dark chocolate truffle"
  }
]
```

**Frontend integration point:** `src/pages/ShopPage.jsx` and `src/pages/HomePage.jsx`.
Replace the hardcoded `products` arrays with a `fetch('/products')` call inside a `useEffect`.

---

## 2. Cart

The cart is currently managed client-side in `localStorage` (see `src/context/CartContext.jsx`).
If you want the cart to be server-side (e.g. to persist across devices or for logged-in users), implement these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cart` | Return the current user's cart |
| `POST` | `/cart/items` | Add an item to the cart |
| `PUT` | `/cart/items/:productId` | Update quantity of a cart item |
| `DELETE` | `/cart/items/:productId` | Remove one item from the cart |
| `DELETE` | `/cart` | Clear the entire cart |

### `POST /cart/items` — Request body
```json
{ "productId": 1, "quantity": 1 }
```

### `GET /cart` — Response
```json
{
  "items": [
    { "productId": 1, "name": "Dark Truffle", "price": 12, "quantity": 2 }
  ],
  "total": 24
}
```

**Frontend integration point:** `src/context/CartContext.jsx`.
Replace the `localStorage` reads/writes with API calls. The context shape does not need to change.

---

## 3. Orders

Called when the user clicks **Checkout** on the bag page.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders` | Place a new order |
| `GET` | `/orders` | List orders for the current user |
| `GET` | `/orders/:id` | Get details of a single order |

### `POST /orders` — Request body
```json
{
  "items": [
    { "productId": 1, "quantity": 2 }
  ],
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "address": "Bahnhofstrasse 1, 8001 Zürich"
  },
  "paymentMethod": "card"
}
```

### `POST /orders` — Response
```json
{
  "orderId": "ORD-2026-001",
  "status": "confirmed",
  "total": 24
}
```

**Frontend integration point:** `src/pages/BagPage.jsx` — the **Checkout** button handler.

---

## 4. Contact Form

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/contact` | Send a contact message |

### Request body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to order a custom box."
}
```

### Success response — `200 OK`
```json
{ "message": "Message received. We will be in touch shortly." }
```

### Error response — `400 Bad Request` (e.g. missing fields)
```json
{ "error": "All fields are required." }
```

**Frontend integration point:** `src/components/ContactForm.jsx` — the `handleSubmit` function already calls `POST /api/v1/contact`. Just start the backend and it will connect automatically.

---

### Java (Spring Boot) implementation guide

#### 1. DTO — `ContactRequest.java`

```java
public class ContactRequest {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String message;

    // getters + setters
}
```

#### 2. Controller — `ContactController.java`

```java
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173") // your React dev URL
public class ContactController {

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(
            @Valid @RequestBody ContactRequest request) {

        // Option A: just log it for now
        System.out.println("Contact from: " + request.getName() + " <" + request.getEmail() + ">");
        System.out.println("Message: " + request.getMessage());

        // Option B: save to database (add a ContactMessage entity + repository)
        // contactRepository.save(new ContactMessage(request));

        // Option C: send an email (add Spring Mail + configure SMTP in application.properties)
        // mailService.send(request);

        return ResponseEntity.ok(Map.of("message", "Message received. We will be in touch shortly."));
    }
}
```

#### 3. CORS (global config) — `WebConfig.java`

If you prefer a global CORS config over `@CrossOrigin` on every controller:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "https://si-luxury-chocolate.ch")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

#### 4. Validation dependency — `pom.xml`

Make sure you have this dependency so `@Valid`, `@NotBlank`, and `@Email` work:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

#### 5. Sending an email (optional but recommended for a real shop)

Add to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

Add to `application.properties`:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## 5. Authentication — Google OAuth2 via Spring Boot Gateway

The Spring Boot Gateway acts as the **OAuth2 Client**. The frontend never handles tokens or interacts with Google directly — it only redirects the browser to the Gateway and reads the resulting session.

### Login flow (step by step)

```
User clicks "Login with Google"
  → browser redirects to  GET  {GATEWAY_URL}/oauth2/authorization/google
  → Gateway redirects to Google consent screen
  → Google authenticates and redirects back to Gateway
  → Gateway creates a session cookie (HttpOnly, Secure)
  → Gateway redirects browser back to the frontend (e.g. /)
  → Frontend calls  GET  /api/v1/auth/me  (with cookie) to get user info
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `{GATEWAY_URL}/oauth2/authorization/google` | Start Google login — **browser redirect, not a fetch call** |
| `POST` | `{GATEWAY_URL}/logout` | Invalidate the session |
| `GET` | `/api/v1/auth/me` | Return the logged-in user's profile |

> `GATEWAY_URL` is the base gateway URL (e.g. `http://localhost:8080`), configured via `VITE_GATEWAY_URL` in the `.env` files.

### `GET /api/v1/auth/me` — Response (logged in)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "picture": "https://lh3.googleusercontent.com/..."
}
```

### `GET /api/v1/auth/me` — Response (not logged in)
```
HTTP 401 Unauthorized
```

**Frontend integration point:** `src/context/AuthContext.jsx` — already implemented. The `useEffect` on mount calls this endpoint to restore the session on page refresh.

---

### Java (Spring Boot Gateway) implementation guide

#### 1. Dependencies — `pom.xml`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

#### 2. Google credentials — `application.yml`

Register your app at https://console.cloud.google.com → APIs & Services → Credentials.
Set the **Authorized redirect URI** to: `{GATEWAY_URL}/login/oauth2/code/google`

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: YOUR_GOOGLE_CLIENT_ID
            client-secret: YOUR_GOOGLE_CLIENT_SECRET
            scope: openid, profile, email
```

#### 3. Security config — `SecurityConfig.java`

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())   // disable for REST APIs; re-enable if using form login
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/me").authenticated()
                .requestMatchers("/api/v1/contact").permitAll()
                .requestMatchers("/api/v1/products/**").permitAll()
                .anyRequest().permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                // After successful Google login, redirect back to the React app
                .defaultSuccessUrl("http://localhost:5173/", true)
            )
            .logout(logout -> logout
                // After logout, redirect back to the React app home
                .logoutSuccessUrl("http://localhost:5173/")
            );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
            "http://localhost:5173",          // local dev
            "https://te1.si-luxury-chocolate.ch",  // TE1
            "https://si-luxury-chocolate.ch"  // production
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);  // required for session cookies to be sent
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

#### 4. Auth endpoint — `AuthController.java`

```java
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(
            @AuthenticationPrincipal OidcUser oidcUser) {

        if (oidcUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, String> user = Map.of(
            "name",    oidcUser.getFullName(),
            "email",   oidcUser.getEmail(),
            "picture", oidcUser.getPicture()
        );
        return ResponseEntity.ok(user);
    }
}
```

> `OidcUser` is injected automatically by Spring Security when the user is logged in via Google (which supports OpenID Connect). No manual token parsing needed.

#### 5. Important: CORS + cookies

The frontend sends `credentials: 'include'` on every API call so the session cookie is included. For this to work the backend **must**:
- Set `allowCredentials(true)` in the CORS config (done above)
- **Never** use `allowedOrigins("*")` when `allowCredentials` is true — Spring will reject it

---

## Notes for the backend developer

- All responses should return `Content-Type: application/json`.
- Use standard HTTP status codes: `200` OK, `201` Created, `400` Bad Request, `404` Not Found, `500` Server Error.
- CORS must allow requests from the frontend origin (e.g. `https://si-luxury-chocolate.ch`).
- Prices are stored and returned as **integers in CHF** (e.g. `12` = CHF 12.00).
