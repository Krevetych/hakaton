# Frontend часть для хакатона "IT-Вызов"

## Оглавление:

- **[Основной стек](#основной-стек)**
- **[Запуск проекта](#запуск-проекта)**
  - **[Базовый запуск](#базовый-запуск)**
  - **[Запуск через Docker](#запуск-через-docker)**
- **[Дополнительная информация](#дополнительная-информация)**

## Основной стек

- **[Next.js v14.2.5](https://nextjs.org/) | [(React v18.3.1)](https://react.dev/)**
- **[TailwindCSS](https://tailwindcss.com/)**
- **[Nextui](https://nextui.org/)**
- **[Axios](https://axios-http.com/)**

## Запуск проекта

**Есть 2 возможных варианта запуска проекта:**

1. Базовая, с использование Node.js и npm (Классический)
2. Запуск Docker контенера (Более быстрый и легкий)

### Базовый запуск

**Убедитесь, что у вас установлены [Node.js](https://nodejs.org) и [npm](https://www.npmjs.com/)**

1.  Клонируйте репозиторий:

```sh
git clone https://gitflic.ru/project/ev3rgarden/hakaton.git -b frontend
cd hakaton
```

2.  Установите необходимые зависимости и соберите проект:

```sh
npm install
npm run build
```

3.  Запустите проект:

```sh
npm run start
```

Приложение будет доступно по адресу `http:localhost:3000`
Для остановки процесса используйте команду `Ctrl+C`

### Запуск через Docker

**Убедитесь, что у вас установлен [Docker](https://www.docker.com/)**

1. Клонируйте репозиторий

2. Соберите Docker контейнер
	
```sh
docker build -t hakaton .
```

3. Запустите проект:

```sh
docker run -d -p 3000:3000 --name hakaton hakaton
```

Приложение будет доступно по адресу `http:localhost:3000`
Для остановки процесса используйте команду `docker stop hakaton`
Для просмотра контейнеров - `docker ps -a`
Для удаления контейнера - `docker rm {CONTAINER_ID}`

## Дополнительная информация
**Разработанно специально для хакатона "IT-Вызов" [корпорацией добра](https://youtu.be/dQw4w9WgXcQ?si=bASYzy9cOjwbunOy), не подлежит переиспользованию**

Рабочий проект с заполненной базой данных находится по адресу `https://hakaton.movie-rank.ru`
