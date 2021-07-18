var chart = document.querySelector('#chartline')
if (chart) {
var options = {
    series: [{
        name: 'BIRTH',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
    }, {
        name: 'MARRIAGE',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: ['Jan', 'Febr', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Oct ',
        'Nov', 'Dec'
    ],
    markers: {
        size: 0
    },
    yaxis: [{
            title: {
                text: 'Registries',
            },
        },
        {
            opposite: true,
            title: {
                text: 'Registries',
            },
        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function(y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    }
};
var chart = new ApexCharts(chart, options);
chart.render();
}