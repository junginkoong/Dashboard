import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import getExchangeRate from "../../utils/api";
import { response_parse_chartjs } from "../../utils/response_parse"

const SYMBOLS = ["USD", "CAD", "EUR"]
const OPTIONS = 
{
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        tooltip: {
            mode: 'index',
            intersect: false,
        }
    },
    hover: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        x: {
            grid: {
                drawOnChartArea: true,
            },
        }
    },
    maintainAspectRatio: false
}

export default function Chartjs() {
    const [chartData, setChartData] = useState(null)
    const [chartBase, setChartBase] = useState("USD")
    const [chartSymbols, setChartSymbols] = useState(["CAD", "EUR"])
    const [isReversed, setIsReversed] = useState(false)

    const fetchChartData = (base, symbols, reversed) => {
        getExchangeRate(base)
            .then((data) => { setChartData(response_parse_chartjs(data, symbols, reversed)) })
            .catch((error) => {
                console.error("Error fetching exchange rate:", error)
            })
    }

    const handleCurrencyChange = (e) => {
        let symbols = SYMBOLS.filter(symbol => symbol != e.target.value)
        setChartBase(e.target.value);
        setChartSymbols(symbols)
        fetchChartData(e.target.value, symbols, isReversed)
    };

    const handleReverseToggle = () => {
        fetchChartData(chartBase, chartSymbols, !isReversed)
        setIsReversed(!isReversed)
        
    }

    useEffect(() => {
        fetchChartData(chartBase, chartSymbols, false)
    }, [])

    return (
        <div>
            <h2 style={{ marginBottom: '1rem' }}>Exchange Currency Chart</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <div>
                    <label style={{ marginRight: '0.5rem', marginTop: '3px', paddingLeft: '40px' }}>
                        Base Currency:
                    </label>
                    <select
                        id="currency-select"
                        value={chartBase}
                        onChange={handleCurrencyChange}
                        style={{
                            padding: '0.4rem',
                            borderRadius: '6px',
                            border: '1px solid lightgray',
                            fontSize: '1rem',
                        }}
                        >
                        {SYMBOLS.map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ marginRight: '0.5rem' }}>Reverse Rate:</label>
                    <input
                        type="checkbox"
                        checked={isReversed}
                        onChange={handleReverseToggle}
                    />
                </div>
            </div>
            <div style={{ width: '65vw', height: '500px' }}>
                {chartData && <Line datasetIdKey='id' data={chartData} options={OPTIONS}/>}
            </div>
        </div>
    );
}