# Arquitectura del Proyecto

## Estructura General

El proyecto sigue una arquitectura cliente-servidor moderna, separando claramente las responsabilidades entre frontend y backend.

## Frontend

### Tecnologías Principales

- **Vue.js**: Framework principal para la construcción de interfaces
- **Vuexy**: Template de administración que proporciona componentes y estilos predefinidos
- **Vue Query**: Librería para manejo de estado y caché de datos

### Gestión de Estado

Utilizamos Vue Query para manejar el estado de las peticiones API y caché. Esta librería proporciona:

- Caché automática de resultados
- Estados de carga (`isPending`)
- Estados de error
- Revalidación automática
- Mutaciones optimistas

Ejemplo de uso de Vue Query:
```typescript
const { data, isPending, error } = useQuery({
  queryKey: ['datos'],
  queryFn: () => fetchDatos()
})
```

## Backend

### Tecnologías Principales

- **Node.js**: Entorno de ejecución
- **Koa.js**: Framework web minimalista
- **routing-controllers**: Librería para crear controladores con decoradores
- **Elasticsearch**: Base de datos para almacenamiento y búsqueda

### Estructura de APIs

Utilizamos `routing-controllers` para definir nuestros endpoints de manera declarativa:

```typescript
@Controller('/api')
export class UserController {
    @Get('/users')
    getUsers() {
        // Lógica del controlador
    }
}
```

## Flujo de Datos

1. El frontend realiza peticiones a través de Vue Query
2. Las peticiones son manejadas por los controladores en el backend
3. Los controladores interactúan con Elasticsearch
4. Los datos son devueltos y cacheados automáticamente por Vue Query

## Consideraciones de Seguridad

- Todas las peticiones API deben ser autenticadas
- Los datos sensibles deben estar encriptados
- Las consultas a Elasticsearch deben estar sanitizadas
