from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# Load models
classifier = joblib.load("models/loan_classifier.pkl")
scaler = joblib.load("models/scaler.pkl")
regressor = joblib.load("models/loan_regressor.pkl")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
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


@app.get("/")
def home():
    return {"message": "API running"}


def create_dataframe(data: LoanApprovalInput):
    return pd.DataFrame([[
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
        "age",
        "income",
        "home_ownership",
        "emplyment_length",
        "loan_intent",
        "loan_amount",
        "loan_interest_rate",
        "loan_income_ratio",
        "payment_default_on_file",
        "credit_history_length"
    ])


@app.post("/predict")
def predict(data: LoanApprovalInput):

    df = create_dataframe(data)

    # Classification
    scaled_df = scaler.transform(df)
    approval_prediction = classifier.predict(scaled_df)[0]

    # Regression
    amount_prediction = regressor.predict(df)[0]

    return {
        "loan_status": "Approved" if approval_prediction == 0 else "Rejected",
        "max_loan_amount": round(float(amount_prediction), 2)
    }