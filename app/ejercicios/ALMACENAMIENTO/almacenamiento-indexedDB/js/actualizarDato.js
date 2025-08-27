'use strict';

async function actualizarDato(nombre, valor) {
  const campoNombre = document.getElementById("nombre");
  const campoValor = document.getElementById("valor");
    
  campoNombre.value = nombre;
  campoValor.value = valor;
  await borrarDato(nombre);

 
  
}
