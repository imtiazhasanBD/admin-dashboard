# Admin Dashboard - React + Tailwind CSS

🚀 A modern, responsive admin dashboard built with React, Tailwind CSS, and React Router. This project includes user management, product management, and basic authentication.

# 📌 Features
- User Management (View & Details)
- Product Management (Add, View, Delete Products)
- Protected Routes using PrivateRoute
- Basic Authentication (Login/Logout)
- Sorting & Searching
- Modern UI with Tailwind CSS
- Fully Responsive Design

# 🔑 Authentication (Basic) 
email = "admin@example.com" & password = "admin123"
- Login with admin / password (hardcoded for now)
- Authentication is stored in localStorage
- If not logged in, users will be redirected to /login

# 🔗 API Endpoints
Users API
🔹 Fetch Users: GET https://jsonplaceholder.typicode.com/users

# Products API
🔹 Fetch Products: GET https://api.restful-api.dev/objects
🔹 Add Product: POST https://api.restful-api.dev/objects
🔹 Get Product by ID: GET https://api.restful-api.dev/objects/:id
🔹 Delete Product: DELETE https://api.restful-api.dev/objects/:id
