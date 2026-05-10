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
| `POST` | `/contact` | Send a contact message |

### `POST /contact` — Request body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to order a custom box."
}
```

**Frontend integration point:** `src/components/ContactForm.jsx` — the form `onSubmit` handler.

---

## Authentication (future)

If you later add user accounts, you will need:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Log in, returns a token |
| `POST` | `/auth/logout` | Invalidate the session |
| `GET` | `/auth/me` | Return the logged-in user's profile |

The recommended approach is **JWT tokens** stored in an `httpOnly` cookie (not localStorage) for security.

---

## Notes for the backend developer

- All responses should return `Content-Type: application/json`.
- Use standard HTTP status codes: `200` OK, `201` Created, `400` Bad Request, `404` Not Found, `500` Server Error.
- CORS must allow requests from the frontend origin (e.g. `https://si-luxury-chocolate.ch`).
- Prices are stored and returned as **integers in CHF** (e.g. `12` = CHF 12.00).
