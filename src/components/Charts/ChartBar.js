import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import faker from 'faker';
import React from "react";
import { Bar } from 'react-chartjs-2';

function ChartBar() { //TODO passar labels e values apos pegar pela API

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

    const labels = ['Arroz', 'Feijao', 'Salada', 'Macarrao'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Pratos mais pedidos',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgba(0, 24, 255)',
                backgroundColor: 'rgba(0, 24, 255)',
            },
        ],
    };


    return (
        <Bar options={options} data={data} />
    );
};

export default ChartBar;