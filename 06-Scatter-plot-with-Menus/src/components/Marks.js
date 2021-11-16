const Marks = ({ data, xScale, yScale, xValue, yValue, colorScale,colorValue,flipper }) => {
  return data.map((d,id) => (
    <circle
      className="mark"
      strokeWidth= {flipper ? "2px":"0"}
      stroke={colorScale(colorValue(d))}
      fill={colorScale(colorValue(d))}
      fillOpacity="0.3"
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
