import React, { useState } from "react";
import { useData } from "./helpers/useData";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import ColorLegend from "./components/ColorLegend";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { scaleLinear, extent, scaleOrdinal } from "d3";
function App() {
  let height, width;
  if (typeof window != "undefined") {
    // needed if SSR
    height = window.innerHeight;
    width = window.innerWidth;
  }

  const margin = { top: 20, right: 150, bottom: 150, left: 80 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;

  //Required Data attributes for Menus
  const attributes = [
    { value: "sepal_length", label: "Sepal Length" },
    { value: "sepal_width", label: "Sepal Width" },
    { value: "petal_length", label: "Petal Length" },
    { value: "petal_width", label: "Petal Width" },
    { value: "species", label: "Species" },
  ];
  //Function for getting labels from attributes chosen.
  const getLabel = (value) => {
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].value === value) {
        return attributes[i].label;
      }
    }
  };

  //variables for x-axis of the graph
  const [xAttribute, setXAttribute] = useState("petal_length");
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  //variables for y-axis of the graph
  const [yAttribute, setYAttribute] = useState("sepal_width");
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  //variable for colorScale property
  const colorValue = (d) => d.species;
  const colorLegendLabel = 'Species';

  //Data fetching
  const data = useData();
  //hovered value of color legend
  const [hoveredValue,setHoveredValue]=useState(null);

  if (!data && typeof window != "undefined")
    return <h1>Shake your ass till data loads...</h1>;
  
  const filteredData = data.filter(d=> colorValue(d)===hoveredValue)

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      <div className="axis-selection-container">
        <h1 className="axis-selection">X:</h1>
        <ReactDropdown
          options={attributes}
          selectedValue={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
          placeholder={xAxisLabel}
        />
        <h1 className="axis-selection">Y:</h1>
        <ReactDropdown
          options={attributes}
          selectedValue={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
          placeholder={yAxisLabel}
        />
      </div>
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
          <g transform={`translate(${innerWidth+20}, 40)`}>
          <text
            x={35}
            y={-25}
            className="axis-label"
            textAnchor="middle"
          >
            {colorLegendLabel}
          </text>
          <ColorLegend colorScale={colorScale} setHoveredValue={setHoveredValue}/>
          </g>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            fillValue={0.1}
          />
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            fillValue={0.3}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
