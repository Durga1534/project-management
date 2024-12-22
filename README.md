# Project Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/Durga1534/project-management/build.yml)

## Table of Contents
- [Introduction](#introduction)
- [Techstack](#techstack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Introduction

The **Project Management System** is designed to manage users, projects, teams, and tasks efficiently. It aims to provide a seamless experience for users across various devices.

## Features

- **Team Management**: Create and manage teams, assign roles and responsibilities.
- **Task Management**: Create, assign, track, and update tasks.
- **Project Management**: Manage project details, timelines, and milestones.
- **Dashboard Page**: A comprehensive dashboard for overview and analytics.
- **User Management**: Manage user profiles, roles, and permissions.
- **User Authentication**: Secure user login and registration using JWT.

## Techstack used
##Frontend: 

   **React.js**: React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components, manage the application state efficiently, and build complex UIs with ease. React's virtual DOM improves performance by minimizing direct DOM manipulation.

**Tailwind CSS**: Tailwind is a utility-first CSS framework that provides low-level utility classes for designing responsive and customizable interfaces. It speeds up development by offering a consistent design system and eliminating the need to write custom CSS.

**DaisyUI**: DaisyUI extends Tailwind CSS with pre-styled UI components, making it easier to design beautiful interfaces quickly. It provides a library of ready-to-use components, reducing the time spent on styling and ensuring a consistent look and feel.

**React Icons**: React Icons allows developers to easily incorporate popular icon sets into their React applications. It provides a comprehensive collection of icons that can be customized and used across the application, enhancing the visual appeal and user experience.

**Zustand**: Zustand is a small, fast, and scalable state management library for React. It simplifies the management of the application's state by providing a minimalistic API and hooks, ensuring better performance and easier debugging.

React Chart.js: React Chart.js is a wrapper around the Chart.jslibrary, enabling developers to create responsive and customizable charts within React applications. It supports various chart types, such as bar, line, pie, and radar charts, providing an effective way to visualize data.

##Backend: 

 **Node**.js: Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows developers to use JavaScript for server-side scripting, enabling the creation of scalable and high-performance applications. Its event-driven, non-blocking I/O model makes it ideal for building real-time applications.

**Express.js**: Express.js is a minimal and flexible Node.jsweb application framework that provides robust features for building web and mobile applications. It simplifies the process of handling HTTP requests, middleware management, and routing, making it easier to develop server-side logic.

**MongoDB**: MongoDB is a NoSQL database that provides a flexible and scalable solution for data storage. Its document-oriented model allows developers to store data in JSON-like formats, making it easier to work with dynamic and unstructured data. MongoDB's scalability and high performance make it suitable for large-scale applications.

**Jest**: Jest is a delightful JavaScript testing framework with a focus on simplicity and support for React applications. It provides an easy-to-use API for writing unit tests, integrated test runners, and code coverage reports. Jest ensures the reliability and stability of the codebase by enabling automated testing.

**JWT** (JSON Web Token): JWT is a secure method for transmitting information between parties as a JSON object. It is used for user authentication and authorization, providing a stateless and scalable solution for managing user sessions. JWT ensures the integrity and authenticity of the data being transmitted, enhancing security.

## Installation

Step-by-step instructions to set up the project locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Durga1534/project-management.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd project-management
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```

## Usage

Instructions to run and use the project:

1. **Start the Development Server**:
    ```bash
    npm run dev
    ```
2. **Open Your Browser** and navigate to `http://localhost:8080`.

## API Documentation

Detailed API documentation:

### Example Endpoint
- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Retrieves user details with username, email, and role.
- **Response**:
    ```json
    {
      "data": [
        {
          "username": "exampleUser",
          "email": "example@mail.com",
          "role": "admin"
        }
      ]
    }
    ```
    

## Screenshots

### Homepage
![Homepage](frontend/screenshots/Homepage-desktop.png)

### Team Management
![Team Management](frontend/screenshots/Teams-desktop.png)

### Task Management
![Task Management](frontend/screenshots/Tasks-desktop.png)

### Project Management
![Project Management](frontend/screenshots/Projects-desktop.png)

### Dashboard Page
![Dashboard Page](frontend/screenshots/Dashboard-desktop.png)

### Signup page
![Signup Page](frontend/screenshots/Signup-desktop.png)

### Login Page
![Login Page](frontend/screenshots/Login-desktop.png)


## Environment Variables

List of required environment variables:

| Variable       | Description                       |
|----------------|-----------------------------------|
| `VITE_API_URL` | URL of the backend API            |
| `JWT_SECRET`   | Secret key for JWT authentication |
| `MONGO_URI`    | MongoDB connection string         |

## Contributing

Guidelines for contributing to the project:

1. **Fork the Repository**.
2. **Create a New Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make Your Changes and Commit Them**:
    ```bash
    git commit -m "Add your feature"
    ```
4. **Push to the Branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Open a Pull Request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, feel free to contact:
- **Name**: Durga Prasad
- **Email**: kondurudurgaprasad.2@gmail.com
- **GitHub**: [Durga1534](https://github.com/Durga1534)

