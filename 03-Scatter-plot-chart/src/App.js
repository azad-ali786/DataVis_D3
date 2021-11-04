import React from "react";
import { useData } from "./helpers/useData";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import { scaleLinear, max } from "d3";
function App() {
  let height, width;
  if (typeof window != "undefined") {
    // needed if SSR
    height = window.innerHeight;
    width = window.innerWidth;
  }

  const margin = { top: 20, right: 30, bottom: 65, left: 80 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = "Petal Length";

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const data = useData();

  if (!data && typeof window != "undefined")
    return <h1>Shake your ass till data loads...</h1>;

  const xScale = scaleLinear()
    .domain([0.5, max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([1.5, max(data, yValue)])
    .range([innerHeight,0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          data={data}
          xScale={xScale}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}

export default App;
