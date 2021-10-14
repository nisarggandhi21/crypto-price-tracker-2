import React, { useState, useEffect } from "react";
import "./Buynow.css";
import Cryptotile from "./Cryptotile";
import BuyForm from "./BuyForm";
import Transactions from "./Transactions";

import btc from "./Assets/btc.png";
import eth from "./Assets/eth.png";
import doge from "./Assets/doge.png";
import axios from "axios";

function Buynow() {

  const [list, setList] = useState([]);
  const [tiles, setTiles] = useState([
    { id: 1, icon: btc, name: "BTC", rate: 0 },
    { id: 2, icon: eth, name: "ETH", rate: 0 },
    { id: 3, icon: doge, name: "DOGE", rate: 0 },
  ])
  const [selectedTile, setSelectedState] = useState(tiles[0]);
  

  useEffect(() => {
    const getData =  async() => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        const newTiles = [...tiles]
        let index = 0
        if(res.data.length > 1){
          for(const c of res.data){
            if(c.symbol.toLowerCase() === tiles[index].name.toLowerCase()){
              newTiles[index].rate = c.current_price
              index++
            }
            if(index > tiles.length){
              break
            }
          }
          setTiles(newTiles)
        }
        
      } catch(err) {
        console.log(err)
      }
    }
    getData()
    // eslint-disable-next-line 
  }, [])


  const handleSelect = (data) => {
    setSelectedState(data);
  };

  const buildList = (list) => {
    setList(list);
  };

  return (
    <div className="buynow">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="d-flex">
              {
                tiles.length > 0 ?
                tiles.map((cryptocoin) => 
                  <Cryptotile
                    key={cryptocoin.id}
                    data={cryptocoin}
                    onClick={handleSelect}
                    selected={cryptocoin.id === selectedTile.id}
                  />
                )
                : null
              }
            </div>
            <BuyForm data={selectedTile} onPurchase={buildList} />
          </div>
          <div className="col-sm TransHist">
            <Transactions list={list} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buynow;
