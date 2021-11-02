import React,{useState} from 'react';
import {useData} from './useData';
import {scaleBand,scaleLinear,max} from 'd3';
function App() {

  let height,width; 
  if (typeof window != "undefined") { // needed if SSR
    height=window.innerHeight;
    width=window.innerWidth;
  }

  const data = useData();

  if(!data && typeof window != "undefined") return <h1>Shake your ass till data loads...</h1>
 
  const yScale = scaleBand().domain(data.map(d=>d.Country)).range([0, height])
  const xScale = scaleLinear().domain([0,max(data,d=> d.Population)]).range([0,width])

  return (
  
    <svg width={width} height={height}>
      {data.map(d=>(
      <rect x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()} />
      ))}
    </svg>
  );
}

export default App;
