# Инициализация Git репозитория

## Команды для инициализации проекта:

1. Инициализация Git репозитория:

```bash
git init
```

2. Добавление всех файлов:

```bash
git add .
```

3. Первый коммит:

```bash
git commit -m "Initial commit: Express.js backend with authentication"
```

4. Добавление удаленного репозитория (замените URL на ваш):

```bash
git remote add origin https://github.com/yourusername/teck-react-app-backend.git
```

5. Отправка в репозиторий:

```bash
git push -u origin main
```

## Дополнительные команды:

- Проверка статуса: `git status`
- Просмотр изменений: `git diff`
- Просмотр истории: `git log --oneline`

## Настройка .env файла:

Скопируйте `env.example` в `.env` и настройте переменные:

```bash
cp env.example .env
```

Затем отредактируйте `.env` файл с вашими настройками.

