<div id="top"></div>

# Kaliningrad Place

Сайт на котором можно выкладывать запечатлённые места Калининградской области. Возможность регистрации, создания маркера на карте и добавление лучших фотографий. 


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#links">Links</a></li>
      </ul>
    </li>
    <li>
      <a href="#my-process">My process</a>
      <ul>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#what-i-learned">What I learned</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## Overview

### Screenshots
![Preview for Kaliningrad place](./src/screenshots/Preview.gif)

### Links

-   [Live Site URL](https://mighty-hollows-66653.herokuapp.com/)

-   [Figma](https://www.figma.com/file/IT1BlivaOKpzs46YSzmlKD/Kaliningrad-place?node-id=0%3A1)

<p align="right">(<a href="#top">back to top</a>)</p>

## My process

### Technologies

* [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
* [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) ([Mongoose](https://mongoosejs.com/))
* [![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/) ([EJS](https://ejs.co/))
* [![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)
* [![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)](https://www.heroku.com/)

  #### Middlewares for Node.js (Express.js):
  * [passport](https://www.npmjs.com/package/passport) - Аутентификация
  * [cors](https://www.npmjs.com/package/cors) - Безопасность
  * [helmet](https://www.npmjs.com/package/helmet) - Безопасность
  * etc... --> [package.json](./package.json) 

  #### API:
  * [MapBox](https://www.mapbox.com/) - Для отображения кластеров и выбора маркера места.
  * [Cloudinary](https://cloudinary.com/) - Для хранения изображений.
<p align="right">(<a href="#top">back to top</a>)</p>

### Features

* Аутентификация и авторизация пользователя (реализованно с помощью: passport).
* Валидация при регистрации/аутентификации на стороне клиента и на стороне бэкенда.
* Отдельная страница профиля с возможностью изменения пользовательских данных и управлением созданных "мест".
* Создание, редактирование и удаление "места" с указанием названия, описания, фотографиями и отметкой на карте с координатами (MapBox API).
* Пагинация "мест".
* Возможность просматривать "места" и оставлять комментарии.

<p align="right">(<a href="#top">back to top</a>)</p>

### What I learned

* Приобрел и укрепил понимание работы Web. 
* Знание CRUD операций, создание ответов на запросы.
* Базовое взаимодействие с noSQL базой данных (MongoDB). Установка на локальной машине (Linux) и работа с ней через терминал.
* Освоил работу с API.
* Приобрел базовое представление о безопасности в Web.
* Базовая работа с Figma.

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

1. Зарегистрироваться на [https://cloudinary.com/](https://cloudinary.com/) понадобятся (`CLOUD_NAME`, `KEY`, `SECRET`)

2. Зарегистрироваться на [https://www.mapbox.com/](https://www.mapbox.com/) понадобится `MAPBOX_TOKEN`

3. Клонировать репозиторий 
  ```sh
  git clone https://github.com/MaksKlimov/KaliningradPlaces
  ```

4. Установить зависимости
  ```sh
  npm install
  ```
5. Создать `.env` файл в корневой папке и записать в него:
  ```sh
  SECRET_SESSION = "SOME TEXT"
  CLOUDINARY_CLOUD_NAME = 'Имя в сервисе CLOUDINARY'
  CLOUDINARY_KEY = 'Ключ в сервисе CLOUDINARY'
  CLOUDINARY_SECRET = 'Секрет в CLOUDINARY'`

  MAPBOX_TOKEN="Токен в MAPBOX"
  DB_URL="База данных"
  ```

5. `npm dev` - для запуска nodemon (нужно установить отдельно. `npm i -D nodemon` или глобально `npm i nodemon -g`)

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Maks Klimov  

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/klimov4_maks)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/MaksKlimovBR)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:maksklimovbr@gmail.com)

<p align="right">(<a href="#top">back to top</a>)</p>