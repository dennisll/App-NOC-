#Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

#dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

```

3. Ejecutar el comando ```npm install ```
4. Ejecutar el comando ```docker compose -f docker-compose.yml --env-file .env up -d ```
5. Ejecutar el comando ``` npx prisma migrate dev```
6. Ejecutar el comando ```npm run dev ```

#Obtener el Gmail key
