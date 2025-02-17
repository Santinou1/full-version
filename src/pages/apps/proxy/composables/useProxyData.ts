import { ref } from 'vue'
import axios from 'axios'

interface ProxyStats {
  totalProxies: number
  activeProxies: number
  averageSpeed: string
  uptime: string
}

interface ResponseTimeData {
  hour: string
  value: number
}

interface LocationData {
  country: string
  percentage: number
}

interface StatusData {
  online: number
  offline: number
  maintenance: number
  blocked: number
}

interface ProxyIP {
  ip: string
  location: string
  status: string
  speed: string
}

interface ProxyData {
  stats: ProxyStats
  responseTime: ResponseTimeData[]
  locations: LocationData[]
  status: StatusData
  proxyIPs: ProxyIP[]
}

export function useProxyData() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const stats = ref<ProxyStats>({
    totalProxies: 0,
    activeProxies: 0,
    averageSpeed: '0',
    uptime: '0',
  })
  
  const responseTime = ref<ResponseTimeData[]>([])
  const locations = ref<LocationData[]>([])
  const status = ref<StatusData>({
    online: 0,
    offline: 0,
    maintenance: 0,
    blocked: 0,
  })
  
  // Inicializar con algunos datos de prueba
  const proxyIPs = ref<ProxyIP[]>([
    {
      ip: '192.168.1.100',
      location: 'Estados Unidos',
      status: 'Online',
      speed: '150ms'
    },
    {
      ip: '192.168.1.101',
      location: 'España',
      status: 'Offline',
      speed: '0ms'
    },
    {
      ip: '192.168.1.102',
      location: 'Brasil',
      status: 'Online',
      speed: '120ms'
    },
    {
      ip: '192.168.1.103',
      location: 'Argentina',
      status: 'Maintenance',
      speed: '0ms'
    }
  ])

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<ProxyData>('http://localhost:3000/api/proxy/all')
      const data = response.data

      stats.value = data.stats
      responseTime.value = data.responseTime
      locations.value = data.locations
      status.value = data.status
      
      if (data.proxyIPs && Array.isArray(data.proxyIPs)) {
        proxyIPs.value = data.proxyIPs
      }
      
      console.log('Datos cargados:', {
        stats: stats.value,
        proxyIPs: proxyIPs.value,
        responseTime: responseTime.value,
        locations: locations.value,
        status: status.value
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar los datos'
      console.error('Error al cargar los datos:', err)
    } finally {
      loading.value = false
    }
  }

  const startPolling = (interval = 30000) => {
    fetchData()
    const timer = setInterval(fetchData, interval)
    return () => clearInterval(timer)
  }

  return {
    loading,
    error,
    stats,
    responseTime,
    locations,
    status,
    proxyIPs,
    fetchData,
    startPolling,
  }
}
