# 🌍 Learn Language WebSite

<p align="center">
  <!-- ================= PROJECT IMAGE ================= -->
  <!-- Replace the src value with your screenshot path -->
  <img src="https://via.placeholder.com/1000x500.png?text=Project+Screenshot+Here" 
       alt="Learn Language Website Screenshot" 
       width="900"/>
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

## 🖼️ Screenshots

You can add more screenshots like this:

```markdown
![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page)
![Lesson Page](https://via.placeholder.com/800x400.png?text=Lesson+Page)
![Audio Section](https://via.placeholder.com/800x400.png?text=Audio+Section)
```

Replace placeholder links with:

```
/frontend/public/screenshot.png
```
or GitHub raw image URLs.

---

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