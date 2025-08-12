let i = 0;
let txt = "Erick Barrios Arias.";
let speed = 80;
let borrando = false;

function typeWrite() {
    const elemento = document.getElementById("text");

    if (!borrando) {
        // Escribir
        elemento.innerHTML = txt.slice(0, i);
        i++;
        if (i > txt.length) {
            borrando = true;
            setTimeout(typeWrite, 1000); // Pausa antes de borrar
            return;
        }
    } else {
        // Borrar pero dejando la primera letra
        elemento.innerHTML = txt.slice(0, i);
        i--;
        if (i < 2) { // Aquí el límite es 1, no 0
            borrando = false;
        }
    }

    setTimeout(typeWrite, speed);
}

typeWrite();