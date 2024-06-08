# Notes App Backend

This project provides a robust backend for a notes app using Node.js, Express, MongoDB, Mongoose, and JWT tokens. The app includes authentication and authorization features, with separate logins for users and admins. Users can create accounts, log in securely, and manage their notes. Admins have additional privileges, such as managing user accounts or notes. MongoDB stores the data, while Mongoose simplifies interactions with the database. Overall, the app provides a secure and efficient way for users and admins to manage and access notes.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/harshith6322/NOTES_APP_BACKEND.git`
2. Navigate to the project directory: `cd notes-app-backend`
3. Install dependencies: `npm install`
4. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables to the `.env` file:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
5. Run the application: `npm start`

## Features

- **Authentication:** Users can create accounts and log in securely using JWT tokens.
- **Authorization:** Separate logins for users and admins. Admins have additional privileges.
- **Notes Management:** Users can create, update, and delete their notes.
- **Admin Privileges:** Admins can manage user accounts and notes.
- **Database Interaction:** MongoDB stores the data, while Mongoose simplifies interactions with the database.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Tokens

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or want to suggest an enhancement.
