//need challange
/*
코인을 select 하고 숫자를 입력하면 BTC가격으로 변환하여 출력!
*/
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  return <div>
    <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
    {loading ? <strong>Loading...</strong>: (
      <select>
      {coins.map((coin) =>(
        <option key = {coin.id}>
          {coin.name} ({coin.symbol}): {Math.round(parseFloat(coin.quotes.USD.price)*100000)/100000} USD
        </option>
      ) 
      )}
    </select>
    )}
    
  </div>
}
export default App;
