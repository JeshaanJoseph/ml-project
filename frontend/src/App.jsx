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

  const clearResults = () => {
          setResult("");
          setMaxLoanAmount("");
          setError("");
        };
  const handleReset = () => {
          setAge("");
          setIncome("");
          setEmploymentLength("");
          setLoanAmount("");
          setLoanInterestRate("");
          setLoanIncomeRatio("");
          setCreditHistoryLength("");

          setHomeOwnership("2");
          setLoanIntent("1");
          setPaymentDefault("0");

          setResult("");
          setMaxLoanAmount("");
          setError("");
};

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
    if (
      age < 18 || age > 100 ||
      income <= 0 ||
      employmentLength < 0 || employmentLength > 60 ||
      loanAmount <= 0 ||
      loanInterestRate < 0 || loanInterestRate > 100 ||
      loanIncomeRatio < 0 || loanIncomeRatio > 20 ||
      creditHistoryLength < 0 || creditHistoryLength > 80
) {
  setError("Please enter valid values.");
  setLoading(false);
  return;
}

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

      setMaxLoanAmount(data.max_loan_amount);

      const approved =
        Number(loanAmount) <= Number(data.max_loan_amount);

      setResult(
        approved ? "Approved" : "Rejected"
      );
    } catch (err) {
      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 >Loan Approval Prediction System</h1>

      <h2 className="section-title">👤Personal Information</h2>
      <div className="form-grid">

    <div className="field">
    <label >Age</label>
      <input
        type="number"
        min="18"
        max="100"
       placeholder="Age"
        value={age}
        onChange={(e) => {setAge(e.target.value);
        clearResults();}}
      />
      </div>
    <div className="field">
    <label >Income</label>
      <input
        type="number"
        min="1"
        max="100000000"
        placeholder="Income"
        value={income}
        onChange={(e) => {setIncome(e.target.value);
        clearResults();}}
      />
      </div>
         <div className="field">
        <label >Home Ownership</label>

      <select
        value={homeOwnership}
        onChange={(e) => {setHomeOwnership(e.target.value);
        clearResults();}}
      >
        <option value="0">Mortgage</option>
        <option value="1">Other</option>
        <option value="2">Own</option>
        <option value="3">Rent</option>
      </select> </div>
       <div className="field">
        <label >Employment Length</label>
      <input
        type="number"
        min="0"
        max="60"
        placeholder="Employment Length"
        value={employmentLength}
        onChange={(e) => {setEmploymentLength(e.target.value);
        clearResults();}}
      />
     </div>
     </div>
     <h2 className="section-title">💰 Loan Information</h2>
    <div className="form-grid">

      
       <div className="field">
        <label >Loan Purpose</label>
      <select
        value={loanIntent}
        onChange={(e) => {setLoanIntent(e.target.value);
        clearResults();}}
      >
        <option value="0">Debt Consolidation</option>
        <option value="1">Education</option>
        <option value="2">Home Improvement</option>
        <option value="3">Medical</option>
        <option value="4">Personal</option>
        <option value="5">Venture</option>
      </select>
      </div>
    <div className="field">
        <label >Loan Amount</label>
      <input
        type="number"
        min="1"
        max="100000000"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => {setLoanAmount(e.target.value);
        clearResults();}}
      />
      </div>
    <div className="field">
        <label >Interest Rate</label>
      <input
        type="number"
        min="0"
        max="100"
        step="0.01"
        placeholder="Interest Rate"
        value={loanInterestRate}
        onChange={(e) => {setLoanInterestRate(e.target.value);
        clearResults();}}
      />
      </div>
      <div className="field">
        <label >Loan Income Ratio</label>
      <input
        type="number"
        min="0"
        max="20"
        step="0.01"
        placeholder="Loan Income Ratio"
        value={loanIncomeRatio}
        onChange={(e) => {setLoanIncomeRatio(e.target.value);
        clearResults();}}
      />
      </div>
    </div>
    <h2 className="section-title">📊 Credit Information</h2>
    <div className="form-grid">

      
    <div className="field">
        <label >Payment Default</label>
      <select
        value={paymentDefault}
        onChange={(e) => {setPaymentDefault(e.target.value);
        clearResults();}}
      >
        <option value="0">No Previous Default</option>
        <option value="1">Previous Default</option>
      </select>
      </div>
    <div className="field">
        <label >Credit History Length</label>
      <input
        type="number"
        min="0"
        max="80"
        placeholder="Credit History Length"
        value={creditHistoryLength}
        onChange={(e) => {setCreditHistoryLength(e.target.value);
        clearResults();}}
      />
      </div>
      </div>

      {error && <p className="error">{error}</p>}
      <div className="button-group">
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>
        <button
        type="button"
        className="reset-btn"
        onClick={handleReset}
        >
          Reset
        </button>
        </div>

  {result && (
  <div
    className={`result ${
      result === "Approved"
        ? "result-approved"
        : "result-rejected"
    }`}
  >
    <h2 className="status">
      {result === "Approved"
        ? "✅ Loan Approved"
        : "❌ Loan Rejected"}
    </h2>

    <p>Maximum Eligible Loan Amount</p>

    <div className="amount">
      Rs.{" "}
      {Number(maxLoanAmount).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default App;