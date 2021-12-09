import {
    CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

export default function ChartLine(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
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
                label: 'Fluxo de pessoas',
                data: props.analytics.values,
                borderColor: 'rgba(0, 24, 255)',
                backgroundColor: 'rgba(0, 24, 255)',
            },
        ],
    };


    return (
        <Line options={options} data={data} />
    );
};