import {useEffect, useState} from 'react'
import {ethers} from "ethers";
import moment from "moment";

const Timestamp = ({blockNumber, api}) => {

    const [time, setTime] = useState(null);

    useEffect(()=>{

        let provider = new ethers.providers.WebSocketProvider(api, 1);

        const retrieveTime = async () => {
            let block = await provider.getBlock(blockNumber);
            let _time = block.timestamp;
            setTime(moment.unix(_time).toString());
        }

        retrieveTime();
// eslint-disable-next-line 
    }, [])

    return (
        <li>Time: {time}</li>
    )
}

export default Timestamp;