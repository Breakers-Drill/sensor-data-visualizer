import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    
    if (error.response) {
      const message = error.response.data?.message || 
                     `Ошибка ${error.response.status}: ${error.response.statusText}`
      throw new Error(message)
    } else if (error.request) {
      throw new Error('Не удалось подключиться к серверу. Проверьте URL API и подключение к интернету.')
    } else {
      throw new Error('Ошибка при отправке запроса')
    }
  }
)

export const fetchSensorData = async (requestData) => {
  try {
    console.log('Отправка запроса к API:', requestData)
    
    const response = await apiClient.post('/sensor-data', requestData)
    
    console.log('Ответ от API:', response.data)
    
    if (!Array.isArray(response.data)) {
      throw new Error('Неверный формат данных от сервера')
    }
    
    return response.data
  } catch (error) {
    console.error('Ошибка при получении данных сенсора:', error)
    throw error
  }
}

export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/health-check')
    return response.data
  } catch (error) {
    console.error('API недоступен:', error)
    return null
  }
}

export default apiClient 