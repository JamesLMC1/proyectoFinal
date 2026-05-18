# Anime Characters App

Proyecto compuesto por un **backend API** (Express + Supabase) y un **frontend mobile/web** (Expo React Native).

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- Git

## Despliegue local

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd proyectofinal

# Construir y levantar todos los servicios
docker compose up --build
```

Esto levanta dos contenedores:

| Servicio | URL |
|----------|-----|
| Backend API | http://localhost:3000 |
| Documentación Swagger | http://localhost:3000/api/docs |
| Frontend Web | http://localhost:8080 |

## Variables de entorno

El backend requiere un archivo `.env` en `pokedex-backend/` con las siguientes variables:

```
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_SERVICE_KEY=...
PORT=3000
```

## Comandos útiles

```bash
# Ver contenedores activos
docker ps

# Ver logs de un servicio específico
docker compose logs backend
docker compose logs frontend

# Detener servicios
docker compose down

# Reconstruir imágenes desde cero
docker compose build --no-cache
```
