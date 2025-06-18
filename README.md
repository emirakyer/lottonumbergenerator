# 🎰 Lotto Number Generator

A full-stack web application that generates random lottery numbers, stores them in a database, and provides real-time statistics through an interactive UI.

## 📌 Project Objective

The application enables users to:
- Generate a set of 6 random lottery numbers.
- Store each draw with a timestamp.
- View statistics such as total draws, draws in the last 24 hours, and most frequently drawn numbers.

---

## 🧱 Architecture Overview

**Pattern:** Model-View-Controller (MVC)

- **Model:** `LottoDraw` stores the numbers (as a JSON list) and creation time.
- **View:** Django API views + Vue components.
- **Controller:** Django `urls.py` and Vue Router handle navigation and logic.

---

## 🛠️ Technologies

### 🔧 Backend
- Python 3
- Django 5.0
- Django REST Framework
- SQLite (PostgreSQL compatible)

### 💻 Frontend
- Vue 3
- Vuetify 3
- TypeScript
- Vite

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd lottonumbergenerator
```

### 2. Create a Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Django Migrations

```bash
python manage.py migrate
```

### 5. (Optional) Create a Superuser

```bash
python manage.py createsuperuser
```

### 6. Run the Django Backend

```bash
python manage.py runserver
```

The backend will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## Running the Frontend

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Frontend Development Server

```bash
npm start
```

The frontend will typically be available at [http://localhost:5173/](http://localhost:5173/).

---

## API Endpoints

- `GET /api/generate_numbers/` — Generate random lotto numbers and save to DB
- `GET /api/stats/` — Get statistics (last 24h draws, total draws, most common number)


---


## 📸 Application Screenshots

![Screenshot 1](https://github.com/emirakyer/lottonumbergenerator/blob/main/projectMedia/1.jpeg?raw=true)
![Screenshot 2](https://github.com/emirakyer/lottonumbergenerator/blob/main/projectMedia/4.jpeg?raw=true)
![Screenshot 3](https://github.com/emirakyer/lottonumbergenerator/blob/main/projectMedia/2.jpeg?raw=true)
![Screenshot 4](https://github.com/emirakyer/lottonumbergenerator/blob/main/projectMedia/3.jpeg?raw=true)

## 🎥 Demo Video

[Click to Watch the Demo Video](https://github.com/emirakyer/lottonumbergenerator/blob/main/projectMedia/5.mp4)

