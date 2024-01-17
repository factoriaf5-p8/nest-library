# NEST LIBRARY

## Introduction
NestJS is a framework for developing Node.js applications on the server side. It is programmed in TypeScript and provides an in-application architecture that allows the development of more maintainable applications. Its architecture is quite inspired by Angular, which makes the development team's work easier by not having to use two different ways of working in the backend and frontend.

In this lab we will develop an API Rest over MySQL and MongoDB.

## Lab Goals

- Use the Nest CLI to create application components
- Work with controllers and services
- Create the basic CRUD methods of an application
- Capture HTTP requests parameters
- Use ORM entities (Object Relational Mappers), interfaces and DTOs (Data Transfer Objects)
- Create a simple API with mocked data
- Create database-based services
- Use JWT as an access control mechanism
- Use Swagger for API documentation
- Record operations the application in log files

## Data Model

We will work with the next library model:

![library-model](https://i.imgur.com/pNwBnr8.png)

## Nest CLI installation
```bash
npm i -g @nestjs/cli
```


## Repo Installation

- Clone the [git repository](https://github.com/factoriaf5-p8/nest-library.git):

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start
```
- This command starts the app with the HTTP server listening on the port defined in the src/main.ts file. Once the application is running, open your browser and navigate to http://localhost:3000/. You should see the **Hello World!** message.

