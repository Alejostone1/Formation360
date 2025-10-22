interface CertificadoFormData {
  id_usuario: string;
  id_curso: string;
  codigo_certificado: string;
  nombre_certificado: string;
  estado: string;
}

interface ValidationResult {
  esValido: boolean;
  errores: string[];
}

export const validarCertificado = (formData: CertificadoFormData): ValidationResult => {
  const errores: string[] = [];

  if (!formData.id_usuario || formData.id_usuario.trim() === '') {
    errores.push('El ID de usuario es requerido');
  }

  if (!formData.id_curso || formData.id_curso.trim() === '') {
    errores.push('El ID del curso es requerido');
  }

  if (!formData.nombre_certificado || formData.nombre_certificado.trim() === '') {
    errores.push('El nombre del certificado es requerido');
  }

  if (!formData.codigo_certificado || formData.codigo_certificado.trim() === '') {
    errores.push('El código del certificado es requerido');
  } else if (formData.codigo_certificado.length < 5) {
    errores.push('El código del certificado debe tener al menos 5 caracteres');
  }

  if (!['activo', 'revocado'].includes(formData.estado)) {
    errores.push('El estado debe ser "activo" o "revocado"');
  }

  return {
    esValido: errores.length === 0,
    errores
  };
};

export const generarCodigoCertificado = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CERT-${timestamp}-${random}`.toUpperCase();
};

export const formatEstadoCertificado = (estado: string): string => {
  return estado === 'activo' ? 'Activo' : 'Revocado';
};

export const formatFechaEmision = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generarCertificadoPDF = async (
  nombreUsuario: string,
  tituloCurso: string,
  codigoCertificado: string,
  fechaEmision: string
): Promise<void> => {
  // Esta función se implementará con jsPDF o similar
  // Por ahora, solo muestra un alert
  alert(`Generando certificado PDF para ${nombreUsuario} - ${tituloCurso}`);
};

export const descargarCertificado = (
  nombreUsuario: string,
  tituloCurso: string,
  codigoCertificado: string,
  fechaEmision: string,
  nombreCertificado?: string
): void => {
  // Crear un canvas para generar la imagen del certificado
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // Gradiente de fondo elegante
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#f8f9fa');
  gradient.addColorStop(1, '#e9ecef');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Borde dorado elegante
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Borde interno azul
  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Logo/Encabezado
  ctx.fillStyle = '#1a365d';
  ctx.font = 'bold 48px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏆 FORMACIÓN 360', canvas.width / 2, 100);

  // Subtítulo con estilo
  ctx.fillStyle = '#2d3748';
  ctx.font = 'italic 32px Georgia, serif';
  ctx.fillText('Certificado de Excelencia Académica', canvas.width / 2, 150);

  // Texto introductorio
  ctx.fillStyle = '#4a5568';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('La Dirección Académica certifica que', canvas.width / 2, 220);

  // Nombre del estudiante (destacado)
  ctx.fillStyle = '#1a202c';
  ctx.font = 'bold 42px Georgia, serif';
  ctx.fillText((nombreCertificado || nombreUsuario).toUpperCase(), canvas.width / 2, 280);

  // Texto del curso
  ctx.fillStyle = '#4a5568';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('ha completado satisfactoriamente el curso de', canvas.width / 2, 340);

  // Nombre del curso (destacado)
  ctx.fillStyle = '#2b6cb0';
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillText(`"${tituloCurso}"`, canvas.width / 2, 390);

  // Información adicional
  ctx.fillStyle = '#718096';
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText(`Código de Verificación: ${codigoCertificado}`, canvas.width / 2, 460);
  ctx.fillText(`Fecha de Emisión: ${formatFechaEmision(fechaEmision)}`, canvas.width / 2, 500);

  // Mensaje de felicitación
  ctx.fillStyle = '#38a169';
  ctx.font = 'italic 22px Georgia, serif';
  ctx.fillText('¡Felicitaciones por tu dedicación y esfuerzo!', canvas.width / 2, 550);

  // Firma y sello
  ctx.fillStyle = '#2d3748';
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText('_______________________________', canvas.width / 2 - 200, 650);
  ctx.fillText('Director Académico', canvas.width / 2 - 200, 680);

  ctx.fillText('_______________________________', canvas.width / 2 + 200, 650);
  ctx.fillText('Sello Institucional', canvas.width / 2 + 200, 680);

  // Elementos decorativos
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 600);
  ctx.lineTo(1100, 600);
  ctx.stroke();

  // Convertir a imagen y descargar
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${codigoCertificado}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, 'image/png', 1.0);
};

export default {
  validarCertificado,
  generarCodigoCertificado,
  formatEstadoCertificado,
  formatFechaEmision,
  generarCertificadoPDF,
  descargarCertificado
};
