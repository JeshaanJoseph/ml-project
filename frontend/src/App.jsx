import "./App.css";
import { useState } from "react";

function App() {
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [employmentLength, setEmploymentLength] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanInterestRate, setLoanInterestRate] = useState("");
  const [loanIncomeRatio, setLoanIncomeRatio] = useState("");
  const [creditHistoryLength, setCreditHistoryLength] = useState("");

  const [homeOwnership, setHomeOwnership] = useState("2");
  const [loanIntent, setLoanIntent] = useState("1");
  const [paymentDefault, setPaymentDefault] = useState("0");

  const [result, setResult] = useState("");
  const [maxLoanAmount, setMaxLoanAmount] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !age ||
      !income ||
      !employmentLength ||
      !loanAmount ||
      !loanInterestRate ||
      !loanIncomeRatio ||
      !creditHistoryLength
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          income: Number(income),
          home_ownership: Number(homeOwnership),
          emplyment_length: Number(employmentLength),
          loan_intent: Number(loanIntent),
          loan_amount: Number(loanAmount),
          loan_interest_rate: Number(loanInterestRate),
          loan_income_ratio: Number(loanIncomeRatio),
          payment_default_on_file: Number(paymentDefault),
          credit_history_length: Number(creditHistoryLength),
        }),
      });

      const data = await response.json();

      setResult(data.loan_status);
      setMaxLoanAmount(data.max_loan_amount);
    } catch (err) {
      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Loan Approval Prediction System</h1>

      <h2 className="section-title">Personal Information</h2>

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <select
        value={homeOwnership}
        onChange={(e) => setHomeOwnership(e.target.value)}
      >
        <option value="0">Mortgage</option>
        <option value="1">Other</option>
        <option value="2">Own</option>
        <option value="3">Rent</option>
      </select>

      <input
        type="number"
        placeholder="Employment Length"
        value={employmentLength}
        onChange={(e) => setEmploymentLength(e.target.value)}
      />

      <h2 className="section-title">Loan Information</h2>

      <select
        value={loanIntent}
        onChange={(e) => setLoanIntent(e.target.value)}
      >
        <option value="0">Debt Consolidation</option>
        <option value="1">Education</option>
        <option value="2">Home Improvement</option>
        <option value="3">Medical</option>
        <option value="4">Personal</option>
        <option value="5">Venture</option>
      </select>

      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />

      <input
        type="number"
        step="0.01"
        placeholder="Interest Rate"
        value={loanInterestRate}
        onChange={(e) => setLoanInterestRate(e.target.value)}
      />

      <input
        type="number"
        step="0.01"
        placeholder="Loan Income Ratio"
        value={loanIncomeRatio}
        onChange={(e) => setLoanIncomeRatio(e.target.value)}
      />

      <h2 className="section-title">Credit Information</h2>

      <select
        value={paymentDefault}
        onChange={(e) => setPaymentDefault(e.target.value)}
      >
        <option value="0">No Previous Default</option>
        <option value="1">Previous Default</option>
      </select>

      <input
        type="number"
        placeholder="Credit History Length"
        value={creditHistoryLength}
        onChange={(e) => setCreditHistoryLength(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      <div className="result">
        {result && (
          <>
            <h2
              style={{
                color: result === "Approved" ? "green" : "red",
              }}
            >
              Loan Status: {result}
            </h2>

            <h2>
              Maximum Loan Amount:
              {" "}
              Rs. {Number(maxLoanAmount).toLocaleString()}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;