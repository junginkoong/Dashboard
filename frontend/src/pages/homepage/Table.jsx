import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import getExchangeRate from "../../utils/api";
import { response_parse_table } from '../../utils/response_parse';

ModuleRegistry.registerModules([AllCommunityModule])

const SYMBOLS = ["USD", "CAD", "EUR"]
const colDefs = [
    { field: "base" },
    { field: "target", filter: true },
    { field: "date", filter: true },
    { field: "rate", filter: true }
]

export default function Table() {
    const gridRef = useRef(null)
    const [tableData, setTableData] = useState(null)
    const [tableBase, setTableBase] = useState("USD")
    const [isReversed, setIsReversed] = useState(false)
    const [gridApi, setGridApi] = useState(null)

    const fetchTableData = (base, isReversed) => {
        getExchangeRate(base)
            .then((data) => { setTableData(response_parse_table(data, base, isReversed)) })
            .catch((error) => {
                console.error("Error fetching exchange rate:", error)
            })
    }

    const handleCurrencyChange = (e) => {
        setTableBase(e.target.value);
        fetchTableData(e.target.value, isReversed)
    };

    const handleReverseToggle = () => {
        const updatedData = tableData.map(data => ({
            ...data,
            rate:(1 / data.rate).toFixed(5)
        }))
        setTableData(updatedData)
        setIsReversed(!isReversed)
        
    }

    const onFilterChanged = () => {
        if (gridApi) {
            const filters = gridApi.getFilterModel();
            localStorage.setItem('gridFilters', JSON.stringify(filters))
        }
    }

    const onGridReady = (params) => {
        const localFilters = localStorage.getItem('gridFilters')
        if (localFilters) {
            const filters = JSON.parse(localFilters)
            params.api.setFilterModel(filters)
        }
        setGridApi(params.api)
    }

    const clearLocalStore = () => {
        localStorage.setItem('gridFilters', null)
        gridApi.setFilterModel(null)
        gridApi.onFilterChanged()
    }

    useEffect(() => {
        fetchTableData(tableBase)
    }, [])

    return (
        <div style={{ height: 500, }}>
            <h2 style={{ marginBottom: '1rem' }}>Exchange Currency Table</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <div>
                    <label style={{ marginRight: '0.5rem', marginTop: '3px' }}>
                        Base Currency:
                    </label>
                    <select
                        id="currency-select"
                        value={tableBase}
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
            {tableData && <AgGridReact
                ref={gridRef}
                rowData={tableData}
                columnDefs={colDefs}
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    resizable: true,
                }}
                onGridReady={onGridReady}
                onFilterChanged={onFilterChanged}
            />}
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginTop: '0.5rem' }}>
                <button
                    style={{
                        padding: '0.4rem',
                        borderRadius: '6px',
                        border: '1px solid lightgray',
                        fontSize: '0.8rem',
                        backgroundColor: 'lightgray',

                    }}
                    onClick={() => clearLocalStore()}
                > 
                    Clear Filters
                </button>
            </div>
        </div>
    )
}