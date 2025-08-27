"use strict"

function todoMayusculas() {
    texto.value = texto.value.toUpperCase();
}

function primeraMayuscula() {
    const palabras = texto.value.split(" "); 

    for (let i in palabras) { 
        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].substring(1);
    }
    texto.value = palabras.join(" "); 
}

function ultimaMayuscula() {
    const palabras = texto.value.split(" "); 

    for (let i in palabras) { 
        palabras[i] = palabras[i].substring(0, palabras[i].length - 1) + palabras[i].charAt(palabras[i].length - 1).toUpperCase();
    }
    texto.value = palabras.join(" "); 
}

function vocalesMayusculas() {
    const caracteres = texto.value.split(""); 

    for (let i in caracteres) { 
        if (caracteres[i] == 'a' || caracteres[i] == 'e' || caracteres[i] == 'i' || caracteres[i] == 'o' || caracteres[i] == 'u') {
            caracteres[i] = caracteres[i].toUpperCase();
        }
        texto.value = caracteres.join(""); 
    }
}

function consonantesMayusculas() {
    const caracteres = texto.value.split(""); 

    for (let i in caracteres) { 
        if (!(caracteres[i] == 'a' || caracteres[i] == 'e' || caracteres[i] == 'i' || caracteres[i] == 'o' || caracteres[i] == 'u')) {
            caracteres[i] = caracteres[i].toUpperCase();
        }
        texto.value = caracteres.join(""); 
    }
}

