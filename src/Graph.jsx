import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function Chart(props) {
  const data = [
    {
      title: "one",
      value: props.record.one,
      color: "#006362",
    },
    {
      title: "two",
      value: props.record.two,
      color: "#47ECE9",
    },
    {
      title: "three",
      value: props.record.three,
      color: "#1F6967",
    },
    {
      title: "four",
      value: props.record.four,
      color: "#00E8E4",
    },
    {
      title: "five",
      value: props.record.five,
      color: "#00B5B2",
    },
    {
      title: "six",
      value: props.record.six,
      color: "#009996",
    },
  ];
  const labelStyle = {
    fontSize: "5px",
    color: "#ffffff",
  };
  return (
    <div>
      <PieChart
        data={data}
        style={{ height: "50vh", minHeight: "400px" }}
        label={({ dataEntry }) =>
          dataEntry.title +
          "   " +
          ((dataEntry.value / props.count) * 100).toFixed(2) +
          "%"
        }
        labelStyle={{ ...labelStyle }}
      />
    </div>
  );
}
