from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()
classifier = joblib.load("models/loan_classifier.pkl")
scaler = joblib.load("models/scaler.pkl")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# input schema
class InputData(BaseModel):
    income: float
    age: int

@app.get("/")
def home():
    return {"message": "API running"}

# prediction endpoint
@app.post("/predict")
def predict(data: InputData):

    if data.income > 50000 and data.age > 21:
        prediction = "Approved"
    else:
        prediction = "Rejected"

    return {
        "prediction": prediction
    }
class LoanApprovalInput(BaseModel):
    age: float
    income: float
    home_ownership: int
    emplyment_length: float
    loan_intent: int
    loan_amount: float
    loan_interest_rate: float
    loan_income_ratio: float
    payment_default_on_file: int
    credit_history_length: float

@app.post("/predict-approval")
def predict_approval(data: LoanApprovalInput):

    df = pd.DataFrame([[
        data.age,
        data.income,
        data.home_ownership,
        data.emplyment_length,
        data.loan_intent,
        data.loan_amount,
        data.loan_interest_rate,
        data.loan_income_ratio,
        data.payment_default_on_file,
        data.credit_history_length
    ]], columns=[
        'age',
        'income',
        'home_ownership',
        'emplyment_length',
        'loan_intent',
        'loan_amount',
        'loan_interest_rate',
        'loan_income_ratio',
        'payment_default_on_file',
        'credit_history_length'
    ])

    scaled = scaler.transform(df)

    prediction = classifier.predict(scaled)

    return {
        "approved": int(prediction[0])
    }