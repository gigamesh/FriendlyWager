import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FRIENDLY_WAGER_ADDRESS, FRIENDLY_WAGER_ABI } from "./config";
import Web3 from "web3";
import Form from "./Form/Form";

const WEI_ONE_ETH = 1e18;

async function getContractData(contract, address) {
  const unixDate = await contract.methods.endDateTime().call();
  const momentObj = moment(parseInt(unixDate, 10));
  const proposal = await contract.methods.proposal().call();
  const maxBet = await contract.methods.maxBet().call();

  const participants = await contract.methods.participants(address);
  return {
    date: momentObj,
    proposal,
    maxBet: maxBet / WEI_ONE_ETH,
    participants
  };
}

function App() {
  const contractRef = useRef();
  // const [account, setAccount] = useState("");
  const [endDate, setEndDate] = useState(moment());
  const [proposal, setProposal] = useState("");
  const [maxBet, setMaxbet] = useState(0);

  useEffect(() => {
    (async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

      // NETWORK
      const network = await web3.eth.net.getNetworkType();
      console.log("network:", network);

      // CONTRACT
      contractRef.current = new web3.eth.Contract(
        FRIENDLY_WAGER_ABI,
        FRIENDLY_WAGER_ADDRESS
      );

      // ACCOUNT
      if (window.ethereum) {
        const accounts = await window.ethereum.enable();

        const data = await getContractData(contractRef.current, accounts[0]);

        setEndDate(data.date);
        setProposal(data.proposal);
        setMaxbet(data.maxBet);
        console.log(data.participants);
      }
    })();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="friendlyHeader">Friendly Wager</h1>
        <Form
          contract={contractRef.current}
          endDate={endDate}
          proposal={proposal}
          maxBet={maxBet}
        />
      </div>
    </>
  );
}

export default App;
