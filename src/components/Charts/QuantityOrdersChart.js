import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function NumberOrdersChart(props) {
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    ChartJS.defaults.color = "#fff"

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 10
                    }
                }
            },
        },
    };

    
    const data = {
        labels: props.analytics.labels,
        datasets: [
            {
                label: 'Quantidades de pratos Pedidos',
                data: props.analytics.values,
                borderColor: 'rgba(0, 24, 255)',
                backgroundColor: 'rgba(0, 24, 255)',
            },
        ],
    };


    return (
        <Bar options={options} data={data} />
    );
};
