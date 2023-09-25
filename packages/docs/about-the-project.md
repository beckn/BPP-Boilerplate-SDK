# About the Project

The Boilerplate UI + Backend Framework project allows developers to quickly become beckn enabled and beckn protocol-based software quickly. The Backend Framework SDK gives the developer a defined structure to build beckn systems. 
Moreover, the project also includes a set of Fulfillment Applications and Admin UI connected with various BPPs.

---

## Project Architecture

The workflow of the project goes as
![image](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/838a6642-9a14-4085-8b6b-fb2ff371a512)

The project utilizes Turbo Repo to manage multiple monorepos

### BPP SDK

The BPP SDK includes a set of utilities and libraries to generate and build beckn-enabled bpp applications.
Technology Stack: **Node.JS, Express.JS, Typescript, Open API 3.0, Rollup, Mongoose**

### BPP Server

The network-facing BPP Server application. Developed with the BPP SDK, the server interacts with the network and BAPs via Beckn Protocol.
Technology Stack: **Node.JS, Express.JS, Websockets(Socket.IO), Typescript, Open API 3.0**

### Fulfillment UI Application

The fulfillment UI Application is an Android application to accepts orders from any connected client. For example, confirming the order requested by a client for a transit ticket.
Technology Stack: **React Native, WebSockets, Typescript**

### Admin UI

The Admin UI application includes a dashboard for all the BPPs and providers. This allows the admins to view the orders and connected admins, fulfillment apps, and BAPs. It also shows the certifications, BPP details, and network.
Technology Stack: **React, WebSockets, Typescript**

---

Currently, the BPP Server runs a Dummy API to connect with the database.

## Setup Instructions

- First, run `yarn` or `npm install` on root to install all dependencies
- To run the admin app, go over to `apps/admin` and run `yarn dev`
- To run the server app, go over to `apps/server` and run `yarn dev`
- To run the agent app, go over to `apps/agent` and run `yarn start`
