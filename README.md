# 📱 React Native Expo Auth App

A modern React Native application built with Expo Router featuring:

- Authentication (Login)
- Auto Attach Token (Axios Interceptor)
- Auto Refresh Token (401 Handling)
- Global Auth Context
- Persisted Login (AsyncStorage)
- Bottom Tab Navigation (Home & Profile)
- Reusable UI Components
- Clean & Scalable Architecture

---

## 🚀 Tech Stack

- React Native (Expo)
- Expo Router
- Axios
- React Hook Form
- AsyncStorage
- Context API
- TypeScript

---

## 📂 Project Structure
- app/
- -(auth)/
- -(tabs)/
- components/
- contexts/
- services/
- utils/


### Folder Explanation

- `app/` → Routing (Expo Router)
- `components/` → Reusable UI components
- `contexts/` → Global state (Auth)
- `services/` → API services
- `utils/` → Helpers (storage, etc)

---

## Config API
API base URL is located in:
 ```bash
/.env
```

Change this line:

 ```bash
EXPO_PUBLIC_API_URL=http://192.168.206.92:8000/api
```

Replace with your own backend URL.
Example:

 ```bash
EXPO_PUBLIC_API_URL=http://IPATAUDOMAINKAMU:8000/api
```

## Required Backend API

Your backend must provide the following endpoints:
1️⃣ Login
 ```bash
POST /api/login
```

 ```bash
Request Body
{
  "email": "user@email.com",
  "password": "password123"
}
```
 ```bash
Response
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 900
}
```
2️⃣ Refresh Token

POST /api/refresh
 ```bash
Request Body
{
  "refresh_token": "string"
}
```

 ```bash
Response
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 900
}
```
3️⃣ Get Profile (Protected Route)
 ```bash
GET /api/profile
```

 ```bash
Headers Required
Authorization: Bearer access_token
```

 ```bash
Response
{
  "id": 1,
  "name": "John Doe",
  "email": "john@email.com"
}
```
## Authentication Flow

- User login
- Access & refresh token saved to AsyncStorage
- Axios automatically attaches Bearer token
- If 401 occurs:
- Automatically request new token
- Retry original request
- User stays logged in after app restart

🎨 Features
- Clean UI
- Form validation
- Loading state
- Error handling
- Global user state
- Protected API calls
- Auto session recovery
- Bottom tab navigation

📦 Production Notes
- Before deploying:
- Replace development API URL
- Consider using .env for environment config
- Secure backend refresh implementation
- Implement role/permission system if needed

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

## Kontak Pudin
- [Instagram](https://t.me/pudin_ira) : Kamu bisa langsung kontak saya disini
- [Telegram](https://instagram.com/pudin.ira) : Kamu bisa melihat update kegiatan saya disini
