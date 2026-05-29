import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then(res => res.json())
      .then(res => setData(res.message));
  }, []);

  return (
    <div>
      <h1>React + FastAPI</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;