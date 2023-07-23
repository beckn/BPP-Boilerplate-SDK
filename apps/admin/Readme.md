# Admin SDK

### Project Structure

| Name              | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| **node_modules**  | Contains all npm dependencies                                        |
| **src**           | Contains source code that will be compiled to the dist dir           |
| **src/pages**     | Pages to be used in the app.                                         |
| **src/services**  | Component Services                                                   |
| **src/routes.ts** | Routes of the application                                            |
| **src/main.tsx**  | Entry point to app.                                                  |
| **src/utils**     | Common Utility Tools to be used across your app.                     |
| **src/routes**    | Contain all express routes, separated by module/area of application  |
| **src/component** | All components & Wrappers of the application                         |
| package.json      | Contains npm dependencies as well as [build scripts]                 |
| tsconfig.json     | Config settings for compiling source code only written in TypeScript |

### Scripts

To run the app in development mode, run:

```
npm run dev
```
