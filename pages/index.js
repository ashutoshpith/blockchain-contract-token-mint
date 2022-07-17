import { useWeb3 } from "@3rdweb/hooks";
import contractAbi from '../artifacts/contracts/AdaptiveCode.sol/AdaptiveCode.json';
import {ethers} from "ethers";
import { useState } from "react";


export default function Home() {
  const {address, chainId, connectWallet, balance: walletBalance} = useWeb3()
  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [displayMsg, setDisplayMsg] = useState('Please connect your wallet')

  const connectWalletHandler = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
      await connectWallet('injected')
      if(address){
        accountChangedHandler(address);
        setConnButtonText('Wallet Connected');
        setDisplayMsg("")
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


  if(displayMsg){
    return (
      <div>
    <button style={{
        position: "absolute",
        width: "602px",
        height: "100px",
        left: "856px",
        top: "68px",
        background: "#FF11E7",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "48px",
        lineHeight: "56px",

        color: "#FFFFFF"
       
      }} onClick={connectWalletHandler}>{connButtonText}</button>
      </div>
    )
  } else {
     return (
      <div>
            <button style={{
        position: "absolute",
        width: "602px",
        height: "100px",
        left: "856px",
        top: "68px",
        background: "#FF11E7",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "20px",
        lineHeight: "56px",

        color: "#FFFFFF"
       
      }}>{defaultAccount}</button>

  <div style={{
            paddingTop: "200px",
            
        }}>
	
  <button onClick={getBalance}>Total Supply</button>
        <h2>{balance}</h2>
        <br></br>
        <hr></hr>
        <br></br>
        <form onSubmit={mintToken}>
				<button type={"submit"} style={{
          position: "absolute",
          width: "735px",
          height: "139px",
          left: "145px",
          top: "400px",
          
          background: "#FF11E7"
        }}> Mint Token </button>
				<input id="setToken" type="text" style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "198px",
          height: "188px",
          left: "1025px",
          top: "376px",
          
          background: "#FFFFFF",
          border: "1px solid #000000",
        }}/>

			</form>

     <p style={{
      position: "absolute",
      width: "761px",
      height: "84px",
      left: "290px",
      top: "557px",
      
      fontFamily: 'Roboto',
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "42px",
      lineHeight: "84px",
      
      color: "#000000"
     }}>Token Balance in Wallet {walletBalance.value.toString()}</p>
      
     


        </div>
      
      </div>
     )
    }}