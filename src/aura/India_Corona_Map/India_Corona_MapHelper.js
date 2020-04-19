({
    fetchData : function(component, endpoint, variable){
        return new Promise((resolve, reject) => {
            fetch(endpoint)
            .then(response => {
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    todaysCasesDonut : function (component, todaysCases){
        const chartData = {
            labels: ['Confirmed', 'Deceased', 'Recovered'],
            datasets: [{
                          label: "Daily Cases",
                          backgroundColor: ["#8B0000", "#FF4500","#006400"],
                          data: [todaysCases.dailyconfirmed, todaysCases.dailydeceased, todaysCases.dailyrecovered]
                        }]
        };
        const chartOptions = {
            title: {
                display: true,
                text: 'Todays cases in India'
            },
            animation: {
                duration: 2000
            }
        }
        this.generateChart(component, 'dailyCount', chartData, 'doughnut', chartOptions);
    },
    overallCasesDonut : function (component, overallCases){
        const chartData = {
            labels: ['Confirmed', 'Deceased', 'Recovered'],
            datasets: [{
                          label: "Till Date Cases",
                          backgroundColor: ["#8B0000", "#FF4500","#006400"],
                          data: [overallCases.totalconfirmed, overallCases.totaldeceased, overallCases.totalrecovered]
                        }]
        };
        const chartOptions = {
            title: {
                display: true,
                text: 'Till date cases in India'
            },
            animation: {
                duration: 2000
            }
        }
        this.generateChart(component, 'overallCount', chartData, 'doughnut', chartOptions);
    },
    historicalPerDayCount : function (component, lastFiveDaysData){
        let labels = [];
        let confirmedData = [];
        let deseasedData = [];
        let recoveredData = [];
        lastFiveDaysData.forEach(info => {
            labels = [...labels, info.date];
            confirmedData = [...confirmedData, info.dailyconfirmed];
            deseasedData = [...deseasedData, info.dailydeceased];
            recoveredData = [...recoveredData, info.dailyrecovered];
        });
            
        const chartData = {
            labels,
            datasets: [{
                    label: "Confirmed",
                    backgroundColor: "#8B0000",
                    data:confirmedData
                },{
                    label: "Deceased",
                    backgroundColor: "#FF4500",
                    data: deseasedData
                },{
                    label: "Recovered",
                    backgroundColor: "#006400",
                    data: recoveredData
                }]
            };
        const chartOptions = {
            title: {
                display: true,
                text: 'Per day cases for last 5 days'
            },
            animation: {
                duration: 2000
            }
        }
        this.generateChart(component, 'historicalPerDayCount', chartData, 'bar', chartOptions);
    },
    stateWiseCount : function (component, lastFiveDaysData){
        let labels = [];
        let data = [];
        let backgroundColor = [];
        const selectedState = component.get("v.selectedState");
        const districtInfo = component.get("v.stateData");
        const selectedStateDistrictInfo = districtInfo[selectedState];
        selectedStateDistrictInfo.forEach(dist => {
            labels = [...labels, dist.district];
            data = [...data, dist.confirmed];
            backgroundColor = [...backgroundColor, '#'+(Math.random()*0xFFFFFF<<0).toString(16)];
        })
            
        const chartData = {
            labels,
            datasets: [{
                label: "Districts",
                backgroundColor,
                data
            }]
        }
        const chartOptions = {
            title: {
                display: true,
                text: "Districts level confirmed cases for "+selectedState+" state"
            },
            animation: {
                duration: 2000
            }
        }
        this.generateChart(component, 'stateCount', chartData, 'bar', chartOptions);
    },
    historicalTotalCount : function (component, lastFiveDaysData){
        let labels = [];
        let confirmedData = [];
        let deseasedData = [];
        let recoveredData = [];
        lastFiveDaysData.forEach(info => {
            labels = [...labels, info.date];
            confirmedData = [...confirmedData, info.totalconfirmed];
            deseasedData = [...deseasedData, info.totaldeceased];
            recoveredData = [...recoveredData, info.totalrecovered];
        });
            
        const chartData = {
            labels,
            datasets: [{
                    label: "Confirmed",
                    backgroundColor: "#8B0000",
                    data:confirmedData
                },{
                    label: "Deceased",
                    backgroundColor: "#FF4500",
                    data: deseasedData
                },{
                    label: "Recovered",
                    backgroundColor: "#006400",
                    data: recoveredData
                }]
            };
        const chartOptions = {
            title: {
                display: true,
                text: 'Overall cases for last 5 days'
            },
            animation: {
                duration: 2000
            }
        }
        this.generateChart(component, 'historicalTotalCount', chartData, 'bar', chartOptions);
    },
	generateChart : function(component, chartId, chartData, chartType, chartOptions) {
        var ctx = component.find(chartId).getElement();
        ctx.height = 250;
        if(chartId == 'stateCount' && component.get("v.stateChartInstance") != null)
            component.get("v.stateChartInstance").destroy();
        var lineChart = new Chart(ctx ,{
            type: chartType,
            data: chartData,
            options: chartOptions
        });
        if(chartId == 'stateCount')
            component.set("v.stateChartInstance", lineChart);
	}
})