# Guía de Frontend

## Template Vuexy

Utilizamos [Vuexy](https://demos.pixinvent.com/vuexy-vuejs-admin-template/documentation/) como nuestra plantilla base de administración. Esta proporciona:

- Componentes UI predefinidos
- Layouts responsivos
- Temas y personalización
- Componentes de datos (tablas, gráficos, etc.)

## Vue Query

### Introducción

[Vue Query](https://tanstack.com/query/v5/docs/framework/vue/overview) es nuestra solución para el manejo de estado y caché de datos. Proporciona una forma elegante de manejar:

- Peticiones al servidor
- Caché de datos
- Estados de carga
- Manejo de errores

### Estados Principales

- `isPending`: La petición está en curso
- `isError`: Hubo un error en la petición
- `isSuccess`: La petición se completó exitosamente
- `data`: Los datos recibidos

### Ejemplo de Uso

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { data, isPending, error } = useQuery({
  queryKey: ['usuarios'],
  queryFn: async () => {
    const response = await fetch('/api/usuarios')
    return response.json()
  }
})
</script>

<template>
  <div>
    <div v-if="isPending">Cargando...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="usuario in data" :key="usuario.id">
          {{ usuario.nombre }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

### Mejores Prácticas

1. **Claves de Query**
   - Usar claves descriptivas
   - Incluir parámetros relevantes
   ```typescript
   queryKey: ['usuarios', { filtro: 'activos' }]
   ```

2. **Manejo de Errores**
   - Siempre verificar el estado `isError`
   - Mostrar mensajes de error amigables

3. **Estados de Carga**
   - Utilizar `isPending` para mostrar estados de carga
   - Implementar skeletons o spinners

4. **Revalidación**
   - Configurar intervalos de revalidación según necesidad
   ```typescript
   useQuery({
     queryKey: ['datos'],
     queryFn: fetchDatos,
     refetchInterval: 5000 // Revalidar cada 5 segundos
   })
   ```

## Componentes Comunes

### Tablas de Datos
```vue
<VDataTable
  :headers="headers"
  :items="data"
  :loading="isPending"
/>
```

### Formularios
```vue
<VForm @submit="handleSubmit">
  <VTextField
    v-model="formData.nombre"
    label="Nombre"
    required
  />
</VForm>
```

### Modales
```vue
<VDialog v-model="dialogVisible">
  <VCard>
    <VCardTitle>Título</VCardTitle>
    <VCardText>Contenido</VCardText>
  </VCard>
</VDialog>
```
