const AxisLeft=({yScale})=>{ return yScale.domain().map((tickValue) => (
    <text
      key={tickValue}
      dy="0.75em"
      x="-3"
      y={yScale(tickValue) + yScale.bandwidth() / 2}
      style={{ textAnchor: "end" }}
    >
      {tickValue}
    </text>
  ))
}
export default AxisLeft;