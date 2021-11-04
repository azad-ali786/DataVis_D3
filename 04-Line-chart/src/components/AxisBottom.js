const AxisBottom = ({ innerHeight, xScale,tickOffset=3 }) => {
  return xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text dy="1em" y={innerHeight + tickOffset} style={{ textAnchor: "middle" }}>
        {tickValue}
      </text>
    </g>
  ));
};
export default AxisBottom;
