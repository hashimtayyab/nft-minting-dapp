import './App.css';
import React, { useState } from "react";
import { Crowdfund } from "./abi/abi";
import Web3 from "web3";
import { ConnectWallet } from "@thirdweb-dev/react";
import {Row, Col, Container} from "react-bootstrap"

const web3 = new Web3(Web3.givenProvider);
// Contract address of the deployed smart contract
const contractAddress = "0x8780d052155e88f22591312b9a4bfc212c9434e6";
const fundContract = new web3.eth.Contract(Crowdfund, contractAddress);

function App() {
  const [amount, setAmount] = useState();

  const handleMint = async() => {
    const amountToSend = web3.utils.toWei(amount.toString(), 'ether');
    const address = web3.currentProvider.selectedAddress;

    const functionArgs = { from: web3.currentProvider.selectedAddress, value: amountToSend };
    await fundContract.methods.safeMint(address).send(functionArgs);
  };

  const handleWithdraw = async() => {
    await fundContract.methods.withdraw().send({from: web3.currentProvider.selectedAddress});
  }


  return (
    <Container
      className="App"
      style={{
        backgroundImage: "url(/images/blackbg.jpg)",
        height:"auto",
        minHeight:"100vh"
      }}
    >
      <Container
        className="InnerApp"
        style={{
          height: "auto",
          width:"auto"
        }}
      >
        <Row className="justify-content-md-center" id="top">
          <Col xs lg="2">
            <ConnectWallet className='walllet' accentColor="#a9a9a9" colorMode="dark" />
          </Col>
          <Col xs lg="7" className="neonText">
            Super Hat Club
          </Col>
          <Col>
          <button onClick={handleWithdraw} className='withdraw'>Withdraw</button>
          </Col>
        </Row>

        <Row className="liveNow">
          <span>MINTING IS LIVE NOW!</span>
        </Row>

        <Row className="justify-content-md-center" id="remaining">
          <Col xs lg="2">
            <Row className="labeling">Total</Row>
            <Row id="variableamnt">40</Row>
          </Col>
          <Col xs lg="2">
            <Row className="labeling">Price</Row>
            <Row id="variableamnt">0.000001 Matic</Row>
          </Col>
        </Row>

        <Row className="justify-content-md-space-around" id="items">
          <Col xs lg="3">
            <img className="logoImg" src="../images/logo.png" alt="" />
          </Col>
          <Col xs lg="2" >
            <Row id="inputPrice">
            <input
              type="text"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            </Row>
            <Row>
            <button className="mintbutton" onClick={handleMint}>MINT</button>
            </Row>
          </Col>
        </Row>


        <Row className="justify-content-md-space-around" id="link">
          <Col className='address' xs lg="3">
            <Row className='labeling'> Contract Address:
            </Row> 
            <Row className='variableamnt'>0x8780d052155e88f22591312b9a4bfc212c9434e6</Row>
            </Col>
          <Col xs lg="2">
          <a href="https://testnets.opensea.io/collection/super-hat-club-3">
            <button className="linkbtn__">
              Tap To View Collection on OpenSea
            </button>
          </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;