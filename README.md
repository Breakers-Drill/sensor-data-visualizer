# Визуализатор данных сенсоров



## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd sensor-data-visualizer
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `env.example`:
```bash
cp env.example .env
```

4. Настройте URL вашего API в файле `.env`:
```
VITE_API_URL=http://your-api-url.com/api
```

## Запуск

Для запуска в режиме разработки:
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.
