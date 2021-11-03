const AxisLeft = ({ yScale }) => {
  return yScale.ticks().map((tickValue) => (
    <g className="tick">
      <text
        key={tickValue}
        dy="0.75em"
        x="-3"
        y={yScale(tickValue)}
        style={{ textAnchor: "end" }}
      >
        {tickValue}
      </text>
    </g>
  ));
};
export default AxisLeft;
