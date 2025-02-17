<script setup lang="ts">
interface ProxyIP {
  ip: string
  location: string
  status: string
  speed: string
}

const props = defineProps<{
  proxyIPs: ProxyIP[]
  loading?: boolean
}>()

const headers = [
  { title: 'IP', key: 'ip', align: 'start', sortable: true },
  { title: 'Ubicación', key: 'location', align: 'start', sortable: true },
  { title: 'Estado', key: 'status', align: 'center', sortable: true },
  { title: 'Velocidad', key: 'speed', align: 'end', sortable: true },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'online':
      return 'success'
    case 'offline':
      return 'error'
    case 'maintenance':
      return 'warning'
    default:
      return 'default'
  }
}
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <span class="text-h6">Lista de IPs de Proxy</span>
          <span 
            v-if="loading"
            class="text-caption text-disabled ml-2"
          >
            Actualizando...
          </span>
        </div>
        <VIcon
          icon="tabler-list"
          class="text-primary"
          :class="{ 'text-disabled': loading }"
        />
      </div>

      <VDataTable
        :headers="headers"
        :items="proxyIPs"
        :loading="loading"
        hover
      >
        <template #item.status="{ item }">
          <VChip
            :color="getStatusColor(item.status)"
            size="small"
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </template>

        <template #item.speed="{ item }">
          <span :class="{ 'text-high-emphasis': item.status === 'Online' }">
            {{ item.speed }}
          </span>
        </template>

        <template #no-data>
          <div class="text-center text-disabled py-8">
            No hay IPs de proxy disponibles
          </div>
        </template>
      </VDataTable>

      <div class="d-flex align-center justify-space-between pt-4">
        <VChip
          color="primary"
          size="small"
          class="font-weight-medium"
        >
          Total: {{ proxyIPs.length }}
        </VChip>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.text-disabled {
  opacity: 0.5;
}

.text-high-emphasis {
  font-weight: 500;
}

.v-data-table {
  background: transparent !important;

  :deep(th) {
    font-weight: 600;
    text-transform: uppercase;
    white-space: nowrap;
  }

  :deep(td) {
    height: 48px;
  }
}
</style>
