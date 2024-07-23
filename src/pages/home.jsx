import React, { useState, useEffect } from "react";

import '../AnimeCard.css';
import '../Recomendation.css';
import AnimeList from "../components/AnimeList";



export default function Home() {


  return (
    <>
      <div className="container-fluid">     
        <div className="row">
          {/* <Recomentdation /> */}
          </div>   
        <div className="row">
          <AnimeList />
        </div>
      </div>
    </>
  );
}
