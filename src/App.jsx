import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import "./App.css";
import ResultButton from "./ResultButton";
import Graph from "./Graph";
import Mapper from "./Mapper";

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

  const [uniform, setUniform] = useState({ mobile: 0, PC: 0 });
  const [entriesLength, setEntriesLength] = useState({ mobile: 0, PC: 0 });

  const [pointer, setPointer] = useState({});
  const [globalPCPointer, setGlobalPCPointer] = useState({});

  const [globalPCCount, setGlobalPCCount] = useState(0);
  const [globalPCRecord, setGlobalPCRecord] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });
  const [globalMobilePointer, setGlobalMobilePointer] = useState({});
  const [kanye, setKanye] = useState("");

  const [globalMobileCount, setGlobalMobileCount] = useState(0);
  const [globalMobileRecord, setGlobalMobileRecord] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });

  const [GET, setGET] = useState(0);

  useEffect(() => {
    fetch("https://api.kanye.rest")
      .then((res) => res.json())
      .then((res) => setKanye(res));
  }, []);
  console.log(kanye);

  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .get("/api", config)
      .then((res) => {
        console.log(res);
        setGlobalPCCount(0);
        setGlobalPCRecord({
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
        });
        setGlobalMobileCount(0);
        setGlobalMobileRecord({
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
        });
        res.data.result.forEach((round) => {
          if (round.width) {
            if (round.width > 730) {
              setEntriesLength((c) => ({ ...c, PC: c.PC + 1 }));
              let similar = false;
              Object.values(round.record).forEach((val) => {
                if (val >= round.count / 6 - 2 && val <= round.count / 6 + 2) {
                  similar = true;
                } else {
                  similar = false;
                }
              });
              if (similar) {
                setUniform((c) => ({ ...c, PC: c.PC + 1 }));
              }
              setGlobalPCCount((prev) => prev + round.count);
              setGlobalPCRecord((c) => ({
                one: c.one + round.record.one,
                two: c.two + round.record.two,
                three: c.three + round.record.three,
                four: c.four + round.record.four,
                five: c.five + round.record.five,
                six: c.six + round.record.six,
              }));
            } else {
              setEntriesLength((c) => ({
                ...c,
                mobile: c.mobile + 1,
              }));
              let similar = false;
              Object.values(round.record).forEach((val) => {
                if (val >= round.count / 6 - 2 && val <= round.count / 6 + 2) {
                  similar = true;
                } else {
                  similar = false;
                }
              });
              if (similar) {
                setUniform((c) => ({ ...c, mobile: c.mobile + 1 }));
              }
              setGlobalMobileCount((prev) => prev + round.count);
              setGlobalMobileRecord((c) => ({
                one: c.one + round.record.one,
                two: c.two + round.record.two,
                three: c.three + round.record.three,
                four: c.four + round.record.four,
                five: c.five + round.record.five,
                six: c.six + round.record.six,
              }));
            }
          }
        });
        setGlobalPCPointer(res.data.PCPointer);
        setGlobalMobilePointer(res.data.mobilePointer);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [GET]);

  function getAllIndexes(arr, val) {
    var indexes = [],
      i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }

  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const onClickShow = () => {
    if (!disabled) {
      names.forEach((number) => {
        let nex = [];
        let index = order.indexOf(number);
        if (index === -1) {
        } else {
          let indices = getAllIndexes(order, number);
          indices.forEach((index) => {
            if (index + 1 < order.length) {
              nex.push(order[index + 1]);
            }
          });
          let next = mode(nex);
          setPointer((c) => ({ ...c, [number]: next }));
        }
      });
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
  const name1 = ["one", "two", "three"];
  const name2 = ["four", "five", "six"];

  const buttons0 = name1.map((name) => (
    <Button
      name={name}
      setCount={setCount}
      setRecord={setRecord}
      setOrder={setOrder}
      record={record}
      key={name}
    />
  ));

  const buttons1 = name2.map((name) => (
    <Button
      name={name}
      setCount={setCount}
      setRecord={setRecord}
      setOrder={setOrder}
      record={record}
      key={name}
    />
  ));

  const resultButtons0 = names
    .slice(0, 3)
    .map((name) => (
      <ResultButton name={name} count={count} record={record} key={name} />
    ));
  const resultButtons1 = names
    .slice(3)
    .map((name) => (
      <ResultButton name={name} count={count} record={record} key={name} />
    ));

  const resultMapper = Object.keys(pointer).map((key) => (
    <Mapper from={key} to={pointer[key]} key={key} />
  ));

  const globalPCButtons0 = names
    .slice(0, 3)
    .map((name) => (
      <ResultButton
        name={name}
        count={globalPCCount}
        record={globalPCRecord}
        key={name}
      />
    ));
  const globalPCButtons1 = names
    .slice(3)
    .map((name) => (
      <ResultButton
        name={name}
        count={globalPCCount}
        record={globalPCRecord}
        key={name}
      />
    ));
  const globalPCMapper = Object.keys(globalPCPointer).map((key) => (
    <Mapper from={key} to={globalPCPointer[key]} key={key} />
  ));
  const globalMobileButtons0 = names
    .slice(0, 3)
    .map((name) => (
      <ResultButton
        name={name}
        count={globalMobileCount}
        record={globalMobileRecord}
        key={name}
      />
    ));
  const globalMobileButtons1 = names
    .slice(3)
    .map((name) => (
      <ResultButton
        name={name}
        count={globalMobileCount}
        record={globalMobileRecord}
        key={name}
      />
    ));
  const globalMobileMapper = Object.keys(globalMobilePointer).map((key) => (
    <Mapper from={key} to={globalMobilePointer[key]} key={key} />
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
      <div className="results">
        <span className="buttons0">{resultButtons0}</span>
        <span className="buttons1">{resultButtons1}</span>
        <div className="visuals">
          <div className="chart">
            <Graph count={count} record={record} />
          </div>
          <div className="mapper">
            <p>Button most likely to be pressed next</p>
            {resultMapper}
          </div>
        </div>
      </div>
      <hr style={{ margin: "5vh 0" }} />
      {/* <div className="global">
        <h1>GLOBAL STATS</h1>
        <div className="layout">
          <h1>PC Layout</h1>
          <div className="count" style={{ marginTop: "15vh" }}>
            <span className="countValue">{globalPCCount}</span>
            <span className="countCaption">COUNT</span>
          </div>
          <div className="results" style={{ display: "flex" }}>
            <span className="buttons0">{globalPCButtons0}</span>
            <span className="buttons1">{globalPCButtons1}</span>
          </div>
          <div className="visuals">
            <div className="chart">
              <Graph count={globalPCCount} record={globalPCRecord} />
            </div>
            <div className="mapper">
              <p>Button most likely to be pressed next</p>
              {globalPCMapper}
            </div>
          </div>
          <p>
            The average number of clicks a entry has is{" "}
            <span style={{ color: "#006362" }}>
              {entriesLength.PC
                ? (globalPCCount / entriesLength.PC).toFixed(2)
                : 0}
            </span>
            .
            <br />
            The probablity of random clicks of all the buttons being within the
            range of &#177;2 is{" "}
            <span style={{ color: "#006362" }}>
              {entriesLength.PC
                ? (uniform.PC / entriesLength.PC).toFixed(3)
                : 0}
            </span>
            .
          </p>
        </div>
        <div className="layout">
          <h1>Mobile Layout</h1>
          <div className="count" style={{ marginTop: "15vh" }}>
            <span className="countValue">{globalMobileCount}</span>
            <span className="countCaption">COUNT</span>
          </div>
          <div className="results" style={{ display: "flex" }}>
            <span
              className="buttons0"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {globalMobileButtons0}
            </span>
            <span
              className="buttons1"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {globalMobileButtons1}
            </span>
          </div>
          <div className="visuals">
            <div className="chart">
              <Graph count={globalMobileCount} record={globalMobileRecord} />
            </div>
            <div className="mapper">
              <p>Button most likely to be pressed next</p>
              {globalMobileMapper}
            </div>
          </div>
          <p>
            The average number of clicks a entry has is{" "}
            <span style={{ color: "#006362" }}>
              {entriesLength.mobile
                ? (globalMobileCount / entriesLength.mobile).toFixed(2)
                : 0}
            </span>
            .
            <br />
            The probablity of random clicks of all the buttons being within the
            range of &#177;2 is{" "}
            <span style={{ color: "#006362" }}>
              {entriesLength.mobile
                ? (uniform.mobile / entriesLength.mobile).toFixed(3)
                : 0}
            </span>
            .
          </p>
        </div>
      </div> */}
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
