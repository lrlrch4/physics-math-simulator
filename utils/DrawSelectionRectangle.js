  // Función para dibujar un rectángulo dado dos puntos de su diagonal
  function drawSelectionRectangle(point1, point2) {
    // Calcula las coordenadas del rectángulo
    var x = Math.min(point1[0], point2[0]);
    var y = Math.min(point1[1], point2[1]);
    var width = Math.abs(point1[0] - point2[0]);
    var height = Math.abs(point1[1] - point2[1]);

    const opacity = .25

    // Dibuja el rectángulo en el canvas // Limpia el canvas antes de dibujar
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity + ')'; // Relleno azul con opacidad
    ctx.fill();
    ctx.strokeStyle = 'blue'; // Color del borde
    ctx.lineWidth = 2; // Ancho del borde
    ctx.stroke();
    ctx.closePath();
  }
