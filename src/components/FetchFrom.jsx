import {useEffect, useState} from 'react';
import {ethers} from "ethers";

const From = ({transactionHash, api}) => {

    const [from, setFrom] = useState("");

    useEffect(()=>{

        let provider = new ethers.providers.WebSocketProvider(api, 1);

        const retrieveFrom = async () => {
            let transactionReceipt = await provider.getTransactionReceipt(transactionHash);
            let _from = transactionReceipt.from;
            setFrom(_from);
        }

        retrieveFrom();
// eslint-disable-next-line 
    },[])

  return (
    <li>From: {from}</li>
  )
}

export default From;