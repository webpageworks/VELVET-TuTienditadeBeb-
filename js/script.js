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

    // Buscar solamente una tarjeta visible
    const tarjetas =
        Array.from(
            contenedorCarrusel.querySelectorAll(".producto")
        );

    const tarjeta =
        tarjetas.find(
            (producto) =>
                window.getComputedStyle(producto).display !== "none"
        );

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


// Flecha derecha
if (botonDerecha) {

    botonDerecha.addEventListener("click", () => {
        moverCarrusel(1);
    });

}


// Flecha izquierda
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

const menuBtn =
    document.querySelector(".menu-btn");

const menu =
    document.querySelector(".menu");

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

        const tarjeta =
            boton.closest(".producto");

        if (!tarjeta) return;

        const imagen =
            tarjeta.querySelector("img");

        const nombre =
            tarjeta.querySelector("h3");

        const categoria =
            tarjeta.querySelector(".categoria");

        const precio =
            tarjeta.querySelector(".precio-producto");

        const descripcion =
            tarjeta.querySelector("p");


        if (imagen && modalImagen) {

            modalImagen.src = imagen.src;
            modalImagen.alt = imagen.alt;

        }


        if (nombre && modalNombre) {

            modalNombre.textContent =
                nombre.textContent.trim();

        }


        if (categoria && modalCategoria) {

            modalCategoria.textContent =
                categoria.textContent.trim();

        }


        if (precio && modalPrecio) {

            modalPrecio.textContent =
                precio.textContent
                    .replace("Bs.", "")
                    .trim();

        }


        if (descripcion && modalDescripcion) {

            modalDescripcion.textContent =
                descripcion.textContent.trim();

        }


        // Reiniciar talla
        tallaSeleccionada = "";

        document
            .querySelectorAll(".talla")
            .forEach((talla) => {

                talla.classList.remove("seleccionada");

            });


        // Abrir modal
        if (modal) {

            modal.classList.add("mostrar");

        }

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
            talla.textContent.trim();

    });

});


// =====================================
// BOTÓN WHATSAPP
// =====================================

if (modalWhatsApp) {

    modalWhatsApp.addEventListener("click", () => {

        const productoActual =
            modalNombre.textContent.trim();

        const precioActual =
            modalPrecio.textContent.trim();

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
            "https://wa.me/" +
            telefonoWhatsApp +
            "?text=" +
            encodeURIComponent(mensajeWhatsApp);

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


// =====================================
// MOSTRAR MODELO
// =====================================

function mostrarModelo(modelo) {

    const carrusel =
        document.querySelector(".carrusel");

    const productos =
        document.querySelectorAll(".producto");

    const flechas =
        document.querySelectorAll(".flecha");

    const contenedor =
        document.querySelector(".productos-contenedor");


    if (!carrusel) return;


    // Mostrar carrusel
    carrusel.style.display = "flex";


    // Volver al inicio
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


    // Mostrar flechas
    flechas.forEach((flecha) => {

        flecha.style.display = "flex";

    });

}


// =====================================
// VOLVER A LA COLECCIÓN
// =====================================

function mostrarColeccion() {

    const carrusel =
        document.querySelector(".carrusel");

    const productos =
        document.querySelectorAll(".producto");

    const flechas =
        document.querySelectorAll(".flecha");

    const contenedor =
        document.querySelector(".productos-contenedor");


    if (!carrusel) return;


    // Ocultar carrusel
    carrusel.style.display = "none";


    // Volver al inicio
    if (contenedor) {

        contenedor.scrollLeft = 0;

    }


    // Ocultar productos
    productos.forEach((producto) => {

        producto.style.display = "none";

    });


    // Ocultar flechas
    flechas.forEach((flecha) => {

        flecha.style.display = "none";

    });

}


// =====================================
// VER COLECCIÓN DESDE EL BANNER
// =====================================

document
    .querySelectorAll('a[href="#productos"]')
    .forEach((enlace) => {

        enlace.addEventListener("click", () => {

            mostrarColeccion();

        });

    });


// =====================================
// BOTONES DEL BANNER
// =====================================

document
    .querySelectorAll(".boton-inicio")
    .forEach((boton) => {

        if (boton.getAttribute("href") === "#productos") {

            boton.addEventListener("click", () => {

                mostrarColeccion();

            });

        }

    });