<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import ProxyStats from './components/ProxyStats.vue'
import ProxyResponseTime from './components/ProxyResponseTime.vue'
import ProxyLocations from './components/ProxyLocations.vue'
import ProxyStatus from './components/ProxyStatus.vue'
import ProxyIpTable from './components/ProxyIpTable.vue'
import { useProxyData } from './composables/useProxyData'

const {
  loading,
  error,
  stats,
  responseTime,
  locations,
  status,
  proxyIPs,
  startPolling,
} = useProxyData()

// Configurar los datos del gráfico de tiempo de respuesta
const responseTimeSeries = computed(() => [{
  name: 'Tiempo de Respuesta (ms)',
  data: responseTime.value.map(item => item.value),
}])

const responseTimeCategories = computed(() => 
  responseTime.value.map(item => item.hour)
)

// Iniciar el polling de datos cuando se monta el componente
let stopPolling: (() => void) | null = null

onMounted(() => {
  console.log('Componente montado')
  stopPolling = startPolling(30000) // Actualizar cada 30 segundos
})

onUnmounted(() => {
  if (stopPolling) stopPolling()
})
</script>

<template>
  <div>
    <VAlert
      v-if="error"
      type="error"
      variant="tonal"
      closable
    >
      {{ error }}
    </VAlert>

    <ProxyStats
      :stats="stats"
      :loading="loading"
    />

    <VRow class="mt-6">
      <VCol
        cols="12"
        md="8"
      >
        <ProxyResponseTime
          :series="responseTimeSeries"
          :categories="responseTimeCategories"
          :loading="loading"
        />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <ProxyLocations
          :locations="locations"
          :loading="loading"
        />
      </VCol>
    </VRow>

    <VRow class="mt-6">
      <VCol
        cols="12"
        md="6"
      >
        <ProxyStatus
          :status="status"
          :loading="loading"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <div v-if="proxyIPs.length === 0" class="text-subtitle-1 text-medium-emphasis">
          No hay IPs de proxy disponibles
        </div>
        <ProxyIpTable
          :proxyIPs="proxyIPs"
          :loading="loading"
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.stats-card {
  position: relative;
  overflow: hidden;

  .stats-icon {
    opacity: 0.7;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;

    .stats-icon {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }
  }
}

.v-card {
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1) !important;
  }
}
</style>
