"use strict"
if (localStorage.getItem("logueado") !== "true") {
    
  window.location.href = "../../../../auth/index.html";
}
function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "../../../../auth/index.html";
}

let modoGuardar = false;
let contador = 0;
let memoriaA = null;
let memoriaB = null;
let memoriaUsada = false;
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("checkbox");
    const botones = document.querySelectorAll(".teclado button");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {

            for (let i = 0; i < botones.length; i++) {
                botones[i].disabled = false;
            }
            input.innerHTML = "0";
            console.log("En swicht apagado: "+contador);
           contador++
            resultado.innerHTML = "Resultado:"
        } else {

            for (let i = 0; i < botones.length; i++) {
                botones[i].disabled = true;
            }
            contador = 0;
            console.log("En swicht encendido: "+contador);

            input.innerHTML = "";
            resultado.innerHTML = "";
        }
    });


    checkbox.checked = false;
    botones.forEach(boton => boton.disabled = true);
});


const input = document.getElementById("expresion");
const resultado = document.getElementById("resultado");
const guardado = document.getElementById("guardado");
const interruptor = document.getElementById("checkbox");

let resultadoMostrado = false;
function activarGuardado() {
    if (resultado.textContent.trim() !== "") {
        modoGuardar = true;
      
        console.log("Modo guardado activado");
    }
}
function mostrarMensajeGuardado(texto) {
    const guardadoDiv = document.getElementById("guardado");
    guardadoDiv.textContent = texto;
     guardadoDiv.style.color =" #f252a5;"
    setTimeout(() => {
        guardadoDiv.textContent = "";
    }, 2000);
}
function usarMemoria(letra) {
    const valorResultado = resultado.textContent.replace("Resultado:", "").trim();
    contador++;
            console.log("En memoria: "+contador);

    if (contador <= 2) {
        input.innerHTML = "";

    }
    if (modoGuardar) {
        if (valorResultado !== "") {
            if (letra === "A") {
                memoriaA = valorResultado;
                mostrarMensajeGuardado("Guardado en A") ;
                console.log("Guardado en A:", memoriaA);
                
            } else if (letra === "B") {
                memoriaB = valorResultado;
                
                mostrarMensajeGuardado("Guardado en B") ;
                guardado.innerHTML = "Gardado en B"
                console.log("Guardado en B:", memoriaB);
            }
            modoGuardar = false;
            memoriaUsada = false; 
        }
    } else if (!memoriaUsada) {
        if (letra === "A" && memoriaA !== null) {
            input.textContent += memoriaA;
            memoriaUsada = true;
        } else if (letra === "B" && memoriaB !== null) {
            input.textContent += memoriaB;
            memoriaUsada = true;
        }
    }
}


function agregar(valor) {
   
    console.log("contador: "+contador)
    memoriaUsada = false;
    if (contador ==1) {
        console.log("TTTTTTT")
        input.innerHTML = "";
        
        contador ++;
            console.log("En agregar: "+contador);

    }

    const operadores = ['+', '-', '*', '/', '^', '.', '(', ')', 'pi', 'e', 'sqrt(', 'log(', 'ln(', 'sin(', 'cos(', 'tan(', 'rnd('];
    const funciones = ['sqrt(', 'log(', 'ln(', 'sin(', 'cos(', 'tan(', 'rnd(',];

    let expresion = input.innerHTML;
    resultado.innerHTML = "Resultado:";

    // Verifica si hay paréntesis abiertos sin cerrar
    const abiertos = (expresion.match(/\(/g) || []).length;
    const cerrados = (expresion.match(/\)/g) || []).length;
    const hayParentesisSinCerrar = abiertos > cerrados;

    // Si hay un paréntesis abierto sin cerrar y se intenta insertar otra función, la bloqueamos
    if (hayParentesisSinCerrar && funciones.includes(valor)) {
        return; // Bloquea la función anidada
    }
    //  Si resultado fue mostrado y se intenta agregar un número, se bloquea
    if (resultadoMostrado && /^[0-9]$/.test(valor)) {


        return;
    }

    //Si resultado fue mostrado y se agrega un operador, se permite y se reinicia estado
    if (resultadoMostrado && operadores.includes(valor)) {
        resultadoMostrado = false;
    }

    // Detectar el último operador completo (no solo un carácter)
    const ultimoOperador = operadores.find(op => expresion.endsWith(op));

    if (operadores.includes(valor) && ultimoOperador) {
        // Reemplaza el operador anterior con el nuevo
        input.innerHTML = expresion.slice(0, -ultimoOperador.length) + valor;
        return;
    }

    input.innerHTML += valor;
}



function borrar() {
    memoriaUsada= false;
    input.innerHTML = input.innerHTML.slice(0, -1);
    resultado.textContent = "Resultado: ";
    resultadoMostrado = false;
}

function limpiar() {
    memoriaUsada= false;
    input.innerHTML = "0";
    contador = 1;
    resultado.textContent = "Resultado: ";
    resultadoMostrado = false;
            console.log("En limpiar: "+contador);

}


function calcular() {
    try {
        let expr = input.innerHTML.trim();

        if (!expr) {
            resultado.textContent = "Introduce una expresión";
            return;
        }

        expr = expr
            .replace(/pi/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/rnd\s*\(\s*([\d.]+)\s*\.\s*([\d.]+)\s*\)/g, (_, min, max) => {
                min = parseFloat(min);
                max = parseFloat(max);
                if (isNaN(min) || isNaN(max)) throw new Error("Parámetros inválidos en rnd");
                return `(${min} + Math.random() * (${max} - ${min}))`;
            })


            .replace(/\^/g, '**');

        // Convertir grados a radianes
        expr = expr.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (_, fn, val) => {
            return `Math.${fn}((${val})*Math.PI/180)`;
        });

        let result = eval(expr);

        if (isNaN(result) || !isFinite(result)) throw new Error();


        resultado.textContent = "Resultado: " + result;
        resultadoMostrado = true;



    } catch (e) {
        resultado.textContent = "Error en la expresión";
    }
}
function cientifica() {
    const panel = document.getElementById("cientifica");

    panel.classList.toggle("mostrar");
}
