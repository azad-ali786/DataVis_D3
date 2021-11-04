import { line, curveNatural } from 'd3';
const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) => {
  return(
    <>
    <path
      fill="none"
      stroke="black"
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
   { data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
    >
      <title>{xValue(d)}</title>
    </circle>
  ))}
  
  </>
  )};

export default Marks;
