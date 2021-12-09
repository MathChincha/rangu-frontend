import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function ChartPie(props) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    ChartJS.defaults.color = "#fff"

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 10
                    }
                }
            },
            title: {
                display: true,
                text: 'Pratos mais pedidos',
            }
        },
    };
    const data = {
        labels: props.analytics.labels,
        datasets: [
            {
                data: props.analytics.values,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ],
    };


    return (
        <Pie options={options} data={data} />
    );
};