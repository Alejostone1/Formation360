# Formación 360

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC)](https://tailwindcss.com/)

Una plataforma educativa completa para formación profesional, construida con Next.js, Express.js y MySQL.

## 📋 Descripción

Formación 360 es una plataforma de aprendizaje en línea que permite a estudiantes acceder a cursos organizados por módulos y videos. Los administradores pueden gestionar contenido, usuarios y certificados. La plataforma incluye sistema de autenticación, seguimiento de progreso y generación de certificados.

### ✨ Características Principales

- 🔐 **Autenticación completa** (registro, login, roles)
- 📚 **Gestión de cursos** por categorías y módulos
- 🎥 **Sistema de videos** con seguimiento de visualización
- 👥 **Panel de administración** para gestionar usuarios y contenido
- 📜 **Generación de certificados** al completar cursos
- 📊 **Dashboard de estudiante** con progreso
- 🎨 **Interfaz moderna** con modo claro/oscuro
- 📱 **Responsive design** para todos los dispositivos

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (viene incluido con Node.js)
- **MySQL** (versión 8.0 o superior) - [Descargar](https://www.mysql.com/)
- **MySQL Workbench** (opcional, para gestión visual de BD) - [Descargar](https://www.mysql.com/products/workbench/)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Alejostone1/Formation360.git
cd Formation360
```

### 2. Configurar la Base de Datos

#### Crear la Base de Datos en MySQL

1. Abre MySQL Workbench o la línea de comandos de MySQL
2. Crea una nueva base de datos llamada `formacion360`:

```sql
CREATE DATABASE formacion360;
```

#### Importar el Archivo SQL

1. En MySQL Workbench, selecciona la base de datos `formacion360`
2. Ve a **File > Open SQL Script** y selecciona el archivo `sqlbd.sql` ubicado en la raíz del proyecto
3. Ejecuta el script (botón de rayo o Ctrl+Shift+Enter)

O desde línea de comandos:

```bash
mysql -u [tu_usuario] -p formacion360 < sqlbd.sql
```

### 3. Configurar el Backend

#### Instalar Dependencias del Backend

```bash
cd backend
npm install
```

#### Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# Configuración de la Base de Datos
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=formacion360
DB_PORT=3306

# Puerto del servidor backend
PORT=3001

# JWT Secret (cambia esto por una clave segura)
JWT_SECRET=tu_clave_secreta_para_jwt
```

> **Nota:** Reemplaza `tu_usuario_mysql`, `tu_contraseña_mysql` y `tu_clave_secreta_para_jwt` con tus valores reales.

#### Ejecutar el Backend

```bash
npm run dev
```

El backend estará disponible en `http://localhost:3001`

### 4. Configurar el Frontend

#### Instalar Dependencias del Frontend

```bash
# Desde la raíz del proyecto (o cd .. si estás en backend)
npm install
```

#### Ejecutar el Frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
Formation360/
├── app/                    # Páginas Next.js (Frontend)
│   ├── administrador/      # Panel de administración
│   ├── estudiante/         # Panel de estudiante
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   └── page.tsx           # Página principal
├── backend/               # API REST (Express.js)
│   ├── controllers/       # Controladores de rutas
│   ├── routes/           # Definición de rutas
│   ├── uploads/          # Archivos subidos
│   ├── db.js             # Configuración BD
│   └── index.js          # Servidor principal
├── components/           # Componentes React reutilizables
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y configuraciones
├── public/              # Archivos estáticos
├── sqlbd.sql           # Script de base de datos
├── package.json        # Dependencias frontend
└── README.md          # Este archivo
```

## 🎯 Cómo Usar la Plataforma

### Para Administradores

1. Regístrate como administrador (o solicita acceso)
2. Accede al panel de administración
3. Gestiona categorías, cursos, módulos y videos
4. Administra usuarios y certificados

### Para Estudiantes

1. Regístrate como estudiante
2. Explora los cursos disponibles
3. Activa cursos con códigos de acceso
4. Visualiza videos y completa módulos
5. Obtén certificados al finalizar cursos

## 🔧 Scripts Disponibles

### Frontend
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Inicia servidor de producción
- `npm run lint` - Ejecuta linter

### Backend
- `npm run dev` - Inicia servidor con nodemon
- `npm start` - Inicia servidor en producción

## 🌐 URLs de Acceso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Base de datos:** localhost:3306 (MySQL)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Soporte

Si tienes problemas con la instalación o uso de la plataforma, puedes:

- Revisar los issues del repositorio
- Crear un nuevo issue con detalles del problema
- Contactar al equipo de desarrollo

---

**¡Gracias por usar Formación 360!** 🎓
