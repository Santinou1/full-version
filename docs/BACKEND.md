# Guía de Backend

## Routing Controllers

Utilizamos [routing-controllers](https://github.com/typestack/routing-controllers) para la gestión de rutas y controladores en nuestro backend. Esta librería nos permite escribir código más limpio y mantenible utilizando decoradores.

### Estructura Básica

```typescript
import { Controller, Get, Post, Body, Param } from 'routing-controllers';

@Controller('/api/usuarios')
export class UsuarioController {
    @Get('/')
    async obtenerUsuarios() {
        // Lógica para obtener usuarios
    }

    @Get('/:id')
    async obtenerUsuarioPorId(@Param('id') id: string) {
        // Lógica para obtener un usuario específico
    }

    @Post('/')
    async crearUsuario(@Body() userData: any) {
        // Lógica para crear usuario
    }
}
```

### Decoradores Comunes

- `@Controller`: Define la ruta base del controlador
- `@Get`, `@Post`, `@Put`, `@Delete`: Métodos HTTP
- `@Param`: Parámetros de ruta
- `@Body`: Cuerpo de la petición
- `@QueryParams`: Parámetros de consulta
- `@HeaderParam`: Parámetros de cabecera

## Elasticsearch

### Consultas Básicas

```typescript
// Búsqueda simple
const resultado = await elasticClient.search({
    index: 'mi_indice',
    body: {
        query: {
            match: {
                campo: 'valor'
            }
        }
    }
});

// Búsqueda con filtros
const resultadoFiltrado = await elasticClient.search({
    index: 'mi_indice',
    body: {
        query: {
            bool: {
                must: [
                    { match: { campo1: 'valor1' } }
                ],
                filter: [
                    { range: { campo2: { gte: 10 } } }
                ]
            }
        }
    }
});
```

### Agregaciones

```typescript
const resultadoAgregacion = await elasticClient.search({
    index: 'mi_indice',
    body: {
        aggs: {
            nombre_agregacion: {
                terms: {
                    field: 'campo'
                }
            }
        }
    }
});
```

## Middleware

### Autenticación

```typescript
@UseBefore(authMiddleware)
@Controller('/api/protegido')
export class ControladorProtegido {
    // ...
}
```

### Manejo de Errores

```typescript
@Middleware({ type: 'before' })
export class ErrorHandler implements MiddlewareInterface {
    async use(req: any, res: any, next: (err?: any) => Promise<any>) {
        try {
            await next();
        } catch (error) {
            // Lógica de manejo de errores
        }
    }
}
```

## Validación

Utilizamos decoradores de clase-validator para validación:

```typescript
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CrearUsuarioDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsEmail()
    email: string;
}

@Post('/')
async crearUsuario(@Body() usuario: CrearUsuarioDto) {
    // El objeto ya está validado
}
```

## Respuestas HTTP

```typescript
@Get('/')
@HttpCode(200)
async obtenerDatos() {
    return {
        success: true,
        data: {
            // ...
        }
    };
}

@Post('/')
@HttpCode(201)
async crearRecurso() {
    // ...
}
```
