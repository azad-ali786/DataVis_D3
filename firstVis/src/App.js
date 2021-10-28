import React,{useEffect} from "react";
import {csv} from 'd3';
import * as vl from 'vega-lite-api';
import * as vega from 'vega';
import * as vegaLite  from "vega-lite";
import { Handler } from 'vega-tooltip';
import {config} from './config'
import { viz } from "./viz";
function App(){
const csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';
const getData = async () => {
  const data = await csv(csvUrl);
  console.log(data[0]);
  return data;
};
useEffect(()=>{
  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new Handler().call); }
  });
  
  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

},[]) 
  return (<></>);
}
export default App;
