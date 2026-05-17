# AI Voice Chat

Тестовое fullstack-приложение с React frontend и Express backend. Пользователь вводит текст или диктует его голосом, сервер отправляет запрос в OpenAI API и возвращает ответ в интерфейс.

## Что реализовано

- текстовый ввод и отправка сообщения
- отображение истории сообщений
- индикатор загрузки
- обработка ошибок на клиенте и сервере
- голосовой ввод через Web Speech API
- health-check endpoint для backend

## Стек

- Frontend: React + Vite + TypeScript + CSS
- Backend: Node.js + Express + TypeScript
- AI: OpenAI API через официальный SDK

## Запуск

1. Установите зависимости:

```bash
npm install
npm --prefix server install
npm --prefix client install
```

2. Создайте файл `server/.env` на основе `server/.env.example` и при необходимости `client/.env` на основе `client/.env.example`.

3. Запустите проект:

```bash
npm run dev
```

4. Откройте `http://localhost:5173`.

## Production-сценарий

1. Соберите frontend:

```bash
npm run build
```

2. Запустите сервер:

```bash
npm start
```

После сборки backend автоматически раздаёт `client/dist`, поэтому приложение будет доступно по `http://localhost:4000`.

## Деплой на Render

Проект готов к деплою одним сервисом через [render.yaml](/C:/Users/Star/Documents/nest/job-project/render.yaml:1).

1. Запушьте репозиторий в GitHub.
2. В Render выберите `New +` -> `Blueprint`.
3. Подключите репозиторий и подтвердите создание сервиса из `render.yaml`.
4. В Render задайте секреты:

```env
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=https://your-app-name.onrender.com
```

5. После деплоя откройте URL сервиса и проверьте `GET /api/health`.

Для production клиент по умолчанию использует относительный путь `/api/chat`, поэтому frontend и backend работают под одним доменом без дополнительной настройки `VITE_API_URL`.

## Переменные окружения

```env
PORT=4000
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
```

```env
VITE_API_URL=http://localhost:4000
```

## API

### `GET /api/health`

Возвращает статус сервера и факт наличия API-ключа.

### `POST /api/chat`

Тело запроса:

```json
{
  "message": "Привет! Расскажи о NestJS."
}
```

Пример ответа:

```json
{
  "reply": "NestJS — это прогрессивный фреймворк для Node.js..."
}
```

## Что важно для проверки

- голосовой ввод работает в браузерах с поддержкой `SpeechRecognition` / `webkitSpeechRecognition`
- без `OPENAI_API_KEY` backend вернет понятную ошибку
- frontend и backend разделены по зонам ответственности
