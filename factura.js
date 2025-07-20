// Usamos jsPDF para generar el PDF
const { jsPDF } = window.jspdf;

function generarPDF(
  nombre,
  email,
  telefono,
  direccion,
  metodoPago,
  productos,
  total
) {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("ModaStyleJasc - Factura de Compra", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`N° Factura: ${Math.floor(Math.random() * 10000)}`, 14, 30);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 37);

  // Línea separadora
  doc.setDrawColor(200);
  doc.line(14, 42, 196, 42);

  // Información del cliente
  doc.setFontSize(14);
  doc.text("Datos del Cliente", 14, 50);

  doc.setFontSize(12);
  doc.text(`Nombre: ${nombre}`, 14, 60);
  doc.text(`Email: ${email}`, 14, 67);
  doc.text(`Teléfono: ${telefono}`, 14, 74);
  doc.text(`Dirección: ${direccion}`, 14, 81);
  doc.text(
    `Método de pago: ${
      metodoPago === "transferencia"
        ? "Transferencia bancaria"
        : "Pago contra entrega"
    }`,
    14,
    88
  );

  // Productos
  doc.setFontSize(14);
  doc.text("Detalle del Pedido", 14, 100);

  // Encabezados de la tabla
  doc.setFontSize(12);
  doc.setFillColor(240, 240, 240);
  doc.rect(14, 105, 182, 10, "F");
  doc.text("Producto", 16, 111);
  doc.text("Cantidad", 120, 111);
  doc.text("Precio", 160, 111);
  doc.text("Total", 180, 111);

  let y = 120;
  productos.forEach((producto) => {
    doc.text(producto.nombre, 16, y);
    doc.text(producto.cantidad.toString(), 120, y);
    doc.text(`$${producto.precio.toLocaleString()}`, 160, y);
    doc.text(
      `$${(producto.precio * producto.cantidad).toLocaleString()}`,
      180,
      y
    );
    y += 7;
  });

  // Total
  doc.setFontSize(14);
  doc.text(`Total: $${total.toLocaleString()}`, 160, y + 10);

  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Gracias por su compra en ModaStyleJasc", 105, 280, {
    align: "center",
  });
  doc.text(
    "Para cualquier consulta, contacte a jairosypunto@gmail.com o al 3016173378",
    105,
    285,
    { align: "center" }
  );

  // Guardar el PDF
  doc.save(`factura_modastyle_${new Date().toISOString().slice(0, 10)}.pdf`);

  // También podríamos abrir el PDF en una nueva ventana
  // const pdfData = doc.output('blob');
  // window.open(URL.createObjectURL(pdfData));
}
