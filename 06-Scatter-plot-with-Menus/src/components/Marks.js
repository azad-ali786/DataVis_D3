const Marks = ({ data, xScale, yScale, xValue, yValue, colorScale,colorValue }) => {
  return data.map((d,id) => (
    <circle
      className="mark"
      stroke={colorScale(colorValue(d))}
      fill={colorScale(colorValue(d))}
      fill-opacity="0.1"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
      key={id}
    >
      <title>{xValue(d)}</title>
    </circle>
  ));
};

export default Marks;
