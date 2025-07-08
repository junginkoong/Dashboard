import Chartjs from "./Chartjs";
import Table from "./Table"

export default function Homepage() {

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid lightgray' }}>
                <Table/>
            </div>

            <div style={{ flex: 2, padding: '1rem' }}>
                <Chartjs/>
            </div>
        </div>
        // <div>
        //     <Chartjs/>
        //     <Table/>
        // </div>
    );
}