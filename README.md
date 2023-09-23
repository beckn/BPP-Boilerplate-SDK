# BeckN BPP Boilerplate UI + Backend SDK

## What is BeckN BPP Boilerplate UI + Beckend SDK?

The Boilerplate UI + Backend Framework project allows developers to quickly become beckn enabled and beckn protocol-based software quickly. The Backend Framework SDK gives the developer a defined structure to build beckn systems.

Moreover, the project also includes a set of Fulfillment Applications and Admin UI connected with various BPPs.

## Table of content:

- [BeckN BPP Boilerplate UI + Backend SDK](#beckn-bpp-boilerplate-ui--backend-sdk)
  - [What is BeckN BPP Boilerplate UI + Beckend SDK?](#what-is-beckn-bpp-boilerplate-ui--beckend-sdk)
  - [Table of content:](#table-of-content)
  - [Demo](#demo)
  - [Pre-requisites](#pre-requisites)
  - [Project Setup](#project-setup)
    - [Using Docker](#using-docker)
    - [Local Setup](#local-setup)
  - [Folder Structure](#folder-structure)
  - [Project Architecture](#project-architecture)
    - [BPP SDK](#bpp-sdk)
    - [BPP Server](#bpp-server)
    - [Fulfillment UI Application](#fulfillment-ui-application)
    - [Admin UI](#admin-ui)
  - [SDK Configuration](#sdk-configuration)
    - [Middlewares](#middlewares)
    - [Automatic Database Management](#automatic-database-management)
    - [**Service Factory**](#service-factory)
    - [Callback Factory](#callback-factory)
    - [Beckn Transformer](#beckn-transformer)

## Demo

[Video Link](https://drive.google.com/drive/folders/1oq_WaSFB_w2BoajKSJiPsFr1_UCQ3f8X)

<a  id="pre-requisites"></a>

## Pre-requisites

<table>

<tr>

<td>NodeJS</td>

<td>>=16</td>

</tr>

<tr>

<td>Redis</td>

<td>  <span/>  </td>

</tr>

<tr>

<td>MongoDB</td>

<td>  <span/>  </td>

</tr>

</table>

<a  id="project-setup"></a>

## Project Setup

- Clone the repository by.

```bash

git clone <repo-link>
git checkout -b dev
git pull origin dev

```

#### Using Docker

**Step 1: Expose the ports**

- You can run ngrok to expose your ports, or forward your `80` port.
- If using **Ngork**, run `ngrok http 80`.
- Once you have your port exposed at `80`. You can now update your configuration.
- Update the following configurations

| Path                          | Update key      | Description                           |
| ----------------------------- | --------------- | ------------------------------------- |
| docker_config/bpp/sdk.yaml    | \<exposed url\> | Update it with your exposed/ngrok url |
| docker_config/bap/config.yaml | \<exposed url\> | Update it with your exposed/ngrok url |
| docker_config/agent/.env      | \<exposed url\> | Update it with your exposed/ngrok url |

**Step 2: Run your docker containers**

- Simply run docker compose by running `docker-compose up`.

| Container                                   | Function                  | Ports            |
| ------------------------------------------- | ------------------------- | ---------------- |
| sarfalam/simple-beckn-bap-ride-hailing:1    | BAP Server                | 3001             |
| sarfalam/bpp-boilerplate-ride-hailing:1.0.0 | BPP Server,Agent,Admin UI | 4173, 4000, 4001 |
| mongodb                                     | MongoDB Server            | 27017            |
| redis                                       | Redis Server              | 6379             |
| nginx                                       | Nginx Server              | 80               |

**STEP 3: Connecting to the APPs**

- Wait for a few minutes till all the containers are **up and running**.
- Once all the services are running you have these services running at your exposed port `80`.

| Location | Function          |
| -------- | ----------------- |
| /        | Admin UI          |
| /api     | BPP Rest Server   |
| /socket  | BPP Socket Server |
| /bap     | BAP Rest Server   |

- You can go to `<exposed_url>/app`. At the services section, go to **Services -> Driver_Details**. and create a new **driver** by choosing **(+ Add Driver_Details)**.

- Download and install the **android application** by downloading the [APK file](https://drive.google.com/file/d/1HeKRnSAEnLmaExTJDAjJdduqEtMvUzhP/view?usp=sharing) here. In the **socket URL**, add your copy and paste your `<exposed_url>` link (Do no include any route, it should only point to `/`).

1. Once this is successfully done, you will see a Home Page. Now in the **Provider ID,** enter your **driver_code** _(aka descriptor.code)_ and press **send**.
2. Now your Agent has been connected to the server.

- To run the beckn APIs, you can import the postman collection i.e. `BPP Boileplate Demo.postman_collection.json` present at the root directory and import it to postman.

**Set-up the variables by**

1. **bpp-id** : Your bpp subscriber-id present at _./docker_config/bpp/sdk.yaml_ at **app.subscriber_id**.
2. **bpp-uri** : Your **Rest** server URI, i.e. `<exposed_url>/api` .
3. **bap-uri** : Your **BPP** server URI, i.e. `<exposed_url>/bap` .

Application can be tested using the **Postman APIs**.

#### Local Setup

**STEP 1: Install Dependencies & Run services**

- Setup the application by running `make setup`. This will setup all the necessary cli, sdk and configurations.
- Now you can run `make generate-sdk` to generate your sdk. Follow the prompts and generate your config.
- Run the application by running `make local-dev`. This will run the **Server**, **Admin UI** and the **Android Application**.
  **Alternatively,** you can run the **Server**, **Admin UI** and **Android Application** separately by running `make local-dev-server`, `make local-dev-admin` and `make local-dev-android` respectively.

**STEP 2: Exposing the ports**

- For the **BAPs,BPPs,Android and Admin UI** to interact you must expose the ports. For docker, run the following command on your machine.
- Run **make expose** to expose ports to the server.

**STEP 3: Connecting to the APPs**

- Then connect to the admin UI by visiting `http://localhost:4173`.

- BAP server is running at `http://localhost:3001`.

- BPP server is running at `http://localhost:4000` being the rest api and `http://localhost:4001` being the socket server.

- You can connect to the android application by running the android application on the [Expo App](https://expo.dev/). Once the app is installed, connect the app with your URL as `exp://YOUR-IPV4-ADDRESS:8081`.

<a  id="folder-structure"></a>

## Folder Structure

```bash

├──  apps/
│  ├──  admin/  # Admin UI React App
│  ├──  agent/  # Fulfillment Agent Application (React Native)
│  └──  server/  # BPP Backend Server
│  └──  webhook/  # BPP Webhook
├──  packages/
│  ├──  bpp-sdk/  # BPP SDK Library
│  └──  shared-utils/  # Shared Utility Library
└──  package.json

```

<a  id="project-architecture"></a>

## Project Architecture

The workflow of the project goes as

The project utilizes Turbo Repo to manage multiple monorepos

#### BPP SDK

The BPP SDK includes a set of utilities and libraries to generate and build beckn-enabled bpp applications.
Technology Stack: **Node.JS, Express.JS, Typescript, Open API 3.0, Rollup, Mongoose**

#### BPP Server

The network-facing BPP Server application. Developed with the BPP SDK, the server interacts with the network and BAPs via Beckn Protocol.
Technology Stack: **Node.JS, Express.JS, Websockets(Socket.IO), Typescript, Open API 3.0**

#### Fulfillment UI Application

The fulfillment UI Application is an Android application to accepts orders from any connected client. For example, confirming the order requested by a client for a transit ticket.
Technology Stack: **React Native, WebSockets, Typescript**

### Admin UI

The Admin UI application includes a dashboard for all the BPPs and providers. This allows the admins to view the orders and connected admins, fulfillment apps, and BAPs. It also shows the certifications, BPP details, and network.

Technology Stack: **React, WebSockets, Typescript**

## SDK Configuration

SDK configuration includes a set of variables to setup BPP server. For example,

```yaml
path: <openapi path>
version: <version>
db:
  mongo:
    mongo_uri: <mongo _uri>
tables:
  - name: <table_name>
    admin_ui: true
    schema:
      [key]:
        type: <type>
        as: <beckn key reference>
gateway:
  uri: <gateway_uri>
  registry_uri: <registry_uri>
app:
  id: <bpp-id>
  unique_id: <bpp-unique-id>
  uri: <bpp-uri>
  ttl: PT10M
  city: std:080
  country: IND
  public_key: <public_key>
  private_key: <private_key>
```

### Middlewares

- **Authentication Middleware**: Handles and verifies all the incoming requests in the express routes.
- **Open API Verification Middleware:** Verifies all the incoming requests and checks if the sent body is valid or not.

### Automatic Database Management

SDK generates Mongoose schemas and models when the databases are initialized. This can be run by

```jsx
await bppSDK.initializeDB()
```

### **Service Factory**

Service factory is a factory service that generates crud apis of any model by defining the Model Name as a parameter.

For example,

```jsx
const provider = new ServiceFactory('Provider');

await provider.fetch(..)

```

### Callback Factory

Its used to send a callback response back to the BAP (Beckn Application Platform).

### Beckn Transformer

**Generic Object to Beckn Object transformer**

Any object can be converted to a beckn schema object by providing the schema in the sdk configuration.

This can be denoted as:

```yaml
tables:
  - name: <table_name>
    admin_ui: true
    schema:
      [key]:
        type: <type>
        as: <beckn key reference>
```

Here, the **beckn-key-reference** refers to the _key_ in the beckn schema. for example, `descriptor.code` as a key refers to the `code` key in the `descriptor` object.

We can convert any schema specified object to beckn object with the following code

```jsx
const beckn_data = await ObjectTransformer.transformToBecknObject("tables.name", data, Instance of bppSDK);-

```

**Beckn Object to Generic Object Transformer**

Vice versa, any beckn object can be converted to a Generic object as per the schema specified in the configuration.

```jsx
const table_data = ObjectTransformer.transformFromBecknObject('tables.name', data, bppSDK)
```
