🩺 Eye Disease Detection System
(MobileNetV2 + FastAPI + JWT Auth + Grad-CAM)

A full-stack AI application for detecting 10 eye diseases from retinal fundus images. Built using MobileNetV2, FastAPI, JWT authentication, and Grad-CAM explainability, with a clean HTML/CSS/JS frontend and PostgreSQL-ready backend.

📌 Features
🧠 Deep Learning Model (MobileNetV2)

Transfer-learning model trained on 10 retinal diseases

Lightweight and fast

Loaded once at startup

🛡️ Authentication

Login & registration

Password hashing with bcrypt

JWT-based protected routes

/predict endpoint secured

🔥 Grad-CAM Explainability

Heatmaps highlight important image regions

Saved automatically in static/

🌐 Frontend

Login, register, dashboard pages

Image upload & output display

Responsive styling

⚡ FastAPI Backend

High-performance async API

Organized and scalable structure

🗄 Database (PostgreSQL Ready)

.env file support

User & prediction logging (optional)

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
```
📁 Project Structure
Eye Disease/
│── backend_auth/             # Authentication (bcrypt, JWT)
│── frontend/                 # HTML/CSS/JS UI
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│── model/                    # Trained Keras Models
│   ├── mobile_model.h5
│   └── mobile.h5
│── static/                   # Uploaded images + Grad-CAM results
│── main.py                   # FastAPI app + prediction logic
│── .vscode/                  # Editor settings
└── README.md
```
🔧 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/eye-disease-detection.git
cd eye-disease-detection

2️⃣ Create Virtual Environment
python -m venv venv
venv/Scripts/activate  # Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Create .env File
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname

5️⃣ Run the Server
uvicorn main:app --reload

6️⃣ Access API Docs
http://127.0.0.1:8000/docs

📤 Prediction Workflow

User logs in → receives JWT

Uploads retinal fundus image

Backend:

Preprocesses image

Runs MobileNetV2 model

Generates Grad-CAM heatmap

Response includes:

Predicted disease

Confidence

Heatmap path

Example Response
{
  "disease": "Glaucoma",
  "confidence": 98.42,
  "gradcam_path": "/static/uploads/gradcam_image.jpg"
}

👨‍💻 JWT Authentication Example
@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    ...


Header required:

Authorization: Bearer <JWT_TOKEN>

🧪 Model Training Summary

MobileNetV2 transfer learning

Data augmentation

70 epochs

Accuracy/loss curves

Confusion matrix

Classification report

Saved as model/mobile_model.h5

🛠 Tech Stack
Component	Technology
Backend	FastAPI
Frontend	HTML, CSS, JS
AI Model	MobileNetV2 (TensorFlow/Keras)
Database	PostgreSQL (asyncpg)
Security	JWT + bcrypt
Explainability	Grad-CAM
Storage	Static files
📌 Future Enhancements

Docker + Nginx deployment

Multi-disease classification

VLM-based explanations

Admin dashboard

Training monitoring

👤 Author

Kalyan Babu Gutti
AI/ML Developer • CSE Student
