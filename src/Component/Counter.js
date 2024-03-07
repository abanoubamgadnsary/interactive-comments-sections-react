import "./counter.css";
import { useState } from "react";
function Counter({ score, isLoading }) {
  const [number, setData] = useState(0);

  function handleInc() {
    setData(number + 1);
  }
  function handleDec() {
    setData(number - 1);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="counter">
      <button onClick={handleInc}>
        <img src="./images/icon-plus.svg" alt="" />
      </button>
      <span>{score + number}</span>
      <button onClick={handleDec}>
        <img src="./images/icon-minus.svg" alt="" />
      </button>
    </div>
  );
}

export default Counter;
