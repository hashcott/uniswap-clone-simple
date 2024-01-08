"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ethers } from "ethers";

import styles from "./page.module.css";
import { Card } from "./component/Card";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState(false);
  const [signer, setSigner] = useState(false);
  const [coinFirts, setCoinFirst] = useState(undefined);
  const [coinSeconds, setCoinSecond] = useState(undefined);
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEth = ethers.formatEther(balance);
    setBalance(balanceInEth);
    await provider.send("eth_requestAccounts", []);
    setSigner(signer);
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
              ? account.slice(0, 6) +
                "..." +
                account.slice(account.length - 4, account.length)
              : "CONNECT"}
          </button>
        </div>
      </nav>

      <div className={styles.center}>
        {/* write card component */}
        <div className={styles.card}>
          <Card
            name="You pay"
            coin="eth"
            value={coinFirts}
            onChange={setCoinFirst}
            disabled={false}
            balance={balance}
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
          <Card
            name="You receive"
            coin="usdt"
            value={coinSeconds}
            onChange={setCoinSecond}
            disabled={true}
          />

          <button className={styles.buttonTransfer}>Connect wallet</button>
        </div>
      </div>

      {/* create model popup with react */}
      <Modal isOpen={isOpen} contentLabel="Select a token">
        HELLO
      </Modal>
    </main>
  );
}
