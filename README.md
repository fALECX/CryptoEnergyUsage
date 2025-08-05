# Cryptocurrency Live Energy Usage

A React-based website that compares real-time energy consumption between Bitcoin (Proof of Work) and Ethereum (Proof of Stake) using data from the Cambridge Blockchain Network Sustainability Index.

## Features

- **Real-time Data**: Fetches live energy consumption data from CCAF APIs
- **Visual Comparison**: Animated progress bar showing the stark difference between PoW and PoS energy usage
- **Global Warming Animation**: Lottie animation highlighting environmental impact
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-refresh**: Updates data every 5 minutes

## Data Sources

- **Bitcoin (PoW)**: https://ccaf.io/cbeci/api/charts/energy_efficiency_of_mining_hardware/actual/0.05
- **Ethereum (PoS)**: https://ccaf.io/cbeci/api/eth/pos/data/stats
- **Source**: [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)

## Technology Stack

- React 18
- Lottie React (animations)
- Lucide React (icons)
- CSS3 with animations
- GitHub Pages deployment

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

The website will be available at: `https://samue.github.io/LiveCryptoData`

## Key Insights

The website demonstrates why Proof of Stake is necessary by showing:

- **Bitcoin (PoW)**: ~21.33 GW energy consumption
- **Ethereum (PoS)**: ~0.0005 GW energy consumption

This represents a **99.997% reduction** in energy consumption when switching from Proof of Work to Proof of Stake consensus mechanisms.

## Environmental Impact

The visualization clearly shows how Ethereum's transition to Proof of Stake has dramatically reduced its environmental footprint compared to Bitcoin's continued use of Proof of Work, making a compelling case for sustainable blockchain technologies.
