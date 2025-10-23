# Teck React App Backend

Backend API для React приложения с аутентификацией и управлением пользователями, построенный на Express.js и TypeScript.

## 🚀 Возможности

- **Аутентификация**: Регистрация, вход, обновление токенов
- **Управление пользователями**: CRUD операции для пользователей
- **Роли**: Система ролей (user, admin, moderator)
- **JWT токены**: Access и refresh токены
- **MongoDB**: База данных с Mongoose ODM
- **TypeScript**: Полная типизация
- **Валидация**: Zod схемы для валидации данных

## 📋 Требования

- Node.js >= 16.0.0
- MongoDB
- npm или yarn

## 🛠 Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone <your-repository-url>
   cd teck-react-app-backend
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**

   ```bash
   cp env.example .env
   ```

   Отредактируйте файл `.env` и укажите ваши настройки:

   ```env
   PORT=7000
   HOST=127.0.0.1
   MONGO_URI=mongodb://localhost:27017/teck-react-app
   JWT_ACCESS_SECRET=your-super-secret-access-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   NODE_ENV=development
   ```

4. **Запустите MongoDB:**
   Убедитесь, что MongoDB запущен на вашей системе.

## 🚀 Запуск

### Режим разработки

```bash
npm run dev
```

### Сборка и запуск в продакшене

```bash
npm run build
npm start
```

## 📁 Структура проекта

```
teck-react-app-backend/
├── auth/                 # Аутентификация
│   ├── controller.ts     # Контроллеры аутентификации
│   ├── middleware.ts     # Middleware для проверки токенов
│   ├── router.ts         # Маршруты аутентификации
│   └── schemas.ts        # Mongoose схемы для аутентификации
├── user/                 # Управление пользователями
│   ├── controller.ts     # Контроллеры пользователей
│   ├── router.ts         # Маршруты пользователей
│   ├── schema.ts         # Mongoose схема пользователей
│   └── service.ts        # Бизнес-логика пользователей
├── logs/                 # Логи приложения
├── schemas/              # Общие схемы
├── seedRoles.ts          # Скрипт для создания ролей
├── server.ts             # Главный файл сервера
├── package.json          # Конфигурация проекта
├── tsconfig.json         # Конфигурация TypeScript
└── README.md             # Документация проекта
```

## 🔗 API Endpoints

### Аутентификация (`/auth`)

- `POST /auth/registration` - Регистрация пользователя
- `POST /auth/login` - Вход в систему
- `GET /auth/me` - Получение информации о текущем пользователе
- `POST /auth/refresh` - Обновление токенов

### Пользователи (`/`)

- `GET /users` - Получение списка пользователей
- `GET /users/:id` - Получение пользователя по ID
- `POST /users` - Создание нового пользователя
- `PUT /users/:id` - Обновление пользователя
- `DELETE /users/:id` - Удаление пользователя

## 🔐 Аутентификация

API использует JWT токены для аутентификации:

- **Access Token**: Действует 15 минут
- **Refresh Token**: Действует 30 дней

Для доступа к защищенным маршрутам добавьте заголовок:

```
Authorization: Bearer <access_token>
```

## 🗄 База данных

Проект использует MongoDB с следующими коллекциями:

- **UserAuth**: Пользователи с аутентификацией
- **User**: Дополнительная информация о пользователях
- **Role**: Роли пользователей

## 🛠 Скрипты

- `npm run dev` - Запуск в режиме разработки с hot reload
- `npm run build` - Сборка TypeScript в JavaScript
- `npm start` - Запуск собранного приложения
- `npm run clean` - Очистка папки dist

## 🔧 Разработка

### Добавление новых маршрутов

1. Создайте контроллер в соответствующей папке
2. Создайте роутер с маршрутами
3. Подключите роутер в `server.ts`

### Валидация данных

Используйте Zod схемы для валидации входящих данных:

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

## 🚀 Деплой

1. Соберите проект: `npm run build`
2. Настройте переменные окружения для продакшена
3. Запустите: `npm start`

## 📝 Лицензия

MIT License

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или проблемы, создайте Issue в репозитории.
