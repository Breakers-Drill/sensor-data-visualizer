import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

const SensorDataChart = ({ data }) => {

  const chartData = data.map(item => ({
    ...item,
    timestamp: parseISO(item.timestamp),
    formattedTime: format(parseISO(item.timestamp), 'dd.MM.yyyy HH:mm', { locale: ru })
  }))
  chartData.sort((a, b) => a.timestamp - b.timestamp)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #444',
          borderRadius: '4px',
          padding: '10px'
        }}>
          <p style={{ margin: '0 0 5px 0', color: '#fff' }}>
            <strong>Время:</strong> {label}
          </p>
          <p style={{ margin: '0 0 5px 0', color: '#888' }}>
            <strong>Значение:</strong> {payload[0].value}
          </p>
          <p style={{ margin: '0', color: '#888' }}>
            <strong>ID:</strong> {payload[0].payload.id}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="chart-container">
      <h2>График данных сенсора</h2>
      <p>Тег: {data[0]?.tag} | Количество точек: {data.length}</p>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="formattedTime"
            stroke="#888"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#646cff"
            strokeWidth={2}
            dot={{ fill: '#646cff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#646cff', strokeWidth: 2 }}
            name="Значение сенсора"
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Статистика данных:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
          <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px' }}>
            <strong>Минимальное значение:</strong> {Math.min(...data.map(d => d.value))}
          </div>
          <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px' }}>
            <strong>Максимальное значение:</strong> {Math.max(...data.map(d => d.value))}
          </div>
          <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px' }}>
            <strong>Среднее значение:</strong> {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(2)}
          </div>
          <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '4px' }}>
            <strong>Количество записей:</strong> {data.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorDataChart 