import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import faker from 'faker';
import React from "react";
import { Line } from 'react-chartjs-2';

function ChartLine() { //TODO passar labels e values apos pegar pela API

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

    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Fluxo de pessoas',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgba(0, 24, 255)',
                backgroundColor: 'rgba(0, 24, 255)',
            },
        ],
    };


    return (
        <Line options={options} data={data} />
    );
};

export default ChartLine;