# FunTalk - Full Stack Realtime Chat App 

A modern, real-time chat application built with the MERN stack, featuring secure authentication, instant messaging, and online user status.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Real-time Communication**: Socket.io
- **Authentication**: JWT, bcrypt
- **State Management**: Zustand
- **Image Upload**: Cloudinary
- **Notifications**: React Hot Toast

## Features

- Secure user authentication (signup/login)
- Real-time messaging with Socket.io
- Image sharing in chats
- Online user status indicators
- Modern UI with multiple theme support
- Responsive design
- JWT-based authorization
- Global state management with Zustand
- Production-ready deployment setup

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message to a user




