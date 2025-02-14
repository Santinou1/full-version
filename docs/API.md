# Documentación de APIs

## Convenciones Generales

### Formato de Respuesta

Todas las APIs siguen un formato de respuesta consistente:

```json
{
    "success": true,
    "data": {
        // Datos de respuesta
    },
    "error": null
}
```

En caso de error:
```json
{
    "success": false,
    "data": null,
    "error": {
        "code": "ERROR_CODE",
        "message": "Descripción del error"
    }
}
```

### Códigos HTTP

- `200`: Éxito
- `201`: Recurso creado
- `400`: Error de cliente
- `401`: No autorizado
- `403`: Prohibido
- `404`: No encontrado
- `500`: Error del servidor

## Endpoints Principales

### Autenticación

#### Login
```
POST /api/auth/login
```
Body:
```json
{
    "email": "string",
    "password": "string"
}
```

#### Refresh Token
```
POST /api/auth/refresh
```
Headers:
```
Authorization: Bearer {refresh_token}
```

### Usuarios

#### Obtener Usuarios
```
GET /api/usuarios
```
Query Params:
- `page`: número de página
- `limit`: límite por página
- `search`: término de búsqueda

#### Crear Usuario
```
POST /api/usuarios
```
Body:
```json
{
    "nombre": "string",
    "email": "string",
    "rol": "string"
}
```

#### Actualizar Usuario
```
PUT /api/usuarios/:id
```
Body:
```json
{
    "nombre": "string",
    "email": "string"
}
```

## Uso con Vue Query

### Ejemplo de Consulta
```typescript
const { data, isPending } = useQuery({
    queryKey: ['usuarios', { page, limit }],
    queryFn: async () => {
        const response = await fetch(
            `/api/usuarios?page=${page}&limit=${limit}`
        );
        return response.json();
    }
});
```

### Ejemplo de Mutación
```typescript
const mutation = useMutation({
    mutationFn: (nuevoUsuario) => {
        return fetch('/api/usuarios', {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario)
        });
    }
});

// Uso
mutation.mutate({
    nombre: 'Juan',
    email: 'juan@ejemplo.com'
});
```

## Elasticsearch

### Búsqueda General
```
GET /api/search
```
Query Params:
- `q`: término de búsqueda
- `indices`: índices a buscar (separados por coma)
- `from`: offset
- `size`: límite

### Agregaciones
```
POST /api/aggregations
```
Body:
```json
{
    "index": "string",
    "aggs": {
        "nombre_agg": {
            "terms": {
                "field": "campo"
            }
        }
    }
}
```
