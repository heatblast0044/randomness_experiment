import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import "./App.css";
import ResultButton from "./ResultButton";

function App() {
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });

  const [globalCount, setGlobalCount] = useState(0);
  const [globalRecord, setGlobalRecord] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });

  const [GET, setGET] = useState(0);

  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .get("/api", config)
      .then((res) => {
        setGlobalCount(0);
        setGlobalRecord({
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
        });
        res.data.forEach((round) => {
          setGlobalCount((prev) => prev + round.count);
          setGlobalRecord((c) => ({
            ...c,
            one: c.one + round.record.one,
            two: c.two + round.record.two,
            three: c.three + round.record.three,
            four: c.four + round.record.four,
            five: c.five + round.record.five,
            six: c.six + round.record.six,
          }));
        });
      })
      .catch((err) => {
        console.log("error");
      });
  }, [GET]);

  const onClickShow = () => {
    document.querySelector(".results").style.display = "flex";

    const body = JSON.stringify({
      record,
      count,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api", body, config)
      .then((res) => console.log(res))
      .catch((err) => console.log("error"));
    setGET((x) => x + 1);
  };

  const onClickReset = () => {
    setCount(0);
    setRecord({});
    document.querySelector(".results").style.display = "none";
    window.scrollTo(0, 0);
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
      count={count}
      record={record}
      key={name.name}
    />
  ));

  const globalButtons = names.map((name) => (
    <ResultButton
      name={name.name}
      count={globalCount}
      record={globalRecord}
      key={name.name}
    />
  ));

  return (
    <div>
      <nav>
        <span className="title">Randomness Challenge</span>
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
        <button className="showResultsButton" onClick={onClickShow}>
          SHOW
          <br />
          RESULTS
        </button>
      </div>
      <div className="results">{resultButtons}</div>
      <hr style={{ margin: "5vh 0" }} />
      <div className="global">
        <h1>GLOBAL STATS</h1>
        <div className="count" style={{ marginTop: "15vh" }}>
          <span className="countValue">{globalCount}</span>
          <span className="countCaption">COUNT</span>
        </div>
        <div className="results" style={{ display: "flex" }}>
          {globalButtons}
        </div>
      </div>
      <p align="center" className="disclaimer">
        Disclaimer: The data of your attempts will be stored, however, NO
        personal information of any kind will be stored.
      </p>
    </div>
  );
}

export default App;
