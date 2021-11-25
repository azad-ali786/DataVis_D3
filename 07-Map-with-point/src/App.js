import React from "react";
import { useAtlasData } from "./helpers/useWorldAtlas";
import { useCitiesData } from "./helpers/useCities";
import Marks from "./components/Marks";
import { scaleSqrt,max} from "d3";

function App() {
  let height, width;
  if (typeof window != "undefined") {
    // needed if SSR
    height = window.innerHeight;
    width = window.innerWidth;
  }

  //data for globe
  const atlasData = useAtlasData();
  //data for point on globe to show population
  const citiesData = useCitiesData();

  if (!atlasData || !citiesData) {
    return <pre>Loading...</pre>;
  }
  
  //population scale [radius of circle proportional to population]
  const sizeValue = d => d.population;
  const maxRadius = 15;
  const sizeScale = scaleSqrt().domain([0,max(citiesData,sizeValue)]).range([0,maxRadius]);


  return (
    <svg className="sg" width={width} height={height}>
      <Marks innerWidth={width} innerHeight={height} atlasData={atlasData} citiesData={citiesData} sizeValue={sizeValue} sizeScale={sizeScale} />
    </svg>
  );
}

export default App;
