// Usuarios predefinidos para la validación
const validUser = {
  username: 'admin',
  password: '12345'
};

// Función para validar el login
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validar usuario y contraseña
  if (username === validUser.username && password === validUser.password) {
    alert('¡Inicio de sesión exitoso!');
    // Redirigir a otra página (por ejemplo: Dashboard)
    window.location.href = "dashboard.html";
  } else {
    document.getElementById('error-message').style.display = 'block';
  }
});
