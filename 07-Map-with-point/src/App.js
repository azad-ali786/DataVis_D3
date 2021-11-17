import React from "react";
import { useAtlasData } from "./helpers/useWorldAtlas";
import { useCitiesData } from "./helpers/useCities";
import Marks from "./components/Marks";

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

  if (!atlasData) {
    return <pre>Shake your ass till it loads...</pre>;
  }

  return (
    <svg className="sg" width={width} height={height}>
      <Marks innerWidth={width} innerHeight={height} data={atlasData} />
    </svg>
  );
}

export default App;
