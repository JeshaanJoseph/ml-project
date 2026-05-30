from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
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
    return {
        "received_income": data.income,
        "received_age": data.age,
        "prediction": "dummy result"
    }