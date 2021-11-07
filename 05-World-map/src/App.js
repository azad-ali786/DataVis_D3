import React from "react";
import { useData } from "./helpers/useData";
import Marks from "./components/Marks";

function App() {
  let height, width;
  if (typeof window != "undefined") {
    // needed if SSR
    height = window.innerHeight;
    width = window.innerWidth;
  }

  const data = useData();
 
  if (!data) {
    return <pre>Shake your ass till it loads...</pre>;
  }


  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
}

export default App;
