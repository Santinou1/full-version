# Estructura de Datos para API de Proxy

## Estadísticas Generales
```json
{
  "totalProxies": number,    // Total de proxies en el sistema
  "activeProxies": number,   // Proxies actualmente activos
  "averageSpeed": string,    // Velocidad promedio (en ms)
  "uptime": string          // Porcentaje de tiempo activo
}
```

## Tiempo de Respuesta
```json
{
  "responseTime": [
    {
      "hour": string,        // Formato: "HH:00"
      "value": number        // Tiempo de respuesta en ms
    }
  ]
}
```

## Distribución por País
```json
{
  "locations": [
    {
      "country": string,     // Nombre del país
      "percentage": number   // Porcentaje del total (suma debe ser 100)
    }
  ]
}
```

## Estado de Proxies
```json
{
  "status": {
    "online": number,        // Cantidad de proxies online
    "offline": number,       // Cantidad de proxies offline
    "maintenance": number,   // Cantidad en mantenimiento
    "blocked": number        // Cantidad bloqueados
  }
}
```

### Notas Importantes:
1. Los tiempos de respuesta se miden en milisegundos
2. Los porcentajes se expresan como números (sin el símbolo %)
3. Las estadísticas se actualizan en tiempo real
4. Los países principales son: Estados Unidos, Alemania, Países Bajos, Francia, Reino Unido

### Ejemplo de Respuesta API
```json
{
  "stats": {
    "totalProxies": 2584,
    "activeProxies": 1842,
    "averageSpeed": "156",
    "uptime": "99.2"
  },
  "responseTime": [
    {"hour": "00:00", "value": 145},
    {"hour": "03:00", "value": 132},
    {"hour": "06:00", "value": 151},
    {"hour": "09:00", "value": 184},
    {"hour": "12:00", "value": 172},
    {"hour": "15:00", "value": 165},
    {"hour": "18:00", "value": 158},
    {"hour": "21:00", "value": 147}
  ],
  "locations": [
    {"country": "Estados Unidos", "percentage": 35},
    {"country": "Alemania", "percentage": 25},
    {"country": "Países Bajos", "percentage": 20},
    {"country": "Francia", "percentage": 12},
    {"country": "Reino Unido", "percentage": 8}
  ],
  "status": {
    "online": 1842,
    "offline": 423,
    "maintenance": 189,
    "blocked": 130
  }
}
```

## Sugerencias para el Backend

### Endpoints Recomendados

1. GET `/api/proxy/stats`
   - Retorna las estadísticas generales

2. GET `/api/proxy/response-time`
   - Retorna los datos de tiempo de respuesta

3. GET `/api/proxy/locations`
   - Retorna la distribución por países

4. GET `/api/proxy/status`
   - Retorna el estado de los proxies

5. GET `/api/proxy/all`
   - Retorna todos los datos en un solo endpoint

