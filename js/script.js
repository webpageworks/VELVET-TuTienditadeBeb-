// =====================================
// CARRUSEL DE PRODUCTOS
// =====================================

const contenedorCarrusel =
    document.querySelector(".productos-contenedor");

const botonIzquierda =
    document.querySelector(".flecha.izquierda");

const botonDerecha =
    document.querySelector(".flecha.derecha");


function moverCarrusel(direccion) {

    if (!contenedorCarrusel) return;

    const tarjeta =
        contenedorCarrusel.querySelector(".producto");

    if (!tarjeta) return;

    const anchoTarjeta =
        tarjeta.getBoundingClientRect().width;

    const estilos =
        window.getComputedStyle(contenedorCarrusel);

    const espacio =
        parseFloat(estilos.columnGap || estilos.gap) || 0;

    contenedorCarrusel.scrollBy({
        left: direccion * (anchoTarjeta + espacio),
        behavior: "smooth"
    });
}


if (botonDerecha) {

    botonDerecha.addEventListener("click", () => {
        moverCarrusel(1);
    });

}


if (botonIzquierda) {

    botonIzquierda.addEventListener("click", () => {
        moverCarrusel(-1);
    });

}


// =====================================
// DESLIZAR CON EL DEDO
// =====================================

if (contenedorCarrusel) {

    let inicioX = 0;

    contenedorCarrusel.addEventListener(
        "touchstart",
        (evento) => {
            inicioX = evento.touches[0].clientX;
        }
    );

    contenedorCarrusel.addEventListener(
        "touchend",
        (evento) => {

            const finalX =
                evento.changedTouches[0].clientX;

            const diferencia =
                inicioX - finalX;

            if (Math.abs(diferencia) < 40) return;

            if (diferencia > 0) {
                moverCarrusel(1);
            } else {
                moverCarrusel(-1);
            }

        }
    );

}

// =====================================
// DESLIZAR CON EL DEDO
// =====================================

if (contenedor) {

    let inicioX = 0;

    contenedor.addEventListener("touchstart", (evento) => {
        inicioX = evento.touches[0].clientX;
    });

    contenedor.addEventListener("touchend", (evento) => {

        const finalX =
            evento.changedTouches[0].clientX;

        const diferencia =
            inicioX - finalX;

        if (Math.abs(diferencia) < 40) return;

        if (diferencia > 0) {
            moverCarrusel(1);
        } else {
            moverCarrusel(-1);
        }

    });

}




// =====================================
// FILTROS
// =====================================

function filtrarProductos(categoriaElegida) {

    const productos =
        document.querySelectorAll(".producto");

    const filtros =
        document.querySelectorAll(".filtro");

    filtros.forEach((boton) => {

        boton.classList.remove("activo");

        if (boton.textContent.trim() === categoriaElegida) {
            boton.classList.add("activo");
        }

    });

    productos.forEach((producto) => {

        const categoria =
            producto.getAttribute("data-categoria");

        if (
            categoriaElegida === "Todos" ||
            categoria === categoriaElegida
        ) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });

}


// =====================================
// MENÚ PARA CELULAR
// =====================================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("menu-abierto");

    });

}


// =====================================
// OSITO ASISTENTE
// =====================================

const osito =
    document.querySelector(".osito-flotante");

const mensajeAsistente =
    document.querySelector("#mensajeAsistente");

if (osito && mensajeAsistente) {

    osito.addEventListener("click", () => {

        if (mensajeAsistente.style.display === "none") {

            mensajeAsistente.style.display = "block";

        } else {

            mensajeAsistente.style.display = "none";

        }

    });

}


// =====================================
// MODAL DE PRODUCTOS
// =====================================

const modal =
    document.getElementById("modalProducto");

const modalImagen =
    document.getElementById("modalImagen");

const modalCategoria =
    document.getElementById("modalCategoria");

const modalNombre =
    document.getElementById("modalNombre");

const modalDescripcion =
    document.getElementById("modalDescripcion");

const modalPrecio =
    document.getElementById("modalPrecio");

const modalWhatsApp =
    document.getElementById("modalWhatsApp");

const cerrarModal =
    document.querySelector(".cerrar-modal");

const botonesProducto =
    document.querySelectorAll(".boton-producto");

const telefonoWhatsApp =
    "59173766324";


// =====================================
// TALLA SELECCIONADA
// =====================================

let tallaSeleccionada = "";


// =====================================
// ABRIR PRODUCTO
// =====================================

botonesProducto.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".producto");

        if (!tarjeta) return;

        const imagen = tarjeta.querySelector("img");
        const nombre = tarjeta.querySelector("h3");
        const categoria = tarjeta.querySelector(".categoria");
        const precio = tarjeta.querySelector(".precio-producto");
        const descripcion = tarjeta.querySelector("p");

        if (imagen) {
            modalImagen.src = imagen.src;
            modalImagen.alt = imagen.alt;
        }

        if (nombre) {
            modalNombre.textContent = nombre.textContent.trim();
        }

        if (categoria) {
            modalCategoria.textContent = categoria.textContent.trim();
        }

        if (precio) {
            modalPrecio.textContent = precio.textContent
                .replace("Bs.", "")
                .trim();
        }

        if (descripcion) {
            modalDescripcion.textContent = descripcion.textContent.trim();
        }

        tallaSeleccionada = "";

        document.querySelectorAll(".talla").forEach((talla) => {
            talla.classList.remove("seleccionada");
        });

        modal.classList.add("mostrar");
        document.body.style.overflow = "hidden";
    });

});

// =====================================
// SELECCIÓN DE TALLAS
// =====================================

const tallas =
    document.querySelectorAll(".talla");

tallas.forEach((talla) => {

    talla.addEventListener("click", () => {

        tallas.forEach((boton) => {

            boton.classList.remove("seleccionada");

        });

        talla.classList.add("seleccionada");

        tallaSeleccionada =
            talla.textContent;

    });

});


// =====================================
// BOTÓN WHATSAPP
// =====================================

if (modalWhatsApp) {
    modalWhatsApp.addEventListener("click", () => {

        const productoActual = modalNombre.textContent.trim();
        const precioActual = modalPrecio.textContent.trim();

        let mensajeWhatsApp;

        if (tallaSeleccionada) {

            mensajeWhatsApp =
                `Hola 😊, quisiera hacer un pedido.\n\n` +
                `🧸 Modelo: ${productoActual}\n` +
                `📏 Talla: ${tallaSeleccionada}\n` +
                `💰 Precio: Bs. ${precioActual}\n\n` +
                `¿Tienen disponibilidad?`;

        } else {

            mensajeWhatsApp =
                `Hola 😊, estoy interesada en el ${productoActual}.\n` +
                `💰 Precio: Bs. ${precioActual}\n\n` +
                `¿Me pueden informar sobre las tallas disponibles?`;
        }

        modalWhatsApp.href =
    "https://wa.me/" + telefonoWhatsApp + "?text=" + encodeURIComponent(mensajeWhatsApp);
    });
}


// =====================================
// CERRAR MODAL
// =====================================

function cerrarVentana() {

    if (modal) {

        modal.classList.remove("mostrar");

    }

    document.body.style.overflow = "";

}

if (cerrarModal) {

    cerrarModal.addEventListener(
        "click",
        cerrarVentana
    );

}

if (modal) {

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {

            cerrarVentana();

        }

    });

}

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        cerrarVentana();

    }

});

function mostrarModelo(modelo) {

    const carrusel = document.querySelector(".carrusel");
    const productos = document.querySelectorAll(".producto");
    const flechas = document.querySelectorAll(".flecha");

    if (!carrusel) return;

    carrusel.style.display = "flex";

    const contenedor = document.querySelector(".productos-contenedor");

    if (contenedor) {
        contenedor.scrollLeft = 0;
    }

    productos.forEach((producto) => {

        if (producto.dataset.modelo === modelo) {
            producto.style.display = "";
        } else {
            producto.style.display = "none";
        }

    });

    flechas.forEach((flecha) => {
        flecha.style.display = "flex";
    });
}

// =====================================
// MOSTRAR MODELO / REINICIAR COLECCIÓN
// =====================================

function mostrarModelo(modelo) {

    const carrusel = document.querySelector(".carrusel");
    const productos = document.querySelectorAll(".producto");
    const flechas = document.querySelectorAll(".flecha");
    const contenedor = document.querySelector(".productos-contenedor");

    if (!carrusel) return;

    // Mostrar el carrusel
    carrusel.style.display = "flex";

    // Volver al inicio del carrusel
    if (contenedor) {
        contenedor.scrollLeft = 0;
    }

    // Mostrar solamente el modelo seleccionado
    productos.forEach((producto) => {

        if (producto.dataset.modelo === modelo) {
            producto.style.display = "";
        } else {
            producto.style.display = "none";
        }

    });

    // Mostrar las flechas
    flechas.forEach((flecha) => {
        flecha.style.display = "flex";
    });
}


// =====================================
// VOLVER A LA COLECCIÓN
// =====================================

function mostrarColeccion() {

    const carrusel = document.querySelector(".carrusel");
    const productos = document.querySelectorAll(".producto");
    const flechas = document.querySelectorAll(".flecha");

    if (!carrusel) return;

    // Ocultar las fotos
    carrusel.style.display = "none";

    // Ocultar todos los productos
    productos.forEach((producto) => {
        producto.style.display = "none";
    });

    // Ocultar las flechas
    flechas.forEach((flecha) => {
        flecha.style.display = "none";
    });
}


// =====================================
// VER COLECCIÓN DESDE EL BANNER
// =====================================

document.querySelector(".boton-inicio")?.addEventListener("click", () => {
    mostrarColeccion();
});


// =====================================
// PRODUCTOS DEL MENÚ
// =====================================

document.querySelector('a[href="#productos"]')?.addEventListener("click", () => {
    mostrarColeccion();
});