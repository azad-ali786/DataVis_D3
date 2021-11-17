import { geoPath, geoOrthographic } from 'd3';

const projection = geoOrthographic();
const path = geoPath(projection);


const Marks = ({ data: { land, interiors },innerHeight,innerWidth }) => (
  <g transform={`translate(${innerWidth/5},${innerHeight/6})`} className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    {land.features.map(feature => (
      <path className="land" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
  </g>
);
export default Marks;