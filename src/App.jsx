import { useState } from "react";
import Button from "./Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState({});

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
      count={count}
      record={record}
      key={name.name}
    />
  ));

  return (
    <div>
      <nav>Randomness Challenge</nav>
      <h4>
        Try and press the 6 buttons here randomly for some number of times and
        in the end see your results to see how unbiased and random your choices
        were. Remember if you try to press a different button from the previous
        one to make your clicks for every button the same then you are being the
        opposite of random!
        <br />
        The more number of presses you have, the more prominently you can see
        your bias.
      </h4>
      <div className="buttons">{buttons}</div>
      <div className="count">
        <span className="countValue">{count}</span>
        <span className="countCaption">COUNT</span>
      </div>
    </div>
  );
}

export default App;
