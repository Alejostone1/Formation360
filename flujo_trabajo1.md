
# 📘 Manual de Usuario - Plataforma de Gestión Educativa

Este documento describe el **flujo de trabajo completo** y las **funcionalidades disponibles** para los dos roles principales del sistema: **Administrador** y **Estudiante**.

---

## 🧭 Introducción General

El sistema está diseñado para gestionar cursos, módulos, videos y certificados dentro de una plataforma educativa. Permite al **Administrador** crear y organizar los contenidos, mientras que los **Estudiantes** pueden acceder, visualizar materiales, y obtener certificados.

---

## 👨‍💼 Rol Administrador

El Administrador tiene acceso a todas las secciones del sistema y puede gestionar tanto el contenido educativo como los usuarios inscritos.

### 1. Gestión de Usuarios
Ruta: `administrador/usuarios`

**Funciones principales:**
- 👥 **Ver lista de usuarios** registrados.
- ➕ **Registrar un nuevo usuario** completando el formulario con nombre, correo, rol, etc.
- ✏️ **Editar información** de un usuario existente.
- ❌ **Eliminar usuarios** inactivos o duplicados.
- 🔍 **Buscar usuarios** por nombre o correo.
- 👁️ **Ver detalles** de cada usuario (a través del `UserDetailModal`).

**Componentes clave:**  
`UserManagement.tsx`, `UserTable.tsx`, `UserFormModal.tsx`.

---

### 2. Gestión de Cursos
Ruta: `administrador/cursos`

**Funciones principales:**
- 📚 **Visualizar todos los cursos** existentes.
- ➕ **Crear nuevos cursos**, asignando nombre, descripción y categoría.
- ✏️ **Editar cursos existentes**.
- ❌ **Eliminar cursos** que ya no estén activos.
- 🔗 **Asociar módulos y videos** al curso.

**Componentes clave:**  
`CourseManagement.tsx`, `CourseCard.tsx`, `CursoFormModal.tsx`.

---

### 3. Gestión de Módulos
Ruta: `administrador/modulos`

**Funciones principales:**
- 🧩 **Ver todos los módulos** de un curso.
- ➕ **Registrar nuevos módulos** indicando su nombre y contenido.
- ✏️ **Editar módulos existentes**.
- ❌ **Eliminar módulos**.
- 📎 **Asociar videos o actividades** al módulo correspondiente.

**Componentes clave:**  
`ModuloManagement.tsx`, `ModuloCard.tsx`, `ModuloFormModal.tsx`.

---

### 4. Gestión de Videos
Ruta: `administrador/videos`

**Funciones principales:**
- 🎞️ **Subir videos** educativos para los cursos y módulos.
- ✏️ **Editar información** del video (título, descripción, duración).
- ❌ **Eliminar videos** antiguos o no utilizados.
- 📊 **Ver estadísticas** de visualización por estudiante.

**Componentes clave:**  
`VideoManagement.tsx`, `videosUtils.js`.

---

### 5. Gestión de Actividades
Rutas:  
- `administrador/actividades`  
- `administrador/actividades/registro`  
- `administrador/actividades/gestion`

**Funciones principales:**
- 📝 **Registrar nuevas actividades** (ejercicios, tareas, evaluaciones).
- 🔍 **Consultar actividades registradas**.
- ✏️ **Editar actividades** (nombre, descripción, tipo, fecha).
- ❌ **Eliminar actividades** obsoletas.
- 📑 **Filtrar actividades** por tipo o estado.

**Componentes clave:**  
`ActividadTable.tsx`, `FiltrosActividad.tsx`, `actividadesUtils.ts`.

---

### 6. Gestión de Categorías
Ruta: `administrador/categorias`

**Funciones principales:**
- 🏷️ **Ver y crear categorías** de cursos.
- ✏️ **Editar nombres o descripciones** de categorías.
- ❌ **Eliminar categorías** que no tengan cursos asociados.

**Componentes clave:**  
`CategoryFormModal.tsx`, `CategoryTable.tsx`, `categoriasUtils.js`.

---

### 7. Gestión de Certificados
Ruta: `administrador/certificados`

**Funciones principales:**
- 🎓 **Generar certificados** para los estudiantes que completan un curso.
- 📋 **Consultar certificados emitidos**.
- ✏️ **Editar información del certificado** (nombre, fecha, estado).
- ❌ **Revocar certificados** si se detectan errores.
- 📤 **Descargar certificados** en formato digital.

**Componentes clave:**  
`CertificadoFormModal.tsx`, `CertificadoTable.tsx`, `certificadosUtils.ts`.

---

### 8. Gestión de Cursos-Estudiantes
Ruta: `administrador/cursos_estudiantes`

**Funciones principales:**
- 👨‍🏫 **Inscribir estudiantes en cursos.**
- 🔍 **Consultar estudiantes registrados por curso.**
- ✏️ **Editar inscripciones o cambiar estado (activo/inactivo).**
- ❌ **Eliminar inscripción.**

**Componentes clave:**  
`InscripcionesTable.tsx`, `InscripcionFormModal.tsx`.

---

### 9. Control de Videos Vistos
Rutas:  
- `administrador/videos-vistos`  
- `administrador/videos-vistos/registro`  
- `administrador/videos-vistos/estadisticas`

**Funciones principales:**
- 📊 **Ver el progreso de visualización de videos por estudiante.**
- 🧮 **Analizar estadísticas de participación.**
- 🔍 **Filtrar registros por curso o usuario.**

**Componentes clave:**  
`VideoStatsManagement.tsx`, `VideosVistosTable.tsx`.

---

## 🎓 Rol Estudiante

El estudiante tiene acceso a las secciones que le permiten ver su progreso, explorar cursos y obtener certificados.

### 1. Panel Principal (Dashboard)
Ruta: `estudiante/dashboard`

**Funciones principales:**
- 🏠 **Visualizar el panel principal con las secciones:**  
  - Cursos disponibles  
  - Actividades nuevas  
  - Certificados obtenidos  
  - Recomendaciones personalizadas  
  - Sección de perfil

**Componentes clave:**  
`IntegratedStudentSidebar.tsx`, `NewCoursesSection.tsx`, `NewActivitySection.tsx`, `NewCertificatesSection.tsx`.

---

### 2. Gestión de Cursos
Rutas:  
- `estudiante/cursos`  
- `estudiante/cursos/[id]`

**Funciones principales:**
- 📚 **Ver lista de cursos disponibles.**
- 🔍 **Ingresar a un curso específico** y ver su detalle (temas, videos, módulos).  
- 📈 **Seguir el progreso del curso**.
- 🎥 **Acceder a videos asociados.**
- 🧩 **Participar en actividades** si están habilitadas.

**Componentes clave:**  
`CourseDetailClient.tsx`, `StudentVideoCard.tsx`.

---

### 3. Certificados
Ruta: `estudiante/certificados`

**Funciones principales:**
- 🎓 **Visualizar certificados obtenidos.**
- 📥 **Descargar certificado en formato digital.**

**Componentes clave:**  
`CertificateDownload.tsx`.

---

### 4. Perfil del Estudiante
Ruta: `estudiante/perfil`

**Funciones principales:**
- 👤 **Ver y editar la información personal.**
- 📧 **Actualizar correo electrónico o contraseña.**
- 📱 **Modificar número de contacto o intereses.**

**Componentes clave:**  
`EditProfile.tsx`, `PurchaseInterestForm.tsx`.

---

### 5. Videos
Ruta: `estudiante/videos`

**Funciones principales:**
- 🎞️ **Acceder directamente a la biblioteca de videos.**
- ▶️ **Reproducir contenido educativo.**
- 💾 **Registrar visualizaciones automáticamente** (para estadísticas).

**Componentes clave:**  
`StudentVideoCard.tsx`.

---

## 🔄 Interacción entre Roles

- Los **administradores** crean y organizan cursos, módulos y videos.  
- Los **estudiantes** consumen ese contenido, ven sus progresos y obtienen certificados.  
- Las estadísticas de visualización y progreso se reflejan en el panel del administrador.  
- Los certificados generados por el administrador aparecen automáticamente en el panel del estudiante.

---

## 🗺️ Flujo General del Sistema

1. 🔑 El usuario inicia sesión.  
2. 👨‍💼 Si es **Administrador**, accede al panel de control completo.  
3. 🎓 Si es **Estudiante**, accede a su panel personalizado.  
4. 📚 Los cursos se crean y se asocian con módulos y videos.  
5. ▶️ Los estudiantes visualizan los videos y completan actividades.  
6. 🎓 Al finalizar, pueden descargar su certificado.  
7. 📊 El administrador monitorea el progreso mediante estadísticas.  

---

### 📄 Fin del Manual
Este manual resume el flujo funcional completo del sistema educativo, destacando las acciones principales que cada usuario puede realizar según su rol.
