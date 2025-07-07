export function response_parse_chartjs(data, symbols, isReversed){
    let formatted_data = {}
    let labels = []
    let dataset1 = []
    let dataset2 = []
    const currency1 = symbols[0]
    const currency2 = symbols[1]

    const endDate = new Date()
    const startDate = new Date()
    startDate.setFullYear(endDate.getFullYear() - 2)
    while (startDate <= endDate) {
        const current = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
        if (current in data) {
            labels.push(current)
            dataset1.push(isReversed ? 1/data[current][currency1] : data[current][currency1])
            dataset2.push(isReversed ? 1/data[current][currency2] : data[current][currency2])
        }

        startDate.setDate(startDate.getDate() + 1);
    }
    
    formatted_data['labels'] = labels
    formatted_data['datasets'] = [
        {
            'id': 1,
            'label': currency1,
            'data': dataset1,
            'borderColor': 'rgb(255, 99, 132)',
            'backgroundColor': 'rgba(255, 99, 132, 0.5)',
            'pointRadius': 0,
        },
        {
            'id': 2,
            'label': currency2,
            'data': dataset2,
            'borderColor': 'rgb(54, 162, 235)',
            'backgroundColor': 'rgba(54, 162, 235, 0.5)',
            'pointRadius': 0,
        }
    ]

    return formatted_data
}
// {date: {target: rate}, ...}
export function response_parse_table(data, base, isReversed){
    let formatted_data = []

    Object.entries(data).map(([date, rates]) => {
        Object.entries(rates).map(([target, rate]) => {
            formatted_data.push({base: base, target: target, date: date, rate: isReversed ? (1 / rate).toFixed(5) : rate})
        })
    })

    return formatted_data
}
