import {useState, useEffect} from 'react'
import {ethers} from "ethers";
import { Bars } from 'react-loading-icons'

import From from "./FetchFrom";
import Timestamp from "./FetchTime.jsx";

const API = "wss://eth-mainnet.g.alchemy.com/v2/sPHej3eXIm8lSDLxDymv98G3KgOWnuD_";

const FetchData = () => {

    const [mint, setMint] = useState([]);
    const [burn, setBurn] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

      let provider = new ethers.providers.WebSocketProvider(API, 1);
      const wbtcAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
      let abi = [ "event Mint(address indexed to, uint256 amount);", "event Burn(address indexed burner, uint256 value);" ];
      const contract = new ethers.Contract(wbtcAddress, abi, provider);

      const retrieveTransactions = async () => {
        setLoading(true);

        const mintTransactions = await contract.queryFilter("Mint", 0, "latest");
        const burnTransactions = await contract.queryFilter("Burn", 0, "latest");
        const slicedMint = mintTransactions.slice(mintTransactions.length - 21, mintTransactions.length - 1);
        const slicedBurn = burnTransactions.slice(burnTransactions.length - 21, burnTransactions.length - 1);

        setMint(slicedMint);
        setBurn(slicedBurn);

        setLoading(false);
      }
      
      retrieveTransactions();    
    }, []);

  return (
    <div>
     <h1 className='text-primary text-center text-3xl md:text-5xl my-10 font-bold'>Mint & Burn - WBTC</h1>
      <div className='grid lg:grid-cols-2 gap-6 mt-6 mx-6 mb-6'>
        <div className="flex flex-col items-center bg-secondary p-4 shadow-lg rounded-md">
          <h3 className='mb-4 text-lg md:text-2xl font-bold text-primary'>Mint Transactions</h3>
          <div className='flex flex-col divide-primary divide-y text-primary font-semibold'>
            {!loading ? (mint.map((value, index)=>(
              <ul className="m-3" key={index}>
                <li>Transaction Hash: {value.transactionHash}</li>
                <From transactionHash={value.transactionHash} api={API}></From>
                <Timestamp blockNumber={value.blockNumber} api={API}></Timestamp>
              </ul>
              ))) : <Bars stroke="#C93D4B" speed={.75}/>}
          </div>
        </div>
        <div className="flex flex-col items-center bg-secondary p-4 shadow-lg rounded-md">
          <h3 className='mb-4 text-lg md:text-2xl font-bold text-primary' >Burn Transactions</h3>
          <div className='flex flex-col divide-primary divide-y text-primary font-semibold'>
            {!loading ? (burn.map((value, index)=>(
              <ul className="m-3" key={index}>
                <li>Transaction Hash: {value.transactionHash}</li>
                <From transactionHash={value.transactionHash} api={API}></From>
                <Timestamp blockNumber={value.blockNumber} api={API}></Timestamp>
              </ul>
              ))) : <Bars stroke="#C93D4B" speed={.75}/>}
          </div>
        </div>
            </div>
    </div>  
  )
}

export default FetchData;