const AxisBottom = ({ innerHeight,xScale }) => {
  return xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="black" />
      <text dy="1em" y={innerHeight + 3} style={{ textAnchor: "middle" }}>
        {tickValue}
      </text>
    </g>
  ));
};
export default AxisBottom;