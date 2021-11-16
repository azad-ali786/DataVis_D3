const Marks = ({ data, xScale, yScale, xValue, yValue, colorScale,colorValue, fillValue }) => {
  return data.map((d,id) => (
    <circle
      className="mark"
      stroke={colorScale(colorValue(d))}
      fill={colorScale(colorValue(d))}
      fillOpacity={fillValue}
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
