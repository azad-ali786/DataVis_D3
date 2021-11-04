const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) => {
  return data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
    >
      <title>{xValue(d)}</title>
    </circle>
  ));
};

export default Marks;
