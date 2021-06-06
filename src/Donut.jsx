// import React from "react";
// import {
//   Chart,
//   ChartTitle,
//   ChartLegend,
//   ChartTooltip,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
// } from "@progress/kendo-react-charts";

// export default function Donut(props) {
//   const data = [
//     {
//       status: "one",
//       value: props.globalRecord.one,
//       color: "#ffffff",
//     },
//     {
//       status: "two",
//       value: props.globalRecord.two,
//       color: "#ffffff",
//     },
//     {
//       status: "three",
//       value: props.globalRecord.three,
//       color: "#ffffff",
//     },
//     {
//       status: "four",
//       value: props.globalRecord.four,
//       color: "#ffffff",
//     },
//     {
//       status: "five",
//       value: props.globalRecord.five,
//       color: "#ffffff",
//     },
//     {
//       status: "six",
//       value: props.globalRecord.six,
//       color: "#ffffff",
//     },
//   ];
//   const labelContent = (e) => e.category;

//   return (
//     <div>
//       <Chart>
//         <ChartTitle text="Applications status - this month" />
//         <ChartLegend visible={false} />
//         <ChartSeries>
//           <ChartSeriesItem
//             type="donut"
//             data={data}
//             categoryField="status"
//             field="value"
//           >
//             <ChartSeriesLabels
//               color="#fff"
//               background="none"
//               content={labelContent}
//             />
//           </ChartSeriesItem>
//         </ChartSeries>
//       </Chart>
//     </div>
//   );
// }
