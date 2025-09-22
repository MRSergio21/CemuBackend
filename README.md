# 🎓 Backend - Gestión de Prácticas Profesionales (CEMU Uneatlantico)

Este repositorio contiene el **Backend** del sistema de gestión de prácticas profesionales del **CEMU Uneatlantico**.  
La API expone los servicios necesarios para la administración de grados universitarios, empresas colaboradoras, prácticas profesionales y solicitudes de alumnos.  

---

## 🚀 Funcionalidades principales

### 📘 Grados Universitarios
- CRUD completo de grados universitarios.  
- Relación de prácticas profesionales con grados.  

### 🏢 Empresas
- CRUD completo de empresas colaboradoras.  
- Asociación de empresas con prácticas.  

### 💼 Prácticas Profesionales
- Registro, edición y eliminación de prácticas.  
- Campos principales:
  - Título, ubicación, salario, modalidad, tipo de práctica, jornada.  
  - Estudios mínimos, idiomas requeridos, periodo, fecha de inicio.  
  - Experiencia mínima, conocimientos previos y descripción.  
  - Relación con **empresa** y **grado universitario**.  

### 📋 Solicitudes de Prácticas
- Creación de solicitudes por parte de los alumnos.  
- Estados de las solicitudes:
  - **Revisado**  
  - **No Revisado**  
- Consultar solicitudes por alumno.  
- Gestión de solicitudes por administradores.  

---

## 🛠️ Tecnologías utilizadas

- **Node.js** + **Express** (framework backend).  
- **TypeScript** (tipado y robustez en el desarrollo).  
- **Prisma ORM** (interacción con la base de datos).  
- **Base de datos:** PostgreSQL.  
- **Autenticación:** JSON Web Token (JWT).  
- **Validaciones:** Middlewares y DTOs.  
- **Documentación de API:** TSOA / Swagger.  

---

## 📦 Instalación y ejecución

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/MRSergio21/CemuBackend.git

2. Instalar dependiencias:  
   ```bash
   npm i

3. Instalar dependiencias:  
   ```bash
   npm run dev

4. Migrar Schema de Prisma a Base de Datos:  
   ```bash
   npx prisma generate

5. Creación de Documentacion con la herramienta TSOA:  
   ```bash
   npm run tsoa:build
