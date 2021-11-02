import React from "react";
import { useData } from "./useData";
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
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text dy="1em" y={innerHeight+3} style={{textAnchor: 'middle'}}>{tickValue}</text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
            <text key={tickValue} dy="0.75em" x="-3" y={yScale(tickValue)+yScale.bandwidth()/2}  style={{textAnchor: 'end'}}>{tickValue}</text>
        ))}
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
