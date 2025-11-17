🩺 Eye Disease Detection System (MobileNetV2 + FastAPI + JWT + Grad-CAM)

This project is a complete AI-powered web application for detecting eye diseases from retinal fundus images.
It includes:

A deep learning model (MobileNetV2)

A secure FastAPI backend

JWT authentication

Grad-CAM explainability

HTML/CSS/JS frontend pages

PostgreSQL-ready backend structure

The system predicts 10 disease classes and generates visual explanations using heatmaps.

📁 Project Structure
TEST/
│── backend_auth/               # User Authentication (bcrypt, JWT)
│── frontend/                   # HTML/CSS/JS Frontend UI
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│── model/                      # Trained Keras Models
│   ├── mobile_model.h5
│   └── mobile.h5
│── static/                     # Uploaded images + GradCAM output
│── main.py                     # FastAPI backend + prediction route
│── .vscode/                    # Editor settings
└── README.md                   # Project Documentation

🚀 Features
🧠 Deep Learning Model

Uses MobileNetV2 trained on 10 eye diseases

Lightweight, fast, and accurate

Saved in .h5 format for easy FastAPI loading

🛡️ Authentication

Secure login & registration system

Passwords hashed using bcrypt

Access controlled using JWT tokens

Protected /predict endpoint

🗄 Database (PostgreSQL Ready)

Backend structured to work with PostgreSQL

Environment variables stored in .env

Users + Predictions can be stored

🔥 Grad-CAM Explainability

Generates heatmaps for predictions

Shows which region of the eye influenced the model

🌐 Frontend

Responsive HTML/CSS/JS pages:

Login

Register

Dashboard

Image upload + output display

⚡ FastAPI Backend

High-performance async API

Model loaded once on startup

Returns disease, confidence, description, heatmap path

🖼 Supported Eye Diseases

CSCR

Diabetic Retinopathy

Disc Edema

Glaucoma

Healthy

Macular Scar

Myopia

Pterygium

Retinal Detachment

Retinitis Pigmentosa

🔧 Installation & Setup
1️⃣ Clone the Repo
git clone https://github.com/your-username/eye-disease-detection.git
cd eye-disease-detection

2️⃣ Create a Virtual Environment
python -m venv venv
venv/Scripts/activate  # Windows

3️⃣ Install Requirements
pip install -r requirements.txt

4️⃣ Set Up Environment Variables

Create a .env file:

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# PostgreSQL (if used)
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname

5️⃣ Run FastAPI Server
uvicorn main:app --reload

6️⃣ Open API Docs

Visit:

http://127.0.0.1:8000/docs

📤 Prediction Workflow
1. User logs in → Gets JWT Token
2. Upload Image
3. FastAPI:

Preprocesses image

Runs MobileNetV2 model

Generates Grad-CAM heatmap

Returns JSON response

4. Dashboard displays:

Predicted disease

Confidence %

Heatmap visualization

👨‍💻 Backend Authentication (JWT)

Protected route:

@app.post("/predict")
async def predict(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    ...


Any request must include:

Authorization: Bearer <JWT_TOKEN>

📸 Grad-CAM Explainability

Grad-CAM highlights the region influencing the model.
Generated images are stored in:

/static/uploads/


Example output:

{
  "disease": "Glaucoma",
  "confidence": 98.42,
  "gradcam_path": "/static/uploads/gradcam_image.jpg"
}

💾 Model Training (MobileNetV2)

Training script includes:

Data augmentation

Transfer learning

70 epochs training

Plots for accuracy and loss

Confusion matrix

Classification report

Model saved as:

model/mobile_model.h5

🛠 Technologies Used
Component	Tech
Backend	FastAPI
Frontend	HTML, CSS, JavaScript
AI Model	MobileNetV2 (TensorFlow/Keras)
Security	JWT, bcrypt hashing
Database	PostgreSQL (asyncpg)
Explainability	Grad-CAM
Storage	Static files
📌 Future Enhancements

Deploy with Docker + Nginx

Add multi-disease detection

Add VLM (Vision-Language Model) explanations

Add admin panel

Add training dashboard

👤 Author

Drake
AI/ML Developer • CSE Student
Passionate about Deep Learning, FastAPI & Full-Stack Engineering
