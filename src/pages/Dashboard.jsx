import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import {
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaExchangeAlt,
  FaDollarSign,
  FaGlobe,
  FaChartBar,
  FaBitcoin,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [btcData, setBtcData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [marketCapHistory, setMarketCapHistory] = useState([]);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const marketRes = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true"
        );
        setBtcData(marketRes.data.market_data);
      } catch (error) {
        console.error("Failed to fetch Bitcoin data", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        );
        const prices = res.data.prices.map((item) => {
          const date = new Date(item[0]);
          return {
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            price: item[1],
          };
        });
        const volumes = res.data.total_volumes.map((item) => {
          const date = new Date(item[0]);
          return {
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            volume: item[1],
          };
        });
        const marketCaps = res.data.market_caps.map((item) => {
          const date = new Date(item[0]);
          return {
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            marketCap: item[1],
          };
        });
        setPriceHistory(prices);
        setVolumeHistory(volumes);
        setMarketCapHistory(marketCaps);
      } catch (error) {
        console.error("Failed to fetch chart data", error);
      }
    };

    fetchBitcoinData();
    fetchChartData();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="dashboard-title">₿ Bitcoin Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time insights on Bitcoin performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <FaChartLine />
          </div>
          <div>
            <h3>Price</h3>
            <p className="price">
              ${btcData?.current_price?.usd?.toLocaleString() || "Loading..."}
            </p>
            <span className="status positive">
              {btcData?.price_change_percentage_24h?.toFixed(2) || "0"}%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-yellow">
            <FaBoxOpen />
          </div>
          <div>
            <h3>Market Cap</h3>
            <p className="price">
              ${btcData?.market_cap?.usd?.toLocaleString() || "Loading..."}
            </p>
            <span className="status neutral">24h</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green">
            <FaShoppingCart />
          </div>
          <div>
            <h3>Volume (24h)</h3>
            <p className="price">
              ${btcData?.total_volume?.usd?.toLocaleString() || "Loading..."}
            </p>
            <span className="status neutral">USD</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <FaUsers />
          </div>
          <div>
            <h3>Circulating Supply</h3>
            <p className="price">
              {btcData?.circulating_supply?.toLocaleString() || "Loading..."}{" "}
              BTC
            </p>
            <span className="status neutral">~</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-info">
            <FaExchangeAlt />
          </div>
          <div>
            <h3>Price Change (24h)</h3>
            <p className="price">
              ${btcData?.price_change_24h?.toLocaleString() || "Loading..."}
            </p>
            <span className="status neutral">vs USD</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-dark">
            <FaArrowUp />
          </div>
          <div>
            <h3>High 24h</h3>
            <p className="price">
              ${btcData?.high_24h?.usd?.toLocaleString() || "Loading..."}
            </p>
            <span className="status positive">24h peak</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-danger">
            <FaArrowDown />
          </div>
          <div>
            <h3>Low 24h</h3>
            <p className="price">
              ${btcData?.low_24h?.usd?.toLocaleString() || "Loading..."}
            </p>
            <span className="status negative">24h low</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-secondary">
            <FaGlobe />
          </div>
          <div>
            <h3>Market Rank</h3>
            <p className="price">#{btcData?.market_cap_rank || "..."}</p>
            <span className="status neutral">Global</span>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Bitcoin Price (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Bitcoin Volume (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volumeHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Market Cap Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Market Cap (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketCapHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
