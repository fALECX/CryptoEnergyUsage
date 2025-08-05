import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Info } from 'lucide-react';
import './App.css';
import globalWarmingAnimation from './assets/Global Warming.json';
import arrowSvg from './assets/right-drawn-arrow-svgrepo-com.svg';


function App() {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [ethereumData, setEthereumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Bitcoin data
        const bitcoinResponse = await fetch('https://ccaf.io/cbeci/api/charts/energy_efficiency_of_mining_hardware/actual/0.05');
        const bitcoinResult = await bitcoinResponse.json();
        
        // Fetch Ethereum data
        const ethereumResponse = await fetch('https://ccaf.io/cbeci/api/eth/pos/data/stats');
        const ethereumResult = await ethereumResponse.json();
        
        setBitcoinData(bitcoinResult.data);
        setEthereumData(ethereumResult.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Convert Ethereum power from KW to GW for comparison
  const ethereumPowerGW = ethereumData ? ethereumData.guess_power / 1000000 : 0;
  const bitcoinPowerGW = bitcoinData ? bitcoinData.estimated : 0;

  // Calculate percentages with a minimum visibility for Ethereum
  const totalPower = bitcoinPowerGW + ethereumPowerGW;
  const bitcoinPercentage = totalPower > 0 ? (bitcoinPowerGW / totalPower) * 100 : 0;
  const ethereumPercentage = totalPower > 0 ? (ethereumPowerGW / totalPower) * 100 : 0;
  
  // For visualization, use realistic proportions with minimum visibility
  const minEthereumPercentage = 2; // Much smaller minimum
  const adjustedEthereumPercentage = Math.max(ethereumPercentage, minEthereumPercentage);
  const adjustedBitcoinPercentage = 100 - adjustedEthereumPercentage;

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <h1 className="header">Why Proof of Stake is necessary</h1>
          <div className="loading">Loading energy consumption data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="container">
          <h1 className="header">Why Proof of Stake is necessary</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        
        <h1 className="header">Why Proof of Stake is necessary</h1>
        
                 <div className="lottie-container">
                <Lottie
                  animationData={globalWarmingAnimation}
                  loop={true}
                  style={{ width: 500, height: 500 }}
                  autoplay={true}
                />
              </div>
         <div className="arrow-container">
           <div className="arrow-text">Yes - that's how much less Proof of Stake uses. Save the planet!</div>
           <img 
             src={arrowSvg} 
             alt="Arrow pointing to Ethereum" 
             className="arrow-svg"
           />
         </div>

          <div className="arrow-container-left">
            <div className="arrow-text-left">
              <a href="https://digiconomist.net/bitcoin-energy-consumption" target="_blank" rel="noopener noreferrer">
                Cryptocurrencies are using as much energy as the entire country of Finland!
              </a>
            </div>
            <img 
              src={arrowSvg} 
              alt="Arrow pointing to Bitcoin" 
              className="arrow-svg-left"
            />
          </div>

                 <div className="progress-container">
           <div className="progress-bar">
             <div 
               className="progress-segment bitcoin"
               style={{ width: `${adjustedBitcoinPercentage}%` }}
             >
               <div className="segment-content">
                 <span className="crypto-name">Bitcoin (PoW)</span>
                 <span className="power-value">{bitcoinPowerGW.toFixed(2)} GW</span>
               </div>
             </div>
             <div 
               className="progress-segment ethereum"
               style={{ width: `${adjustedEthereumPercentage}%` }}
               title={`Ethereum uses only ${ethereumPowerGW.toFixed(6)} GW - hover to see the real scale!`}
             >
               <div className="segment-content">
                 <span className="crypto-name">Ethereum (PoS)</span>
                 <span className="power-value">{ethereumPowerGW.toFixed(4)} GW</span>
               </div>
             </div>
           </div>
         </div>
         
         

                 <div className="comparison-container">
           <div className="comparison-title">Energy Consumption Comparison</div>
           <div className="comparison-ratio">
             <div className="ratio-item">
               <div className="ratio-label">Bitcoin (PoW)</div>
               <div className="ratio-value">{bitcoinPowerGW.toFixed(2)} GW</div>
               <div className="ratio-bar bitcoin-bar"></div>
             </div>
             <div className="ratio-item">
               <div className="ratio-label">Ethereum (PoS)</div>
               <div className="ratio-value">{ethereumPowerGW.toFixed(4)} GW</div>
               <div className="ratio-bar ethereum-bar"></div>
             </div>
           </div>
           <div className="comparison-stats">
             <div className="stat-highlight">
               <span className="highlight-number">{(bitcoinPowerGW / ethereumPowerGW).toFixed(0)}x</span>
               <span className="highlight-text">more energy consumption</span>
             </div>
             <div className="stat-highlight">
               <span className="highlight-number">99.997%</span>
               <span className="highlight-text">reduction with PoS</span>
             </div>
           </div>
         </div>

         <div className="pos-chains-section">
         <h2 className="pos-chains-title-2">USE PROOF OF STAKE INSTEAD!</h2>

            <h2 className="pos-chains-title">These chains already use PoS:</h2>
            <div className="chains-carousel">
              <div className="carousel-track">
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/4380/small/download.png" alt="Algorand" />
                  <span>Algorand</span>
                </div>
                {/* Duplicate items for seamless loop */}
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="Ethereum" />
                  <span>Ethereum</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" alt="BNB Chain" />
                  <span>BNB Chain</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/975/small/cardano.png" alt="Cardano" />
                  <span>Cardano</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="Solana" />
                  <span>Solana</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/12171/small/polkadot.png" alt="Polkadot" />
                  <span>Polkadot</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png?1696512369" alt="Avalanche" />
                  <span>Avalanche</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/976/standard/Tezos-logo.png?1696502091" alt="Tezos" />
                  <span>Tezos</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png" alt="Cosmos" />
                  <span>Cosmos</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/10365/small/near_icon.png" alt="NEAR Protocol" />
                  <span>NEAR Protocol</span>
                </div>
                <div className="chain-item">
                  <img src="https://assets.coingecko.com/coins/images/4380/small/download.png" alt="Algorand" />
                  <span>Algorand</span>
                </div>
              </div>
            </div>
          </div>

        <div className="stats-container">
          <div className="stat-card bitcoin-stat">
            <h3>Bitcoin (Proof of Work)</h3>
            <div className="stat-value">{bitcoinPowerGW.toFixed(2)} GW</div>
            <div className="stat-details">
              <div>Lower bound: {bitcoinData?.lower_bound || 'N/A'} GW</div>
              <div>Upper bound: {bitcoinData?.upper_bound || 'N/A'} GW</div>
            </div>
          </div>
          
          <div className="stat-card ethereum-stat">
            <h3>Ethereum (Proof of Stake)</h3>
            <div className="stat-value">{ethereumPowerGW.toFixed(4)} GW</div>
            <div className="stat-details">
              <div>Min power: {ethereumData ? (ethereumData.min_power / 1000000).toFixed(4) : 'N/A'} GW</div>
              <div>Max power: {ethereumData ? (ethereumData.max_power / 1000000).toFixed(4) : 'N/A'} GW</div>
            </div>
          </div>
          
        </div>
       

          <div className="info-container">
           <div className="info-icon">
             <Info size={20} />
           </div>
           <div className="info-text">
             Data source: <a 
               href="https://ccaf.io/cbnsi/ethereum" 
               target="_blank" 
               rel="noopener noreferrer"
               className="info-link"
             >
               Cambridge Blockchain Network Sustainability Index
             </a>
           </div>
         </div> 
      </div>
    </div>
  );
}

export default App; 