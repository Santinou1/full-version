<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue'

interface LocationData {
  country: string
  percentage: number
}

const props = defineProps<{
  locations: LocationData[]
  loading?: boolean
}>()

const series = computed(() => 
  props.locations.map(location => location.percentage)
)

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 300,
    toolbar: {
      show: false,
    },
  },
  labels: props.locations.map(location => location.country),
  colors: [
    '#7367F0',
    '#28C76F',
    '#EA5455',
    '#FF9F43',
    '#00CFE8',
  ],
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '0.9375rem',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '1.5rem',
            offsetY: 8,
            formatter: (val: any) => `${val}%`,
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '0.9375rem',
            formatter: () => '100%',
          },
        },
      },
    },
  },
  legend: {
    position: 'bottom',
    markers: {
      offsetX: -3,
    },
    labels: {
      colors: '#888',
    },
    itemMargin: {
      horizontal: 10,
    },
  },
  tooltip: {
    theme: 'dark',
  },
  noData: {
    text: props.loading ? 'Cargando...' : 'Sin datos disponibles',
    align: 'center',
    verticalAlign: 'middle',
    style: {
      fontSize: '1rem',
      color: '#888',
    },
  },
}))
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <span class="text-h6">Distribución por País</span>
          <span 
            v-if="loading"
            class="text-caption text-disabled ml-2"
          >
            Actualizando...
          </span>
        </div>
        <VIcon
          icon="tabler-chart-pie"
          class="text-primary"
          :class="{ 'text-disabled': loading }"
        />
      </div>

      <VueApexCharts
        :options="chartOptions"
        :series="series"
        type="donut"
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
