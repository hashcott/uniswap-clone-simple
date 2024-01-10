"use client";

import Image from "next/image";
import { ethers } from "ethers";
import styles from "./page.module.css";
import { Card } from "./component/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const [firstCoin, setFirstCoin] = useState("");
  const [secondCoin, setSecondCoin] = useState("");

  useEffect(() => {}, []);
  const connectWallet = async () => {
    if (typeof window.ethereum === undefined) {
      alert("Please install MetaMask first.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const balance = await provider.getBalance(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));

    await window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
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
            setValue={setFirstCoin}
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
          <Card name="You receive" setValue={setSecondCoin} coinSymbol="uni" />
        </div>
      </div>
    </main>
  );
}
