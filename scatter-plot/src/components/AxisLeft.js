const AxisLeft = ({ yScale,innerWidth,tickOffset = 3 }) => {
  return yScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(0,${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        dy="0.75em"
        x={-tickOffset}
        y={yScale(tickValue)}
        style={{ textAnchor: "end" }}
      >
        {tickValue}
      </text>
    </g>
  ));
};
export default AxisLeft;
