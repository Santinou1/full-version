<script setup lang="ts">
import { computed } from 'vue'

interface ProxyStats {
  totalProxies: number
  activeProxies: number
  averageSpeed: string
  uptime: string
}

const props = defineProps<{
  stats: ProxyStats
  loading?: boolean
}>()

const defaultStats: ProxyStats = {
  totalProxies: 0,
  activeProxies: 0,
  averageSpeed: '0',
  uptime: '0',
}

const stats = computed(() => props.stats || defaultStats)
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <div class="d-flex justify-space-between align-center">
        <h1 class="text-h4">
          Panel de Control de Proxys
        </h1>
        <VBtn
          color="primary"
          prepend-icon="tabler-plus"
        >
          Nuevo Proxy
        </VBtn>
      </div>
    </VCardText>
  </VCard>

  <VRow>
    <!-- Total Proxies -->
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard
        class="stats-card"
        color="primary"
        theme="dark"
      >
        <VCardText>
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-h3 font-weight-medium">
                {{ stats.totalProxies.toLocaleString() }}
              </span>
              <VIcon
                size="42"
                icon="tabler-server"
                class="text-primary"
              />
            </div>
            <span class="text-body-2">Total Proxies</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Active Proxies -->
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard
        class="stats-card"
        color="success"
        theme="dark"
      >
        <VCardText>
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-h3 font-weight-medium">
                {{ stats.activeProxies.toLocaleString() }}
              </span>
              <VIcon
                size="42"
                icon="tabler-activity"
                class="text-success"
              />
            </div>
            <span class="text-body-2">Proxies Activos</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Average Speed -->
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard
        class="stats-card"
        color="warning"
        theme="dark"
      >
        <VCardText>
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <span class="text-h3 font-weight-medium">
                  {{ stats.averageSpeed }}
                </span>
                <span class="text-subtitle-1 ml-1">ms</span>
              </div>
              <VIcon
                size="42"
                icon="tabler-gauge"
                class="text-warning"
              />
            </div>
            <span class="text-body-2">Velocidad Promedio</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Uptime -->
    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <VCard
        class="stats-card"
        color="info"
        theme="dark"
      >
        <VCardText>
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <span class="text-h3 font-weight-medium">
                  {{ stats.uptime }}
                </span>
                <span class="text-subtitle-1 ml-1">%</span>
              </div>
              <VIcon
                size="42"
                icon="tabler-clock"
                class="text-info"
              />
            </div>
            <span class="text-body-2">Uptime</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.stats-card {
  .v-card-text {
    padding: 1.5rem;
  }
}

.text-disabled {
  opacity: 0.5;
}
</style>
