<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework used to build this doctor appointment booking backend system using <strong>NestJS</strong>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 🏩 Doctor Appointment Booking System

A simple RESTful backend built with **NestJS** and **Sequelize** for booking doctor appointments. Key features:

* View list of doctors
* Filter doctors by specialization
* View available slots for a doctor
* Book appointments (with overlap prevention)
* Sequelize/PostgreSQL support
* Modular, scalable NestJS code structure

---

## 💠 Project Setup

```bash
# install dependencies
npm install

# run in development mode
npm run start:dev

# run in production mode
npm run start:prod
```

---

## 📆 API Overview

* `GET /doctors` – list all doctors
* `GET /doctors/:id` – get doctor by ID
* `GET /doctors/:id/available-slots?date=YYYY-MM-DD` – available slots on a date
* `POST /appointments` – book appointment
* `GET /appointments` – list all appointments
* `DELETE /appointments/:id` – cancel appointment

---

## 📘 Tech Stack

* [NestJS](https://nestjs.com/) (Framework)
* [Sequelize](https://sequelize.org/) (ORM)
* [PostgreSQL](https://www.postgresql.org/) (Database)
* [class-validator](https://github.com/typestack/class-validator) (Validation)

---

## 🚀 Features

* Prevents double-booking of doctors
* Validates appointment time overlaps
* Input validation with `class-validator`
* Full ISO datetime checks
* Timezone-aware (UTC-safe) appointment handling

---

## 📚 Resources

* [NestJS Docs](https://docs.nestjs.com)
* [Sequelize Docs](https://sequelize.org/master/)
* [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 👨‍💼 Author

* **Abhishek (Tweniee)**

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/nestjs/nest/blob/master/LICENSE).

---
