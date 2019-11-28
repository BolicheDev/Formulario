'use strict'

window.onload = iniciar;

var baseDatos = {
    'indexedDB': '',
    'IDBKeyRange': '',
    'IDBKeyTransaction': '',
    'conn': '',
    'nombre': '',
    'crear': function(nombre, arrayTablas) {
        this.indexedDB = window.indexedDB;
        this.IDBKeyRange = window.IDBKeyRange;
        this.IDBKeyTransaction = window.IDBKeyTransaction;

        this.conn = this.indexedDB.open(nombre);

        this.nombre = nombre;

        this.conn.onupgradeneeded = function() {
            arrayTablas.forEach(tabla => {
                this.result.createObjectStore(tabla[0], {
                    keyPath: "id" + tabla[0],
                    autoIncrement: tabla[1]
                });
            });
        }
    },
}

function iniciar() {
    document.getElementById("añadirTablas").addEventListener("click", añadirTabla);
    document.getElementById("crearBDD").addEventListener("click", crearBDD);
}

function añadirTabla() {
    let padre = document.getElementById("tablas");
    let nuevaTabla = document.createElement("div");
    nuevaTabla.setAttribute("name", "tabla");
    nuevaTabla.setAttribute("class", "margen");
    nuevaTabla.innerHTML = "Nombre de tabla: ";
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "nombre");
    nuevaTabla.append(input);
    nuevaTabla.innerHTML += " , auto increment ";
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "auto");
    nuevaTabla.append(check);
    padre.append(nuevaTabla);
}

function crearBDD() {
    let nombre = document.getElementById("nombre").value;
    var arrayCrearTablas = [];
    let arrayTablas = document.getElementsByName("tabla");
    arrayTablas.forEach(tabla => {
        let nombreTabla = tabla.firstChild.nextSibling.value;
        let check = tabla.lastChild.checked;
        let arrayTabla = [nombreTabla, check];
        arrayCrearTablas.push(arrayTabla);
    })
    baseDatos.crear(nombre, arrayCrearTablas);
}