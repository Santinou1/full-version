<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue'

interface StatusData {
  online: number
  offline: number
  maintenance: number
  blocked: number
}

const props = defineProps<{
  status: StatusData
  loading?: boolean
}>()

const series = computed(() => [{
  name: 'Cantidad',
  data: [
    props.status.online,
    props.status.offline,
    props.status.maintenance,
    props.status.blocked,
  ],
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 300,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 6,
      distributed: true,
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    padding: {
      top: -20,
    },
  },
  xaxis: {
    categories: ['Online', 'Offline', 'Mantenimiento', 'Bloqueados'],
    labels: {
      style: {
        colors: '#888',
      },
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#888',
      },
    },
  },
  colors: ['#28C76F', '#EA5455', '#FF9F43', '#7367F0'],
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: 'dark',
  },
}))
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <span class="text-h6">Estado de los Proxys</span>
          <span 
            v-if="loading"
            class="text-caption text-disabled ml-2"
          >
            Actualizando...
          </span>
        </div>
        <VIcon
          icon="tabler-chart-bar"
          class="text-primary"
          :class="{ 'text-disabled': loading }"
        />
      </div>

      <VueApexCharts
        :options="chartOptions"
        :series="series"
        type="bar"
        height="300"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.text-disabled {
  opacity: 0.5;
}
</style>
