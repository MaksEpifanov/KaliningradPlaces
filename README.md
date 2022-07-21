# Kaliningrad Place

Сайт на котором можно выкладывать запечатлённые места Калининградской области.

## Table of contents

- [Overview](#overview)
    -  [Screenshots](#screenshots)
    -  [Links](#links)
- [My process](#my-process)
    -  [Technologies](#technologies)
    -  [What I learned](#what-i-learned)
- [Setup](#setup)


## Overview

### Screenshots
![Preview for Kaliningrad place](./src/screenshots/Preview.gif)

### Links

-   [Live Site URL](https://mighty-hollows-66653.herokuapp.com/)

## My process

### Technologies

### What I learned

## Setup

- `git clone https://github.com/MaksKlimov/KaliningradPlaces`
- `cd ./KaliningradPlaces`
- `npm isntall`
- необходимо создать `.env` файл в корневой папке.

Записать в `.env`:  
`SECRET_SESSION = "SOME TEXT"`  
`CLOUDINARY_CLOUD_NAME = 'Имя в сервисе CLOUDINARY'`  
`CLOUDINARY_KEY = 'Ключ в сервисе CLOUDINARY'`  
`CLOUDINARY_SECRET = 'Секрет в CLOUDINARY'`  

`MAPBOX_TOKEN="Токен в MAPBOX"`  
`DB_URL="База данных"`  

- `npm dev` - для запуска nodemon (нужно установить отдельно. `npm i -D nodemon` или глоально `npm i nodemon -g`)
