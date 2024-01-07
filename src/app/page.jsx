import Image from "next/image";

import styles from "./page.module.css";
import { Card } from "./component/Card";

export default function Home() {
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
          <button className={styles.button}>CONNECT</button>
        </div>
      </nav>

      <div className={styles.center}>
        {/* write card component */}
        <div className={styles.card}>
          <Card name="You pay" />
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
          <Card name="You receive" />
        </div>
      </div>
    </main>
  );
}
