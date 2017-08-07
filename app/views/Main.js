import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Doughnut, Line as Line_ } from 'react-chartjs-2';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
const SimpleLineChart = React.createClass({
    render() {
        return (
            <LineChart width={600} height={300} data={data}
                margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        );
    }
})

const ddata = {
    labels: [
        'Canceled',
        'Pending Approval',
        'Signed Off'
    ],
    datasets: [{
        data: [30, 40, 50],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#1ab394'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#1ab394'
        ]
    }]
};


const ldata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Needed',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: 'Source Capasity',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,40,0,1)',
            borderColor: 'rgba(255,40,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [60, 60, 60, 60, 60, 60, 60]
        }
    ]
};

class Main extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content animated">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                KoçSistem Management Portal
                            </h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">

                                <div className="ibox float-e-margins">
                                    <div className="text-center m-t-lg">
                                        <h2>Projects Status</h2>
                                    </div>
                                    <div className="ibox-content">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Project Name</th>
                                                    <th>Time Status</th>
                                                    <th>Budged Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Akbank Face</td>
                                                    <td><span className="label label-danger">Critic</span></td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Akbank Integro</td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                    <td><span className="label label-danger">Critic</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Akbank MCA</td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Akbank Integro</td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                    <td><span className="label label-danger">Critic</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Akbank MCA</td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                    <td><span className="label label-primary">Ok</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="ibox float-e-margins">
                                    <div className="text-center m-t-lg">
                                        <h2>Active Projects</h2>
                                    </div>
                                    <div className="ibox-content">
                                        <Doughnut data={ddata} />
                                    </div>
                                </div></div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="ibox float-e-margins">
                                    <div className="text-center m-t-lg">
                                        <h2>Source & Capacity</h2>
                                    </div>
                                    <div className="ibox-content">
                                        <Line_ data={ldata} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default Main