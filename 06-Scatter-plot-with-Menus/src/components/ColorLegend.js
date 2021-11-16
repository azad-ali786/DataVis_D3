const ColorLegend = ({
  colorScale,
  setHoveredValue,
  tickSpacing = 30,
  tickSize = 10,
  tickTextOffset = 20,
}) => 
  colorScale.domain().map((domainValue, i) => (
    <g onMouseEnter={()=>setHoveredValue(domainValue)} onMouseLeave={()=>setHoveredValue(null)} key={"tick"+i} className="legendTick" transform={`translate(0,${i* tickSpacing})`}>
      <circle stroke={colorScale(domainValue)}
      fill={colorScale(domainValue)}
      fillOpacity="0.1" r={tickSize} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue.toUpperCase()}
      </text>
    </g>
  ));


export default ColorLegend;
