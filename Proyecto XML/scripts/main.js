
function filtrarTablaPorNombre() {
  // Obtiene el valor del campo de búsqueda
  var busqueda = document.getElementById("campo-busqueda").value.toLowerCase();

  // Obtiene la tabla
  var tabla = document.getElementById("tabla");

  // Obtiene las filas de la tabla
  var filas = tabla.getElementsByTagName("tr");

  // Recorre las filas de la tabla
  for (var i = 0; i < filas.length; i++) {
    // Obtiene el texto de la celda con el nombre
    var celdaNombre = filas[i].getElementsByTagName("td")[0].textContent.toLowerCase();

    // Si el texto de la celda no contiene el valor de búsqueda, oculta la fila
    if (celdaNombre.indexOf(busqueda) === -1) {
      filas[i].style.display = "none";
    } else {
      filas[i].style.display = "";
    }
  }
}

// Funcion para validar el login. Si el usuario y la contraseña son correctos, se redirige a la pagina de la tabla
// Si no son correctos, se muestra un mensaje de error debajo del formulario
// En esta ocasión por simplificar el ejemplo, se asume que el usuario y la contraseña son "admin" y "1234"
function validarLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("login-error");
  
    if (username === "admin" && password === "1234") {
      window.location.href = "tabla.html";
      userLogged = true;
    } else {
      console.log("Usuario o contraseña incorrectos");
      errorMessage.textContent = "Usuario o contraseña incorrectos";
    }
}

// Funcion para cerrar sesion y salir de la pagina de la tabla
// y redirige a la pagina de login nuevamente. Se cambia la variable global para saber si el usuario ha iniciado sesion
// Se muestra un alert para indicar que se ha cerrado sesion
function logout() {
  window.location.href = "login.html";
  alert("Has cerrado sesion");
  userLogged = false;
}

// Funcion que se ejecuta cuando se carga la pagina
// Carga datos desde archivos XML y crea filas en la tabla con la información obtenida. 
// Esta función se ejecuta cuando el documento está listo (DOMContentLoaded) y utiliza Fetch para obtener el contenido de los archivos XML.
// Los datos obtenidos se utilizan para crear filas en la tabla con la información correspondiente.
document.addEventListener("DOMContentLoaded", () => {
  function fetchData() {
    const archivos = ["altavoces.xml", "consolas.xml", "ordenadores.xml", "televisores.xml", "telefonos.xml"]; // Archivos XML a cargar
    const tabla = document.getElementById("tabla"); // Tabla donde se muestran los datos

    const datosManual = { // Datos puestos manualmente
      "altavoces": { descripcion: "Altavoces Bluetooth", fecha: "2023-11-01", sku: "ALT123", ubicacion: "Almacén A" },
      "consolas": { descripcion: "Consola de videojuegos", fecha: "2023-10-15", sku: "CON456", ubicacion: "Almacén B" },
      "ordenadores": { descripcion: "Ordenador portátil", fecha: "2023-09-20", sku: "ORD789", ubicacion: "Almacén C" },
      "televisores": { descripcion: "Smart TV 4K", fecha: "2023-12-05", sku: "TV101", ubicacion: "Almacén D" },
      "telefonos": { descripcion: "Teléfono móvil", fecha: "2023-08-30", sku: "TEL202", ubicacion: "Almacén E" },
    };

    archivos.forEach(archivo => { // Recorre los archivos y carga los datos
      fetch(`../data/${archivo}`)
        .then(response => response.text())
        .then(() => {
          const nombreArchivo = archivo.replace(".xml", ""); // Obtiene el nombre del archivo sin la extensión
          const info = datosManual[nombreArchivo] || {}; // Obtiene la información manual o una estructura vacía si no se encuentra

          const fila = document.createElement("tr"); // Crea una fila para la tabla

          // Enlace al archivo XML en la carpeta "data"
          const link = `<a href="../data/${archivo}">${nombreArchivo}</a>`;

          // Crea una celda para cada dato y la agrega a la fila
          fila.innerHTML = `
            <td>${link}</td>
            <td>${info.descripcion || ""}</td>
            <td>${info.fecha || ""}</td>
            <td>${info.sku || ""}</td>
            <td>${info.ubicacion || ""}</td>
          `;

          // Agrega la fila a la tabla
          tabla.appendChild(fila);
        }) // Manejo de errores
        .catch(error => {
          console.error("Error al cargar", archivo, error);
        });
    });
  } // Fin de la función fetchData y su llamada al cargar el documento
  fetchData();
});

