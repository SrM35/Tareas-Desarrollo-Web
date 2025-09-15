import React from "react";
import Navbar from "./Navbar.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="header">
        <h1 className="help">"Prepare for the future!"</h1>
      </div>

      <main className="content">
        <div className="content-text">
          <h1 className="help-title">We're here to help!</h1>
          <p>
            At Vault-Tec, we are dedicated to safeguarding America's future.
            Since 2031, our advanced vaults have provided secure, comfortable, and technologically
            superior shelters for families across the nation. 
          </p>
          <div className="buttons">
            <a href="https://fallout-archive.fandom.com/wiki/List_of_known_Vaults#List" target="_blank" rel="noopener noreferrer">
              <button className="btn primary">EXPLORE OUR VAULTS</button>
            </a>
            <a href="https://store.steampowered.com/app/22300/Fallout_3/" target="_blank" rel="noopener noreferrer">
              <button className="btn secondary">LEARN MORE</button>
            </a>
          </div>
        </div>

        <div className="video">
          <video src="VaultTec.mp4" autoPlay controls muted />
        </div>
      </main>

    </>
  );
}

export default App;
