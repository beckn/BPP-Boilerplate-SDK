# Node BPP Server

## Project Structure

The folder structure of this app is explained below:

| Name                | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **node_modules**    | Contains all npm dependencies                                                                    |
| **src**             | Contains source code that will be compiled to the dist dir                                       |
| **src/controllers** | Controllers define functions to serve various express routes.                                    |
| **src/utils**       | Common Utility Tooks to be used across your app.                                                 |
| **src/middlewares** | Express middlewares which process the incoming requests before handling them down to the routes  |
| **src/routes**      | Contain all express routes, separated by module/area of application                              |
| **src/model**       | Models define schemas that will be used in storing and retrieving data from Application database |
| **src**/index.ts    | Entry point to express app                                                                       |
| package.json        | Contains npm dependencies as well as [build scripts]                                             |
| tsconfig.json       | Config settings for compiling source code only written in TypeScript                             |

### Running Scripts

| Npm Script   | Description                |
| ------------ | -------------------------- |
| `dev`        | Runs server in development |
| `type-check` | Type-check all the code    |
