# Documentación API de Proxys

## Estructura de Datos Mock Actual

Actualmente, el frontend está utilizando los siguientes datos mock para la visualización:

### Estadísticas Generales
```javascript
{
  "totalProxies": 2584,
  "activeProxies": 1842,
  "averageSpeed": "156",
  "uptime": "99.2"
}
```

### Datos de Tiempo de Respuesta (24h)
```javascript
{
  "name": "Tiempo de Respuesta (ms)",
  "data": [145, 132, 151, 184, 172, 165, 158, 147]
}
```
Corresponde a mediciones cada 3 horas: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00

### Distribución por País
```javascript
{
  "labels": ["Estados Unidos", "Alemania", "Países Bajos", "Francia", "Reino Unido"],
  "data": [35, 25, 20, 12, 8] // Porcentajes
}
```

### Estado de los Proxys
```javascript
{
  "categories": ["Online", "Offline", "Mantenimiento", "Bloqueados"],
  "data": [1842, 423, 189, 130]
}
```

## Especificación de la API

### 1. Obtener Dashboard de Proxys
`GET /api/proxy/dashboard`

Respuesta esperada:
```javascript
{
  "status": "success",
  "data": {
    "statistics": {
      "total": {
        "count": 2584,
        "trend": "+12% vs last month"
      },
      "active": {
        "count": 1842,
        "percentage": 71.3
      },
      "speed": {
        "value": 156,
        "unit": "ms",
        "trend": "-5% vs last week"
      },
      "uptime": {
        "value": 99.2,
        "unit": "%",
        "lastDowntime": "2024-02-13T15:30:00Z"
      }
    },
    "responseTime": {
      "intervals": [
        {
          "timestamp": "2024-02-14T00:00:00Z",
          "value": 145
        },
        // ... más intervalos
      ],
      "average": 158,
      "peak": 184,
      "lowest": 132
    },
    "distribution": {
      "byCountry": [
        {
          "country": "Estados Unidos",
          "code": "US",
          "count": 905,
          "percentage": 35
        },
        // ... más países
      ]
    },
    "status": {
      "summary": [
        {
          "status": "Online",
          "count": 1842,
          "percentage": 71.3
        },
        {
          "status": "Offline",
          "count": 423,
          "percentage": 16.4
        },
        {
          "status": "Mantenimiento",
          "count": 189,
          "percentage": 7.3
        },
        {
          "status": "Bloqueados",
          "count": 130,
          "percentage": 5.0
        }
      ]
    }
  }
}
```

### 2. Obtener Lista de Proxys
`GET /api/proxy/list`

Parámetros de consulta:
- `page` (número de página)
- `limit` (elementos por página)
- `status` (filtro por estado)
- `country` (filtro por país)
- `sort` (campo de ordenamiento)
- `order` (asc/desc)

Respuesta esperada:
```javascript
{
  "status": "success",
  "data": {
    "proxies": [
      {
        "id": "px-123456",
        "ip": "192.168.1.1",
        "port": 8080,
        "protocol": "HTTP",
        "country": {
          "name": "Estados Unidos",
          "code": "US"
        },
        "status": "Online",
        "speed": {
          "current": 156,
          "average": 162
        },
        "uptime": 99.8,
        "lastChecked": "2024-02-14T22:15:00Z",
        "createdAt": "2024-01-01T00:00:00Z",
        "tags": ["premium", "residential"],
        "stats": {
          "requests": 15234,
          "bandwidth": "1.2TB",
          "successRate": 98.5
        }
      }
    ],
    "pagination": {
      "total": 2584,
      "page": 1,
      "limit": 10,
      "pages": 259
    }
  }
}
```

### 3. Obtener Detalles de un Proxy
`GET /api/proxy/:id`

Respuesta esperada:
```javascript
{
  "status": "success",
  "data": {
    "proxy": {
      "id": "px-123456",
      "ip": "192.168.1.1",
      "port": 8080,
      "protocol": "HTTP",
      "country": {
        "name": "Estados Unidos",
        "code": "US",
        "city": "New York",
        "coordinates": [-73.935242, 40.730610]
      },
      "status": {
        "current": "Online",
        "lastChanged": "2024-02-14T20:00:00Z",
        "history": [
          {
            "status": "Offline",
            "timestamp": "2024-02-13T15:30:00Z",
            "duration": "5m"
          }
        ]
      },
      "performance": {
        "speed": {
          "current": 156,
          "average": 162,
          "history": [
            {
              "timestamp": "2024-02-14T22:00:00Z",
              "value": 156
            }
          ]
        },
        "uptime": {
          "percentage": 99.8,
          "since": "2024-01-01T00:00:00Z"
        }
      },
      "configuration": {
        "authentication": {
          "type": "username_password",
          "username": "user123"
        },
        "restrictions": {
          "maxConnections": 100,
          "allowedIPs": ["10.0.0.0/24"]
        },
        "features": ["SSL", "IPv6", "Rotating"]
      }
    }
  }
}
```

## Códigos de Error

La API debe devolver los siguientes códigos de estado HTTP:

- `200`: Éxito
- `400`: Error en la solicitud
- `401`: No autorizado
- `403`: Prohibido
- `404`: Recurso no encontrado
- `429`: Demasiadas solicitudes
- `500`: Error interno del servidor

Ejemplo de respuesta de error:
```javascript
{
  "status": "error",
  "error": {
    "code": "PROXY_NOT_FOUND",
    "message": "El proxy solicitado no existe",
    "details": {
      "proxyId": "px-123456"
    }
  }
}
```

## Notas de Implementación

1. Todos los timestamps deben estar en formato ISO 8601 y en UTC
2. Los porcentajes deben ser números con un máximo de 1 decimal
3. Las mediciones de velocidad deben estar en milisegundos
4. Los países deben incluir tanto el nombre como el código ISO
5. Las tendencias (trends) deben calcularse comparando con el período anterior equivalente
6. Los datos de rendimiento histórico deben mantener al menos 30 días de historia

## Seguridad

La API debe:
1. Requerir autenticación mediante token JWT
2. Implementar rate limiting
3. No exponer información sensible en las respuestas
4. Validar todos los parámetros de entrada
5. Implementar CORS apropiadamente
