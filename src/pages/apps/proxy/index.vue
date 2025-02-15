<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

// Datos ficticios para los gráficos
const proxyStats = {
  totalProxies: 2584,
  activeProxies: 1842,
  averageSpeed: '156',
  uptime: '99.2',
}

// Gráfico de línea - Velocidad de respuesta por hora
const responseTimeOptions = {
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
    categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
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
  colors: [vuetifyTheme.current.value.primary],
  tooltip: {
    theme: 'dark',
  },
}

const responseTimeSeries = [{
  name: 'Tiempo de Respuesta (ms)',
  data: [145, 132, 151, 184, 172, 165, 158, 147],
}]

// Gráfico circular - Distribución por país
const locationOptions = {
  chart: {
    type: 'donut',
    height: 300,
    toolbar: {
      show: false,
    },
  },
  labels: ['Estados Unidos', 'Alemania', 'Países Bajos', 'Francia', 'Reino Unido'],
  colors: [
    '#7367F0', // Primary
    '#28C76F', // Success
    '#EA5455', // Error
    '#FF9F43', // Warning
    '#00CFE8', // Info
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
}

const locationSeries = [35, 25, 20, 12, 8]

// Gráfico de barras - Estado de los proxies
const statusOptions = {
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
}

const statusSeries = [{
  name: 'Cantidad',
  data: [1842, 423, 189, 130],
}]
</script>

<template>
  <div>
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

    <!-- Tarjetas de estadísticas -->
    <VRow>
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
                  {{ proxyStats.totalProxies.toLocaleString() }}
                </span>
                <VIcon
                  size="42"
                  icon="tabler-server"
                  class="stats-icon"
                />
              </div>
              <span class="text-caption">Total Proxys</span>
              <VProgressLinear
                model-value="85"
                color="rgb(255 255 255 / 0.3)"
                height="4"
                class="mt-2"
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
        <VCard
          class="stats-card"
          color="success"
          theme="dark"
        >
          <VCardText>
            <div class="d-flex flex-column">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-h3 font-weight-medium">
                  {{ proxyStats.activeProxies.toLocaleString() }}
                </span>
                <VIcon
                  size="42"
                  icon="tabler-activity"
                  class="stats-icon"
                />
              </div>
              <span class="text-caption">Proxys Activos</span>
              <VProgressLinear
                model-value="71"
                color="rgb(255 255 255 / 0.3)"
                height="4"
                class="mt-2"
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
                    {{ proxyStats.averageSpeed }}
                  </span>
                  <span class="text-subtitle-1 ml-1">ms</span>
                </div>
                <VIcon
                  size="42"
                  icon="tabler-gauge"
                  class="stats-icon"
                />
              </div>
              <span class="text-caption">Velocidad Promedio</span>
              <VProgressLinear
                model-value="65"
                color="rgb(255 255 255 / 0.3)"
                height="4"
                class="mt-2"
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
                    {{ proxyStats.uptime }}
                  </span>
                  <span class="text-subtitle-1 ml-1">%</span>
                </div>
                <VIcon
                  size="42"
                  icon="tabler-clock"
                  class="stats-icon"
                />
              </div>
              <span class="text-caption">Uptime</span>
              <VProgressLinear
                model-value="99"
                color="rgb(255 255 255 / 0.3)"
                height="4"
                class="mt-2"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Gráficos -->
    <VRow class="mt-6">
      <VCol
        cols="12"
        md="8"
      >
        <VCard>
          <VCardItem>
            <VCardTitle>Tiempo de Respuesta (24h)</VCardTitle>
            <template #append>
              <div class="me-n3">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="small"
                >
                  <VIcon
                    size="24"
                    icon="tabler-dots-vertical"
                  />

                  <VMenu activator="parent">
                    <VList>
                      <VListItem
                        value="refresh"
                        title="Actualizar"
                      />
                      <VListItem
                        value="export"
                        title="Exportar"
                      />
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VCardItem>

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
        <VCard>
          <VCardItem>
            <VCardTitle>Distribución por País</VCardTitle>
            <template #append>
              <div class="me-n3">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="small"
                >
                  <VIcon
                    size="24"
                    icon="tabler-dots-vertical"
                  />

                  <VMenu activator="parent">
                    <VList>
                      <VListItem
                        value="refresh"
                        title="Actualizar"
                      />
                      <VListItem
                        value="export"
                        title="Exportar"
                      />
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VCardItem>

          <VCardText>
            <VueApexCharts
              :options="locationOptions"
              :series="locationSeries"
              type="donut"
              height="300"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard>
          <VCardItem>
            <VCardTitle>Estado de los Proxys</VCardTitle>
            <template #append>
              <div class="me-n3">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="small"
                >
                  <VIcon
                    size="24"
                    icon="tabler-dots-vertical"
                  />

                  <VMenu activator="parent">
                    <VList>
                      <VListItem
                        value="refresh"
                        title="Actualizar"
                      />
                      <VListItem
                        value="export"
                        title="Exportar"
                      />
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VCardItem>

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
