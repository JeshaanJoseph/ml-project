import { useState } from "react";

function App() {
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income: Number(income),
        age: Number(age),
      }),
    });

    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h1>ML Prediction App</h1>

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Predict
      </button>

      <h2>{result}</h2>
    </div>
  );
}

export default App;