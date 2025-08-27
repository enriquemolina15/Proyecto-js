'use strict';

async function conectarDB() {
    return new Promise((resultado, error) => {
        const peticion = indexedDB.open("Datos", 1);

        peticion.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("campos")) {
                db.createObjectStore("campos", { keyPath: "nombre" });
            }
            console.log("evento", event);
        };

        peticion.onsuccess = function (event) {
            resultado(event.target.result);
            console.log("✅ Base de datos abierta:", event.target.result);
        };

        peticion.onerror = function (event) {
            error(event);
            console.error("❌ Error al abrir la base de datos:", event);
        };
    });
}
