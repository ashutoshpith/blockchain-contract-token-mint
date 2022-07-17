import { useWeb3 } from "@3rdweb/hooks";
import contractAbi from '../artifacts/contracts/AdaptiveCode.sol/AdaptiveCode.json';
import {ethers} from "ethers";
import { useState } from "react";


export default function Home() {
  const {address, chainId, connectWallet} = useWeb3()
  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
      await connectWallet('injected')
      if(address){
		accountChangedHandler(address);
	  setConnButtonText('Wallet Connected');
      }
		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		initContract();
	}

  const initContract =  async () => {
    const address2 = '0xb912A1569DFd1070B53CDc3933292f5797D79240';
    if(window.ethereum && window.ethereum.isMetaMask){
      await window.ethereum.enable();
      const tProvider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(tProvider)

      let tSigner = tProvider.getSigner();
      setSigner(tSigner);

      const abi = contractAbi?.abi;
      const tContract = new ethers.Contract(address2,abi, tSigner);
      setContract(tContract);	
    } else {
      console.log("Eroor ", window);
    }
  }

  const getBalance = async () => {
    const tBalance = await contract.balance();
    setBalance(tBalance.toString())
  }

  const mintToken = async (event) => {
    event.preventDefault();
    const tokenValue = Number(event.target.setToken.value)
    if(tokenValue){
      await contract.mintToken(tokenValue);
    }
  }

  const burnToken = async (event) => {
    event.preventDefault();
    const tokenValue = Number(event.target.setToken.value)
    if(tokenValue){
    await contract.burnToken(tokenValue);
    }
  }
     return (
      <div>
        <h4> {"Get/Set Contract interaction"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
      
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
        <button onClick={getBalance}>Balance</button>
        {balance}
        <br></br>
        <hr></hr>
        <br></br>
        <form onSubmit={mintToken}>
				<input id="setToken" type="text"/>
				<button type={"submit"}> Mint Token </button>
			</form>
        <br></br>
        <hr></hr>
        <br></br>
        <form onSubmit={burnToken}>
				<input id="setToken" type="text"/>
				<button type={"submit"}> Burn Token </button>
			</form>

      
        <br></br>
        <hr></hr>
        <br></br>
      </div>
    )
  } 

