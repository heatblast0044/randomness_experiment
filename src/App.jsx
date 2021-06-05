import { useState } from "react";
import Button from "./Button";
import "./App.css";
import ResultButton from "./ResultButton";

function App() {
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState({});

  const onClickReset = () => {
    setCount(0);
    setRecord({});
    document.querySelector(".results").style.display = "none";
  };

  const names = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "six" },
  ];

  const buttons = names.map((name) => (
    <Button
      name={name.name}
      setCount={setCount}
      setRecord={setRecord}
      record={record}
      key={name.name}
    />
  ));

  const resultButtons = names.map((name) => (
    <ResultButton
      name={name.name}
      setCount={setCount}
      setRecord={setRecord}
      count={count}
      record={record}
      key={name.name}
    />
  ));

  return (
    <div>
      <nav>
        Randomness Challenge{" "}
        <button className="reset" onClick={onClickReset}>
          RESET
        </button>
      </nav>
      <h4>
        Try and press the 6 buttons here randomly for some number of times and
        in the end see your results to see how unbiased and random your choices
        were. Remember if you try to press a different button from the previous
        one to make your clicks for every button the same then you are being the
        opposite of random! The more number of presses you have, the more
        prominently you can see your bias.
      </h4>
      <div className="buttons">{buttons}</div>
      <div className="count">
        <span className="countValue">{count}</span>
        <span className="countCaption">COUNT</span>
      </div>
      <div className="showResults">
        <button
          className="showResultsButton"
          onClick={() =>
            (document.querySelector(".results").style.display = "flex")
          }
        >
          SHOW
          <br />
          RESULTS
        </button>
      </div>
      <div className="results">{resultButtons}</div>
      <p
        align="center"
        style={{
          fontFamily: "'Fira Sans', sans-serif",
          margin: "150px 0 20px 0",
          fontSize: "14px",
          color: "#1f1f1f",
        }}
      >
        Disclaimer: The data of your attempts will be stored, however, NO
        personal information of any kind will be stored.
      </p>
    </div>
  );
}

export default App;
