<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue'

interface Series {
  name: string
  data: number[]
}

const props = defineProps<{
  series: Series[]
  categories: string[]
  loading?: boolean
}>()

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 300,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.8,
      opacityFrom: 0.7,
      opacityTo: 0.2,
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: props.categories,
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
      formatter: (value: number) => `${value} ms`,
    },
  },
  colors: ['#7367F0'],
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value: number) => `${value} ms`,
    },
  },
}))
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <span class="text-h6">Tiempo de Respuesta (24h)</span>
          <span 
            v-if="props.loading"
            class="text-caption text-disabled ml-2"
          >
            Actualizando...
          </span>
        </div>
        <VIcon
          icon="tabler-chart-line"
          class="text-primary"
          :class="{ 'text-disabled': props.loading }"
        />
      </div>

      <VueApexCharts
        :options="chartOptions"
        :series="props.series"
        type="area"
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
