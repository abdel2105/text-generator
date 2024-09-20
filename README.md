### Text Generator Web App
Este es un proyecto de generación de texto desarrollado en Next.js utilizando la API de Hugging Face para generar textos a partir de una entrada proporcionada por el usuario.

## Demo en vivo
Podéis ver la aplicación en funcionamiento a través del siguiente enlace:

{https://text-generator-silk.vercel.app/)

Estructura del Proyecto
El código fuente del proyecto se encuentra en la carpeta components. Algunas partes clave incluyen:

/ui: Donde estan las plantillas de los botones y de las viñetas.

/text-generator.tsx: Contiene las página principal.

## Instalación y configuración
1. Clonar el repositorio

 ```git clone https://github.com/abdel2105/text-generator.git```
 
 **cd text-generator**

2. Instalar dependencias
  Asegúrate de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando para instalar las dependencias necesarias:

  **npm install**

4. Ejecutar la aplicación localmente
  Después de instalar las dependencias, puedes ejecutar la aplicación localmente con:
  
  **npm run dev**
  
  Esto iniciará un servidor de desarrollo, y la aplicación estará disponible en http://localhost:3000.

## Tecnologías utilizadas
Next.js: Framework de React para la creación de aplicaciones web.

TypeScript: Para asegurar la tipificación estática en el proyecto.

Hugging Face API: Para la generación de texto utilizando modelos pre-entrenados de IA.

Axios: Para hacer peticiones HTTP a la API de Hugging Face.

Tailwind css: Para el diseño y la apariencia de la aplicación.
