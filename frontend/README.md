# Trabajo de la capacitación React NodeJS dictada por **Gabriel Alberini** para DARWOFT

Desarrollado por **Agustín Trezza – Fullstack Developer** 💻

El proyecto es una aplicación Fullstack para gestión de tareas. El usuario puede crear una cuenta, iniciar sesión y acceder a un panel donde puede crear, listar, editar y eliminar tareas. También asignar estados a cada tarea ("Hecha" o "Pendiente") y filtrarlas por dichos estados.
La autenticación se realiza mediante JWToken y las rutas están protegidas para asegurar que solo el usuario autenticado acceda al contenido. Las tareas pueden crearse escribiendo o usando comandos de voz y algunos otros detalles interesantes para la experiencia del usuario.

El **FRONTEND** está desarrollado en React (manejo de rutas mediante 'react-router-dom' y uso de un contexto global para la autenticación), tailwindcss para los estilos, mensajes al usuario utilizando la librería 'sweetalert2'. (Ver 'package.json')

El **BACKEND** está hecho con Node.js y Express, expone una API REST y se conecta a una base de datos MONGODB. Se realizan validaciones, manejo de límite de peticiones con 'express-rate-limit' y manejo de errores en las operaciones principales. (Ver 'package.json')

RECOMIENDO VER AMBOS 'package.json' para el detalle de dependencias! 👌✅

Espero les guste! Me gustó mucho armar el trabajo y la cursada estuvo excelente! 👍👍

---

<ins> PARA VER LA APLICACIÓN: </ins>

**Frontend en Vercel:** https://react-node-darwoft.vercel.app/ 

**Backend en Render:** https://reactnodedarwoft.onrender.com

## 🚀 PASOS PARA CORRER EL PROYECTO

## *(Descargar el repositorio)

### Frontend

1. Desde la terminal, posicionarse en la carpeta `frontend`
2. Ejecutar `npm install` para instalar las dependencias
3. Ejecutar `npm run dev` o `npm run start` según el entorno

### Backend

1. Desde la terminal, posicionarse en la carpeta `backend`
2. Ejecutar `npm install` para instalar las dependencias
3. Ejecutar `npm run dev` o `npm run start` según el entorno

**Saludos, Agustin**
