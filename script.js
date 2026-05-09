// Function to load HTML components
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading ' + file, error));
}

// Call the function for both header and footer
loadComponent('header-placeholder', '../components/header.html');
loadComponent('footer-placeholder', '../components/footer.html');

