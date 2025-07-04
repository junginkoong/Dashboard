import { useEffect, useState } from "react";
import getExchangeRate from "../utils/api";

export default function Homepage() {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        getExchangeRate("USD")
            .then((data) => { setRate(data) })
            .catch((error) => {
                console.error("Error fetching exchange rate:", error);
            });
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(rate, null, 2)}</pre>
        </div>
    );
}