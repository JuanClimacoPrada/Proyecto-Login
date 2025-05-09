document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevenir que se envíe el formulario por defecto
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enviar los datos al backend usando fetch (POST)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir a la página principal del hotel
            window.location.href = '/dashboard';
        } else {
            alert('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
