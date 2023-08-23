# TransactionEntity Monitoring System

This is an Event-Driven TransactionEntity Monitoring System built with Node.js and Express. It's designed to handle and monitor online transactions. The system follows principles from Domain-Driven Design (DDD), Clean Architecture, and the Repository Pattern. It integrates MongoDB for data storage, InfluxDB for event storage, and Stripe for payment processing.

## Table of Contents

1. [Technologies](#technologies)
2. [Setup](#setup)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Testing](#testing)
6. [Contributing](#contributing)

## Technologies

This project is created with:

- Node.js
- Express
- MongoDB
- InfluxDB
- Stripe

## Setup

To run this project, install it locally using npm:

```
$ git clone https://(...)
$ cd project
$ npm install
$ npm start
```

## Project Structure

The project is structured into several directories each with a specific purpose:

- **/src/domain**: Contains domain models which encapsulate the business logic.

- **/src/infrastructure**: Contains code for external systems like databases and third-party services.

- **/src/application**: Contains the application's business logic and event handlers.

- **/src/interfaces**: Contains Express controllers and routes for handling HTTP requests and responses.

- **/src/repositories**: Contains Repository classes for handling communication with the MongoDB database.

- **/test**: Contains unit and integration tests.

- **/scripts**: Contains scripts for simulating backend interactions.

- **/uml**: Contains PlantUML diagrams for visualizing the system's components and their interactions.

## Usage

To simulate backend interactions like customers making transactions, run the provided script:

```
$ node scripts/simulateTransactions.js
```

The system will monitor these transactions and handle events as they occur.

## Testing

To run the tests, use the following command:

```
$ npm test
```

This will execute all unit and integration tests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
