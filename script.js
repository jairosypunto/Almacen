// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Camiseta básica blanca",
        precio: 29900,
        categoria: "hombre",
        imagen: "assets/images/camiseta-blanca.jpg",
        oferta: false
    },
    {
        id: 2,
        nombre: "Jeans ajustados azul",
        precio: 89900,
        categoria: "mujer",
        imagen: "assets/images/jeans-mujer.jpg",
        oferta: true,
        precioAnterior: 99900
    },
    {
        id: 3,
        nombre: "Vestido floral verano",
        precio: 75900,
        categoria: "mujer",
        imagen: "assets/images/vestido-floral.jpg",
        oferta: false
    },
    {
        id: 4,
        nombre: "Camisa manga larga rayas",
        precio: 49900,
        categoria: "hombre",
        imagen: "assets/images/camisa-rayas.jpg",
        oferta: false
    },
    {
        id: 5,
        nombre: "Conjunto deportivo niño",
        precio: 65900,
        categoria: "niños",
        imagen: "assets/images/conjunto-nino.jpg",
        oferta: true,
        precioAnterior: 79900
    },
    {
        id: 6,
        nombre: "Falda plisada negra",
        precio: 45900,
        categoria: "mujer",
        imagen: "assets/images/falda-negra.jpg",
        oferta: false
    },
    {
        id: 7,
        nombre: "Chaqueta denim",
        precio: 99900,
        categoria: "hombre",
        imagen: "assets/images/chaqueta-denim.jpg",
        oferta: false
    },
    {
        id: 8,
        nombre: "Vestido niña flores",
        precio: 54900,
        categoria: "niños",
        imagen: "assets/images/vestido-nina.jpg",
        oferta: true,
        precioAnterior: 64900
    }
];

// Variables del carrito
let carrito = [];
const carritoBtn = document.getElementById('carrito-btn');
const carritoOverlay = document.getElementById('carrito-overlay');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const carritoBody = document.getElementById('carrito-body');
const carritoContador = document.getElementById('carrito-contador');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const productosGrid = document.getElementById('productos-grid');
const ofertasGrid = document.querySelector('.ofertas-grid');
const filtroBtns = document.querySelectorAll('.filtro-btn');
const modalOverlay = document.getElementById('modal-overlay');
const cerrarModalBtn = document.getElementById('cerrar-modal');
const cancelarCompraBtn = document.getElementById('cancelar-compra');
const confirmarCompraBtn = document.getElementById('confirmar-compra');
const formularioCompra = document.getElementById('formulario-compra');

// Cargar productos
function cargarProductos() {
    productosGrid.innerHTML = '';
    
    productos.forEach(producto => {
        if (!producto.oferta) {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-card');
            productoElement.setAttribute('data-categoria', producto.categoria);
            
            productoElement.innerHTML = `
                <div class="producto-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                    <div class="producto-acciones">
                        <button class="producto-btn ver-detalles">Ver detalles</button>
                        <button class="producto-btn agregar-carrito" data-id="${producto.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            
            productosGrid.appendChild(productoElement);
        }
    });
    
    // Cargar ofertas
    cargarOfertas();
    
    // Agregar eventos a los botones
    function agregarEventosProductos() {
    // Clonar los botones para eliminar todos los listeners
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
    agregarCarritoBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const verDetallesBtns = document.querySelectorAll('.ver-detalles');
    verDetallesBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    // Ahora agregar los nuevos listeners
    document.querySelectorAll('.agregar-carrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            
            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    });
    
    document.querySelectorAll('.ver-detalles').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Funcionalidad de ver detalles en desarrollo');
        });
    });
}
}

function cargarOfertas() {
    ofertasGrid.innerHTML = '';
    
    const productosOferta = productos.filter(producto => producto.oferta);
    
    productosOferta.forEach(producto => {
        const ofertaElement = document.createElement('div');
        ofertaElement.classList.add('producto-card', 'oferta-card');
        ofertaElement.setAttribute('data-categoria', producto.categoria);
        
        ofertaElement.innerHTML = `
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span class="oferta-badge">Oferta</span>
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                ${producto.precioAnterior ? `<p class="precio-anterior">Antes: $${producto.precioAnterior.toLocaleString()}</p>` : ''}
                <div class="producto-acciones">
                    <button class="producto-btn ver-detalles">Ver detalles</button>
                    <button class="producto-btn agregar-carrito" data-id="${producto.id}">Añadir al carrito</button>
                </div>
            </div>
        `;
        
        ofertasGrid.appendChild(ofertaElement);
    });
    
    // Agregar eventos a los botones
    agregarEventosProductos();
}

function agregarEventosProductos() {
    // Botones de agregar al carrito
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
    agregarCarritoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            
            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    });
    
    // Botones de ver detalles (podrías implementar esta funcionalidad)
    const verDetallesBtns = document.querySelectorAll('.ver-detalles');
    verDetallesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Funcionalidad de ver detalles en desarrollo');
        });
    });
}

// Funciones del carrito
function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} añadido al carrito`);
}

function actualizarCarrito() {
    carritoBody.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoBody.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');
            
            carritoItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="carrito-item-precio">$${item.precio.toLocaleString()}</p>
                    <div class="carrito-item-cantidad">
                        <button class="disminuir-cantidad" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="aumentar-cantidad" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="eliminar-item" data-id="${item.id}">&times;</button>
            `;
            
            carritoBody.appendChild(carritoItem);
        });
        
        // Agregar eventos a los botones de cantidad
        const disminuirBtns = document.querySelectorAll('.disminuir-cantidad');
        const aumentarBtns = document.querySelectorAll('.aumentar-cantidad');
        const eliminarBtns = document.querySelectorAll('.eliminar-item');
        
        disminuirBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                disminuirCantidad(id);
            });
        });
        
        aumentarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                aumentarCantidad(id);
            });
        });
        
        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                eliminarDelCarrito(id);
            });
        });
    }
    
    // Actualizar contador y total
    carritoContador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    carritoTotal.textContent = `$${calcularTotal().toLocaleString()}`;
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function disminuirCantidad(id) {
    const item = carrito.find(item => item.id === id);
    
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id !== id);
        }
        
        actualizarCarrito();
    }
}

function aumentarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    
    if (item) {
        item.cantidad++;
        actualizarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 10);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Filtros de productos
filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar active de todos los botones
        filtroBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al botón clickeado
        btn.classList.add('active');
        
        const categoria = btn.getAttribute('data-categoria');
        filtrarProductos(categoria);
    });
});

function filtrarProductos(categoria) {
    const productosCards = document.querySelectorAll('.producto-card');
    
    productosCards.forEach(card => {
        if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Funciones del modal de confirmación
function mostrarModalConfirmacion() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }
    
    modalOverlay.classList.add('active');
    formularioCompra.reset();
}

function cerrarModal() {
    modalOverlay.classList.remove('active');
}

function confirmarCompra() {
    const nombre = document.getElementById('nombre-cliente').value;
    const email = document.getElementById('email-cliente').value;
    const telefono = document.getElementById('telefono-cliente').value;
    const direccion = document.getElementById('direccion-cliente').value;
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;
    
    if (!nombre || !email || !telefono || !direccion) {
        mostrarNotificacion('Por favor completa todos los campos');
        return;
    }
    
    // Generar factura en PDF
    generarFacturaPDF(nombre, email, telefono, direccion, metodoPago);
    
    // Enviar pedido por WhatsApp
    enviarPedidoWhatsApp(nombre, telefono, direccion, metodoPago);
    
    // Enviar pedido por correo electrónico (simulado)
    enviarPedidoCorreo(nombre, email, direccion, metodoPago);
    
    // Vaciar carrito y cerrar modales
    vaciarCarrito();
    cerrarModal();
    cerrarCarrito();
    
    // Mostrar mensaje de éxito
    mostrarNotificacion('¡Compra realizada con éxito! Revisa tu correo para la factura.');
}

function generarFacturaPDF(nombre, email, telefono, direccion, metodoPago) {
    // Esta función se implementará en factura.js
    generarPDF(nombre, email, telefono, direccion, metodoPago, carrito, calcularTotal());
}

function enviarPedidoWhatsApp(nombre, telefono, direccion, metodoPago) {
    const numeroWhatsApp = '3016173378';
    let mensaje = `¡Hola! Quiero realizar un pedido:\n\n`;
    mensaje += `*Nombre:* ${nombre}\n`;
    mensaje += `*Teléfono:* ${telefono}\n`;
    mensaje += `*Dirección:* ${direccion}\n`;
    mensaje += `*Método de pago:* ${metodoPago === 'transferencia' ? 'Transferencia bancaria' : 'Pago contra entrega'}\n\n`;
    mensaje += `*Pedido:*\n`;
    
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toLocaleString()}\n`;
    });
    
    mensaje += `\n*Total:* $${calcularTotal().toLocaleString()}`;
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

function enviarPedidoCorreo(nombre, email, direccion, metodoPago) {
    // En un entorno real, aquí harías una petición a un servidor para enviar el correo
    console.log('Enviando pedido por correo a:', email);
    console.log('Detalles del pedido:', {
        nombre,
        email,
        direccion,
        metodoPago,
        productos: carrito,
        total: calcularTotal()
    });
    
    // Simulamos el envío del correo
    mostrarNotificacion(`Factura enviada a ${email}`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

carritoBtn.addEventListener('click', () => {
    carritoOverlay.classList.add('active');
});

cerrarCarritoBtn.addEventListener('click', () => {
    carritoOverlay.classList.remove('active');
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

finalizarCompraBtn.addEventListener('click', mostrarModalConfirmacion);

cerrarModalBtn.addEventListener('click', cerrarModal);
cancelarCompraBtn.addEventListener('click', cerrarModal);
confirmarCompraBtn.addEventListener('click', confirmarCompra);

// Cerrar carrito al hacer clic fuera
carritoOverlay.addEventListener('click', (e) => {
    if (e.target === carritoOverlay) {
        carritoOverlay.classList.remove('active');
    }
});

// Cerrar modal al hacer clic fuera
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        cerrarModal();
    }
});

function cerrarCarrito() {
    carritoOverlay.classList.remove('active');
}