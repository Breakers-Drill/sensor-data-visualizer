import { format } from 'date-fns'
import { useState } from 'react'

const SensorDataForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		tag: 'DC_out_100ms[144]',
		startDate: format(new Date(Date.now() - 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
		endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
		interval: '1h',
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const requestData = {
			tag: formData.tag,
			dateInterval: {
				start: new Date(formData.startDate).toISOString(),
				end: new Date(formData.endDate).toISOString(),
			},
		}
		if (formData.interval && formData.interval !== 'none') {
			requestData.interval = formData.interval
		}

		onSubmit(requestData)
	}

	return (
		<div className='form-container'>
			<h2>Параметры запроса</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='tag'>Тег сенсора:</label>
					<input
						type='text'
						id='tag'
						name='tag'
						value={formData.tag}
						onChange={handleInputChange}
						placeholder='Например: DC_out_100ms[144]'
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='startDate'>Начальная дата:</label>
					<input
						type='datetime-local'
						id='startDate'
						name='startDate'
						value={formData.startDate}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='endDate'>Конечная дата:</label>
					<input
						type='datetime-local'
						id='endDate'
						name='endDate'
						value={formData.endDate}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='interval'>Интервал:</label>
					<select id='interval' name='interval' value={formData.interval} onChange={handleInputChange}>
						<option value='none'>Без интервала</option>
						<option value='1min'>1 минута</option>
						<option value='5min'>5 минут</option>
						<option value='10min'>10 минут</option>
						<option value='30min'>30 минут</option>
						<option value='1h'>Час</option>
						<option value='2h'>2 часа</option>
					</select>
				</div>

				<button type='submit' className='button'>
					Получить данные
				</button>
			</form>
		</div>
	)
}

export default SensorDataForm
