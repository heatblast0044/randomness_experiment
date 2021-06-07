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
  const [order, setOrder] = useState([]);

  const [disabled, setDisabled] = useState(false);

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
    if (!disabled) {
      console.log(order);
      document.querySelector(".results").style.display = "flex";
      const body = JSON.stringify({
        record: record,
        count: count,
        width: window.innerWidth,
        order: order,
      });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      axios
        .post("/api", body, config)
        .then((res) => {
          setDisabled(true);
        })
        .catch((err) => console.log("error"));
      setGET((x) => x + 1);
    }
  };

  const onClickReset = () => {
    setCount(0);
    setRecord({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
    });
    document.querySelector(".results").style.display = "none";
    window.scrollTo(0, 0);
    setDisabled(false);
  };

  const names = ["one", "two", "three", "four", "five", "six"];

  const buttons0 = names
    .slice(3)
    .map((name) => (
      <Button
        name={name}
        setCount={setCount}
        setRecord={setRecord}
        setOrder={setOrder}
        record={record}
        key={name}
      />
    ));

  const buttons1 = names
    .slice(3, 6)
    .map((name) => (
      <Button
        name={name}
        setCount={setCount}
        setRecord={setRecord}
        setOrder={setOrder}
        record={record}
        key={name}
      />
    ));
  const resultButtons = names.map((name) => (
    <ResultButton name={name} count={count} record={record} key={name} />
  ));

  const globalButtons = names.map((name) => (
    <ResultButton
      name={name}
      count={globalCount}
      record={globalRecord}
      key={name}
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
        were and also the probablity of you pressing a button based on your
        previous presses as the sample space. (Remember if you try to press a
        different button from the previous one to make your clicks for every
        button the same then you are being the opposite of random!) The more
        number of presses you have, the more prominently you can see your bias.
      </h4>
      <div className="buttons">
        <span className="buttons0">{buttons0}</span>
        <span className="buttons1">{buttons1}</span>
      </div>
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
        <a href="https://github.com/heatblast0044/randomness_challenge">
          Source Code (GitHub)
        </a>
        <br />
        Disclaimer: The data of your attempts will be stored, however, NO
        personal information of any kind will be stored.
      </p>
    </div>
  );
}

export default App;
