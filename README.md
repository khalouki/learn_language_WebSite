# 🌍 Learn Language WebSite

<p align="center">
  <!-- ================= PROJECT IMAGE ================= -->
  <!-- Replace the src value with your screenshot path -->
  <img width="1604" height="818" alt="image" src="https://github.com/user-attachments/assets/5d8d1a36-65ba-45c3-9a39-5425e4d5048b" />

</p>

---

## 📘 About The Project

**Learn Language WebSite** is a full-stack web application built to help users learn languages through structured lessons and categorized audio content.

The platform organizes lessons by:

- Level (Beginner, Medium)
- Language Pair (e.g., English → Spanish, English → German)
- Daily-life themes (greetings, restaurant, school, market, directions)

The project follows a clear separation between frontend and backend for maintainability and scalability.

---

## 🚀 Features

- 🎧 Audio-based learning system
- 📚 Organized lessons by level and language pair
- 🌍 Multiple language support
- ⚙️ REST API architecture
- 📁 Structured audio storage
- 💻 Modern frontend built with Next.js
- 🐍 Lightweight backend using Flask

---

## 🗂️ Project Structure

```
learn_language_WebSite
│
├── audio/
│   ├── Beginner/
│   │   ├── en_de/
│   │   │   ├── greetings/
│   │   │   ├── directions/
│   │   │   ├── market/
│   │   │   ├── restaurant/
│   │   │   └── school/
│   │   └── en_es/
│   │       ├── greetings/
│   │       ├── directions/
│   │       ├── market/
│   │       ├── restaurant/
│   │       └── school/
│   │
│   └── medium/
│       └── en_es/
│           ├── greetings/
│           ├── directions/
│           ├── market/
│           ├── restaurant/
│           └── school/
│
├── data/
├── backend/        # Flask API
└── frontend/       # Next.js Application
```

---

## 🧰 Tech Stack

### Frontend
- Next.js
- React
- JavaScript / TypeScript
- CSS / Tailwind (if used)

### Backend
- Flask
- Python
- REST API

### Media
- MP3 audio files organized by category

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/khalouki/learn_language_WebSite.git
cd learn_language_WebSite
```

---

## 🔵 Backend Setup (Flask)

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

**Windows**
```bash
venv\Scripts\activate
```

**Mac / Linux**
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the server:

```bash
flask run
```

Backend will run by default at:
```
http://127.0.0.1:5000
```

---

## 🟣 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

## 📡 How It Works

1. User selects level and language pair.
2. Frontend sends request to Flask API.
3. Backend returns lesson/audio data.
4. Audio files are loaded dynamically from structured folders.
5. User listens and practices.

---


## 📸 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/cb21422e-4cdb-4249-ad76-da2dd2c37195" width="100%"/>
      <br/>
      <sub><b>Context List</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/51bf691d-39c2-40d4-b04c-3a4ff5dbb357" width="100%"/>
      <br/>
      <sub><b>Level List per Language</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d0e5e357-5000-4201-880d-7fa821df0d7c" width="100%"/>
      <br/>
      <sub><b>Lesson View</b></sub>
    </td>
    <td></td>
  </tr>
</table>

</div>


## 🔮 Future Improvements

- 👤 User authentication
- 📊 Learning progress tracking
- 🔁 Audio repetition & speed control
- 📱 Mobile optimization
- 🌐 More language pairs
- ☁️ Cloud storage for audio files

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Abdelkhalk Essaid**  
Full-Stack Developer & Data Science Student

GitHub: https://github.com/khalouki
PortFolio : khalouki.github.io/PortFolio
Linkdine : https://www.linkedin.com/in/abdelkhalk-essaid
