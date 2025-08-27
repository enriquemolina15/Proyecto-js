"use strict"

async function grabarDato(nombre, valor) {
    console.log("Grabando dato...");

    return new Promise((resultado, error) => {
        const transaccion = db.transaction(["campos"], "readwrite");
        const almacen = transaccion.objectStore("campos");

        const registro = { nombre, valor };

        const peticion = almacen.put(registro);

        peticion.onsuccess = async function (event) {
            console.log("✅ Dato guardado correctamente");
            resultado(event.target.result); // <- aquí resuelves la promesa
            await mostrarDatos();
            
        }

        peticion.onerror = function (event) {
            console.error(`❌ Error al guardar el dato: ${event}`);
            error(event.error); // <- aquí rechazas la promesa
        }
    });
    
}