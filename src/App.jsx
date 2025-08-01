import React, { useState } from 'react'
import SensorDataForm from './components/SensorDataForm'
import SensorDataChart from './components/SensorDataChart'
import { fetchSensorData } from './services/api'

function App() {
  const [sensorData, setSensorData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFetchData = async (formData) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchSensorData(formData)
      setSensorData(data)
    } catch (err) {
      setError(err.message || 'Произошла ошибка при получении данных')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">     
      <SensorDataForm onSubmit={handleFetchData} />
      
      {loading && <div className="loading">Загрузка данных...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {sensorData.length > 0 && (
        <SensorDataChart data={sensorData} />
      )}
    </div>
  )
}

export default App 