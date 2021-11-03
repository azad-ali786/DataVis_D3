import React from "react";
import { useData } from "./useData";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import { scaleBand, scaleLinear, max } from "d3";
function App() {
  let height, width;
  if (typeof window != "undefined") {
    // needed if SSR
    height = window.innerHeight;
    width = window.innerWidth;
  }

  const margin = { top: 20, right: 30, bottom: 65, left: 220 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const data = useData();

  if (!data && typeof window != "undefined")
    return <h1>Shake your ass till data loads...</h1>;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          data={data}
          xScale={xScale}
        />
        <AxisLeft yScale={yScale}/>
        {data.map((d) => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
}

export default App;
