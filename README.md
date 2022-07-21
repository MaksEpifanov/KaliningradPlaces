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

* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#top">back to top</a>)</p>

### What I learned

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
  npm isntall
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

5. `npm dev` - для запуска nodemon (нужно установить отдельно. `npm i -D nodemon` или глоально `npm i nodemon -g`)

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Maks Klimov - [@klimov4_maks](https://twitter.com/klimov4_maks) - maksklimovbr@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>