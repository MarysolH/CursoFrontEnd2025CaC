// =============================
// RENDERIZAR PRODUCTOS DESDE JSON
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorProductos");
  const selectOrdenar = document.getElementById("ordenar");
  let productos = []; // guardar productos descargados

  
  // Función para renderizar productos (limpia y muestra el array dado)
  function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("card-producto");
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toLocaleString()}</p>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(card);
    });
  }

  // Función para ordenar y mostrar según selección
  function ordenarYMostrar() {
    let productosOrdenados = [...productos]; // clonar para no modificar original

    switch(selectOrdenar.value) {
      case "alfabetico":
        productosOrdenados.sort((a,b) => a.nombre.localeCompare(b.nombre));
        break;
      case "precio-asc":
        productosOrdenados.sort((a,b) => a.precio - b.precio);
        break;
      case "precio-desc":
        productosOrdenados.sort((a,b) => b.precio - a.precio);
        break;
    }

    mostrarProductos(productosOrdenados);
  }

  // Cargar productos desde JSON solo una vez
  fetch("data/productos.json")
    .then(response => response.json())
    .then(data => {
      productos = data;
      ordenarYMostrar(); // mostrar orden inicial (alfabético)
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    });

  // Al cambiar el filtro, ordenar y mostrar
  selectOrdenar.addEventListener("change", ordenarYMostrar);

  // Mostrar contador actualizado apenas carga
    actualizarContador();    
});


// =============================
// VARIABLES GLOBALES
// =============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const modal = document.getElementById("modalCarrito");
const btnCerrar = document.querySelector(".modal-cerrar");
const contenedorCarrito = document.getElementById("contenidoCarrito");
const totalCarrito = document.getElementById("totalCarrito");

// =============================
// AGREGAR AL CARRITO
// =============================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const idProducto = parseInt(e.target.dataset.id);

    // Si ya está en el carrito, aumentamos la cantidad
    const productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      // Buscamos la card para tomar info del producto
      const card = e.target.closest(".card-producto");
      const nombre = card.querySelector("h3").textContent;
      const precioTexto = card.querySelector("p").textContent.replace("$", "").replace(/\./g, "");
      const precio = parseFloat(precioTexto);
      const imagen = card.querySelector("img").getAttribute("src");

      carrito.push({
        id: idProducto,
        nombre,
        precio,
        imagen,
        cantidad: 1
      });
    }
    
    guardarCarrito();
    // Actualizar contador (opcional)
    actualizarContador();
  }
});

// =============================
// MOSTRAR Y CERRAR MODAL
// =============================
document.getElementById("iconoCarrito").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarCarrito();
  modal.style.display = "block";
});

btnCerrar.onclick = () => {
  modal.style.display = "none";
};

// También cerrar al hacer clic fuera del modal
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// =============================
// MOSTRAR CARRITO EN EL MODAL
// =============================
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    totalCarrito.innerHTML = "<strong>Total: $0</strong>";
    const total = 0;
    document.getElementById("cuotasCarrito").textContent =
      "O hasta 3 cuotas sin interés de $0";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <div class="producto-info">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="detalles">
          <p><strong>${item.nombre}</strong></p>
          <div class="cantidad-controles">
            <button class="disminuir" data-index="${index}">−</button>
            <span class="cantidad">${item.cantidad}</span>
            <button class="aumentar" data-index="${index}">+</button>
          </div>
        </div>
      </div>
      <div class="subtotal-info">
        <p>$${subtotal.toLocaleString()}</p>
        <button class="eliminar" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    contenedorCarrito.appendChild(div);
  });

  totalCarrito.textContent = `$${total.toLocaleString()}`;

  const cuotas = total >= 3 ? Math.round(total / 3) : total;
    document.getElementById("cuotasCarrito").textContent = 
      `O en 3 cuotas sin interés de $${cuotas.toLocaleString()}`;

  // Eventos de botones
  document.querySelectorAll(".aumentar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito[index].cantidad++;
      guardarCarrito();
      mostrarCarrito();
      actualizarContador();
    });
  });

  document.querySelectorAll(".disminuir").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        guardarCarrito();
        mostrarCarrito();
        actualizarContador();
      }
    });
  });

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      mostrarCarrito();
      actualizarContador();
    });
  });
}

// =============================
// GUARDAR Y ACTUALIZAR CONTADOR
// =============================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("contadorCarrito").textContent = total;
}

// =============================
// VACIAR CARRITO
// =============================
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
  }
});

// =============================
// FINALIZAR COMPRA
// =============================
document.getElementById("iniciarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("Gracias por tu compra 😊");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    modal.style.display = "none"; // Cierra el modal
  }
});

// =============================
// VER MÁS PRODUCTOS (cerrar modal y scrollear)
// =============================
document.getElementById("verMasProductos").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("modalCarrito").style.display = "none";

  // Scroll al main o mostrar productos
  document.querySelector("#productos").scrollIntoView({ behavior: "smooth" });
});


const btnMenu = document.getElementById('btnMenu');
const menuLateral = document.getElementById('menuHamburguesa');
const overlay = document.getElementById('menuOverlay');

btnMenu.addEventListener('click', () => {
  menuLateral.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  menuLateral.classList.remove('active');
  overlay.classList.remove('active');
});

menuLateral.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuLateral.classList.remove('active');
    overlay.classList.remove('active');
  });
});









