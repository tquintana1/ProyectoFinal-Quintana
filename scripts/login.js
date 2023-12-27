document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si el usuario está autenticado al cargar la página
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    const mainContent = document.getElementById("mainContent");
    const loginMessage = document.getElementById("loginMessage");
    const userEmailText = document.getElementById("userEmailText"); // Nuevo elemento

    if (isLoggedIn) {
        mainContent.style.display = "block";
        loginMessage.style.display = "none";

        // Mostrar el correo electrónico en el elemento p
        userEmailText.textContent = `Bienvenido, ${userEmail}!`;
    } else {
        mainContent.style.display = "none";
        loginMessage.style.display = "block";
    }

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Realizar la solicitud asíncrona para obtener los datos del archivo datos.json
        fetch("datos.json")
            .then(response => response.json())
            .then(data => {
                // Verificar si el usuario existe
                const userExists = data.some(user => user.email === email && user.password === password);

                if (userExists) {
                    // Almacenar el estado de autenticación en el localStorage
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userEmail", email);
                    // Mostrar el contenido principal
                    mainContent.style.display = "block";
                    loginMessage.style.display = "none";
                    location.reload();
                } else {
                    // Mostrar un mensaje de error
                    alert("Usuario no encontrado. Verifica tu correo electrónico y contraseña.");
                }
            })
            .catch(error => {
                console.error("Error al cargar datos.json:", error);
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");

    // Comprobar si el usuario está autenticado al cargar la página
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
        // Usuario autenticado
        loginButton.textContent = "Desconectar";
        // También puedes agregar lógica adicional aquí según tu necesidad
    } else {
        // Usuario no autenticado
        loginButton.textContent = "Login";
    }

    // Agregar un evento de clic al botón
    loginButton.addEventListener("click", function () {
        if (isLoggedIn) {
            // Si el usuario está autenticado, desconectar
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail"); // Eliminar el correo electrónico del localStorage
            location.reload(); // Recargar la página después de desconectar
        } else {

        }
    });
}); 