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

  const handleSubmit = async () => {
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
  };

  return (
    <div>
      <h1>Loan Approval Prediction System</h1>

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <br /><br />

      <select
        value={homeOwnership}
        onChange={(e) => setHomeOwnership(e.target.value)}
      >
        <option value="0">Mortgage</option>
        <option value="1">Other</option>
        <option value="2">Own</option>
        <option value="3">Rent</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Employment Length"
        value={employmentLength}
        onChange={(e) => setEmploymentLength(e.target.value)}
      />

      <br /><br />

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

      <br /><br />

      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        step="0.01"
        placeholder="Interest Rate"
        value={loanInterestRate}
        onChange={(e) => setLoanInterestRate(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        step="0.01"
        placeholder="Loan Income Ratio"
        value={loanIncomeRatio}
        onChange={(e) => setLoanIncomeRatio(e.target.value)}
      />

      <br /><br />

      <select
        value={paymentDefault}
        onChange={(e) => setPaymentDefault(e.target.value)}
      >
        <option value="0">No Previous Default</option>
        <option value="1">Previous Default</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Credit History Length"
        value={creditHistoryLength}
        onChange={(e) => setCreditHistoryLength(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Predict
      </button>

      <hr />

      <h2>Loan Status: {result}</h2>

      <h2>
        Maximum Loan Amount:
        {maxLoanAmount &&
          ` Rs. ${Number(maxLoanAmount).toLocaleString()}`}
      </h2>
    </div>
  );
}

export default App;