<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

// Datos ficticios para los gráficos
const proxyStats = {
  totalProxies: 2584,
  activeProxies: 1842,
  averageSpeed: '156ms',
  uptime: '99.2%',
}

// Gráfico de línea - Velocidad de respuesta por hora
const responseTimeOptions = {
  chart: {
    type: 'line',
    height: 300,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  },
  colors: [vuetifyTheme.current.value.primary],
}

const responseTimeSeries = [{
  name: 'Tiempo de Respuesta (ms)',
  data: [145, 132, 151, 184, 172, 165, 158, 147],
}]

// Gráfico circular - Distribución por país
const locationOptions = {
  chart: {
    type: 'pie',
    height: 300,
  },
  labels: ['Estados Unidos', 'Alemania', 'Países Bajos', 'Francia', 'Reino Unido'],
  colors: [
    vuetifyTheme.current.value.primary,
    vuetifyTheme.current.value.secondary,
    vuetifyTheme.current.value.success,
    vuetifyTheme.current.value.info,
    vuetifyTheme.current.value.warning,
  ],
}

const locationSeries = [35, 25, 20, 12, 8]

// Gráfico de barras - Estado de los proxies
const statusOptions = {
  chart: {
    type: 'bar',
    height: 300,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
    },
  },
  xaxis: {
    categories: ['Online', 'Offline', 'Mantenimiento', 'Bloqueados'],
  },
  colors: [vuetifyTheme.current.value.success],
}

const statusSeries = [{
  name: 'Cantidad',
  data: [1842, 423, 189, 130],
}]
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <h1 class="text-h4 mb-6">
          Panel de Control de Proxys
        </h1>
      </VCol>

      <!-- Tarjetas de estadísticas -->
      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center">
              <div>
                <span class="text-caption">Total Proxys</span>
                <h6 class="text-h6">
                  {{ proxyStats.totalProxies }}
                </h6>
              </div>
              <VIcon
                size="38"
                color="primary"
                icon="tabler-server"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center">
              <div>
                <span class="text-caption">Proxys Activos</span>
                <h6 class="text-h6">
                  {{ proxyStats.activeProxies }}
                </h6>
              </div>
              <VIcon
                size="38"
                color="success"
                icon="tabler-activity"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center">
              <div>
                <span class="text-caption">Velocidad Promedio</span>
                <h6 class="text-h6">
                  {{ proxyStats.averageSpeed }}
                </h6>
              </div>
              <VIcon
                size="38"
                color="warning"
                icon="tabler-gauge"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center">
              <div>
                <span class="text-caption">Uptime</span>
                <h6 class="text-h6">
                  {{ proxyStats.uptime }}
                </h6>
              </div>
              <VIcon
                size="38"
                color="info"
                icon="tabler-clock"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Gráficos -->
      <VCol
        cols="12"
        md="8"
      >
        <VCard title="Tiempo de Respuesta (24h)">
          <VCardText>
            <VueApexCharts
              :options="responseTimeOptions"
              :series="responseTimeSeries"
              height="300"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VCard title="Distribución por País">
          <VCardText>
            <VueApexCharts
              :options="locationOptions"
              :series="locationSeries"
              type="pie"
              height="300"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Estado de los Proxys">
          <VCardText>
            <VueApexCharts
              :options="statusOptions"
              :series="statusSeries"
              type="bar"
              height="300"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 1rem;
}
</style>
