import { line, curveNatural } from "d3";
const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) => {
  return (
    <g className="marks">
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(data)}
      />
      {/*
   If you want line chart with dots,remove the comments 
   { data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
    >
      <title>{xValue(d)}</title>
    </circle>
  ))} */}
    </g>
  );
};

export default Marks;
