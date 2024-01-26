"use client";

import Image from "next/image";
import { ethers, BigNumber, FixedNumber } from "ethers";
import styles from "./page.module.css";
import { Card } from "./component/Card";
import Uniswap from "../../contracts/Uniswap.json"; // step 1
import { useEffect, useState } from "react";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);

  const [firstCoin, setFirstCoin] = useState("");
  const [secondCoin, setSecondCoin] = useState("");
  useEffect(() => {}, []);
  const connectWallet = async () => {
    if (contract) {
      const balanceUsd = await contract.getBalance("USD", account);
      alert("Ban co " + ethers.utils.formatEther(balanceUsd) + " USD");
      return;
    }

    if (typeof window.ethereum === undefined) {
      alert("Please install MetaMask first.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // read-write contract
    const signer = provider.getSigner(); // bo sung

    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const balance = await provider.getBalance(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));

    const contractConntection = new ethers.Contract( // step 2
      "0x270638B60B1819fAd96EB33AfF01bfF555F48B8B", // address of contract deployed on blockchain (sepolia)
      Uniswap.abi, // abi of contract
      signer // read-write contract
    );

    setContract(contractConntection);

    // payable
    // const result = await contract.swapEthToToken("USD", {
    //   value: ethers.utils.parseEther("1"), // optional
    // });
    // console.log(result);
    // trick lord

    const balanceUsd = await contractConntection.getBalance("USD", accounts[0]);
    alert("Ban co " + ethers.utils.formatEther(balanceUsd) + " USD");

    // console.log(+ethers.utils.formatEther(balanceUsd).toString());

    await window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  const convert = async () => {
    const result = await contract.swapEthToToken("USD", {
      value: ethers.utils.parseEther(firstCoin.toString()), // optional
    });
    alert("Ban da mua " + ethers.utils.formatEther(result) + " USD");
  };

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>
          <span className={styles.first}>ONI</span>{" "}
          <span className={styles.second}>SWAP</span>
        </h2>
        <ul className={styles.navCenter}>
          <li className={styles.navItem}>
            <a href="/swap">Swap</a>
          </li>
          <li className={styles.navItem}>
            <a href="">Pool</a>
          </li>
          <li className={styles.navItem}>
            <a href="">Market</a>
          </li>
          <li className={styles.navItem}>
            <a href="">Create</a>
          </li>
        </ul>
        <div className={styles.navRight}>
          <button onClick={() => connectWallet()} className={styles.button}>
            {account
              ? account.slice(0, 7) +
                "..." +
                account.slice(account.length - 5, account.length)
              : "Connect Wallet"}
          </button>
        </div>
      </nav>

      <div className={styles.center}>
        {/* write card component */}
        <div className={styles.card}>
          <Card
            name="You pay"
            coinSymbol="eth"
            contract={contract}
            setValue={setFirstCoin}
            setValue2={setSecondCoin}
            balance={balance}
            value={firstCoin}
          />
          {/* generate html for box  */}
          <div className={styles.wrappedBox}>
            <div className={styles.box}>
              <Image
                src="/arrow.svg"
                alt="arrow"
                width={16}
                height={16}
                priority
              />
            </div>
          </div>
          <Card name="You receive" value={secondCoin} coinSymbol="usd" />

          <button
            style={{
              display: firstCoin ? "block" : "none",
            }}
            onClick={() => convert()}
            className={styles.convertButton}
          >
            {" "}
            Convert{" "}
          </button>
        </div>
      </div>
    </main>
  );
}
