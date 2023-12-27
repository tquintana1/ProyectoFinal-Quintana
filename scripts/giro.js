const juego = {
    jugando: false,
    contadorGiros: 0,
    intervalo: null,
    costoGiro: 10,
    saldo: 100,
    historial: [],
};

const numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

let colorGanador;
let apuestaUsuario;

function girarRuleta() {
    if (!juego.jugando) {
        const saldoInput = document.getElementById("saldo");
        const colorSelect = document.getElementById("colorSelect");

        if (juego.saldo >= juego.costoGiro) {
            juego.jugando = true;
            juego.contadorGiros++;
            juego.saldo -= juego.costoGiro;
            actualizarSaldo();
            spinButton.textContent = "Detener";

            saldoInput.disabled = true;
            colorSelect.disabled = true;

            juego.intervalo = setInterval(function () {
                const numeroGanador = Math.floor(Math.random() * 37);
                colorGanador = obtenerColor(numeroGanador);
                mostrarNumero(numeroGanador, colorGanador);
            }, 100);

            setTimeout(function () {
                detenerGiro();
            }, 1500);
        } else {
            alert("No tienes suficiente saldo para realizar un giro.");
        }
    } else {
        detenerGiro();
    }
}
function detenerGiro() {
    clearInterval(juego.intervalo);

    if (juego.jugando) {
        juego.jugando = false;
        spinButton.textContent = "Girar";
        apuestaUsuario = document.getElementById("colorSelect").value;
        mostrarResultado();
        juego.historial.push({
            numero: colorGanador,
            resultado: apuestaUsuario === colorGanador ? "Ganó" : "Perdió",
        });

        mostrarHistorial();
        const saldoInput = document.getElementById("saldo");
        const colorSelect = document.getElementById("colorSelect");
        saldoInput.disabled = false;
        colorSelect.disabled = false;
    }
}

function obtenerColor(numero) {
    if (numero === 0) {
        return "verde";
    } else if (numerosRojos.includes(numero)) {
        return "rojo";
    } else {
        return "negro";
    }
}

function mostrarNumero(numero, color) {
    const numeroElement = document.createElement("span");
    numeroElement.textContent = `${numero} (${color})`;
    numeroElement.style.color = color;

    resultElement.innerHTML = "";
    resultElement.appendChild(numeroElement);
}

function mostrarResultado() {
    const resultadoElement = document.createElement("p");

    if (apuestaUsuario === colorGanador) {
        juego.saldo += juego.costoGiro * 2; 
        resultadoElement.textContent = `¡Ganaste $${juego.costoGiro * 2}!`;
        resultadoElement.style.color = "green";
        reproducirSonidoGanancia(); 
    } else {
        resultadoElement.textContent = `Perdiste $${juego.costoGiro}. Intenta de nuevo.`;
        resultadoElement.style.color = "red";
        reproducirSonidoPerdida(); 
    }

    actualizarSaldo(); 
    resultElement.appendChild(resultadoElement);
}

function reproducirSonidoGanancia() {
    const audio = new Audio('sounds/ganaste.mp3');
    audio.play();
}

function reproducirSonidoPerdida() {
    const audio = new Audio('sounds/pierdes.mp3');
    audio.play();
}

function actualizarSaldo() {
    const saldoText = document.getElementById("saldo");
    saldoText.value = juego.saldo;
}

function reproducirSonido() {
    const audio = new Audio('sounds/ruleta.mp3');
    audio.play();
}

const spinButton = document.getElementById("spinButton");
const resultElement = document.getElementById("result");
spinButton.addEventListener("click", function () {
    girarRuleta();
    reproducirSonido();
});

function actualizarSaldoManual() {
    const saldoInput = document.getElementById("saldo");
    const nuevoSaldo = parseFloat(saldoInput.value) || 0; 

    juego.saldo = nuevoSaldo;
    actualizarSaldo(); 
}

function mostrarHistorial() {
    const historialElement = document.getElementById("historial");
    historialElement.innerHTML = ""; 
    juego.historial.forEach((jugada, index) => {
        const jugadaElement = document.createElement("p");
        if (jugada.resultado === "Ganó") {
            jugadaElement.style.color = "green";
        } else {
            jugadaElement.style.color = "red";
        }
        jugadaElement.textContent = `Jugada ${index + 1}: Número ${jugada.numero}, Resultado: ${jugada.resultado}`;
        historialElement.appendChild(jugadaElement);
    });
}
