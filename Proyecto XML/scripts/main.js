function main() {
  console.log("Hello, World!");
}

const userLogged = false;


function validarLogin() {
  // Suggested code may be subject to a license. Learn more: ~LicenseLog:1332361068.
  // Suggested code may be subject to a license. Learn more: ~LicenseLog:3415057542.
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

function logout() {
  window.location.href = "login.html";
  alert("Has cerrado sesion");
  userLogged = false;
}


function checkLogged() {
  if (userLogged) {
    return true;
  } else {
    alert("Debes iniciar sesion");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function fetchData() {
    const archivos = ["altavoces.xml", "consolas.xml", "ordenadores.xml", "televisores.xml", "telefonos.xml"];
    const tabla = document.getElementById("tabla");

    const datosManual = {
      "altavoces": { descripcion: "Altavoces Bluetooth", fecha: "2023-11-01", sku: "ALT123", ubicacion: "Almacén A" },
      "consolas": { descripcion: "Consola de videojuegos", fecha: "2023-10-15", sku: "CON456", ubicacion: "Almacén B" },
      "ordenadores": { descripcion: "Ordenador portátil", fecha: "2023-09-20", sku: "ORD789", ubicacion: "Almacén C" },
      "televisores": { descripcion: "Smart TV 4K", fecha: "2023-12-05", sku: "TV101", ubicacion: "Almacén D" },
      "telefonos": { descripcion: "Teléfono móvil", fecha: "2023-08-30", sku: "TEL202", ubicacion: "Almacén E" },
    };

    archivos.forEach(archivo => {
      fetch(`../data/${archivo}`)
        .then(response => response.text())
        .then(() => {
          const nombreArchivo = archivo.replace(".xml", "");
          const info = datosManual[nombreArchivo] || {};

          const fila = document.createElement("tr");

          // Enlace al archivo XML en la carpeta "data"
          const link = `<a href="../data/${archivo}">${nombreArchivo}</a>`;

          fila.innerHTML = `
            <td>${link}</td>
            <td>${info.descripcion || ""}</td>
            <td>${info.fecha || ""}</td>
            <td>${info.sku || ""}</td>
            <td>${info.ubicacion || ""}</td>
          `;

          tabla.appendChild(fila);
        })
        .catch(error => {
          console.error("Error al cargar", archivo, error);
        });
    });
  }

  fetchData();
});

