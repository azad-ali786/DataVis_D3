import { geoPath, geoOrthographic, geoGraticule } from "d3";

const projection = geoOrthographic();
const path = geoPath(projection);
const graticule = geoGraticule();
const Marks = ({
  atlasData: { land, interiors },
  citiesData,
  innerHeight,
  innerWidth,
}) => (
  <g
    transform={`translate(${innerWidth / 5},${innerHeight / 6})`}
    className="marks"
  >
    <path className="sphere" d={path({ type: "Sphere" })} />
    <path className="graticules" d={path(graticule())} />
    {land.features.map((feature, i) => (
      <path key={"land" + i} className="land" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {citiesData.map((d,i) => {
      const [x, y] = projection([d.lng, d.lat]);
      return <circle key={x+y+i} cx={x} cy={y} r={1.5} />;
    })}
  </g>
);
export default Marks;
