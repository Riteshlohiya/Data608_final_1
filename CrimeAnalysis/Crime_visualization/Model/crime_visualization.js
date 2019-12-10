window.onload = function () {
    var chartArea = $('.chartsArea'),
        homeScreen = $('.home'),
        chartContainer = $('#chartContainer'),
        chartContainer1 = $('#chartContainer_1'),
        chartContainer2 = $('#chartContainer_2'),
        chartContainer3 = $('#chartContainer_3'),
        chartContainer4 = $('#chartContainer_4'),
        chartContainer5 = $('#chartContainer_5'),
        chartContainer6 = $('#chartContainer_6'),
        chartContainer7 = $('#chartContainer_7'),
        mainContainer = $('.mainContainer');

   
    mainContainer.show();

    $('.chartsArea>div').hide();
    $('.home').on('click', function () {
        $('.chartsArea>div').hide();
       
        mainContainer.show();

    });
    $('.chartSelector').on('click', function () {
        $('.chartsArea>div').hide();
       
        mainContainer.hide();
        chartContainer.show();
        newWidget.fetchdata.fetchPrimaryData();

    });
    $('.chartSelector_1').on('click', function () {
        $('.chartsArea>div').hide();
      
        mainContainer.hide();
        chartContainer1.show();
        newWidget.fetchdata.fetchdayData();

    })
    $('.chartSelector_2').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer2.show();

        if ($('#chartContainer_2 svg').length < 1) {
            newWidget.d3lineChart();
        }
       

    })
    $('.chartSelector_3').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer3.show();
         if ($('#chartContainer_3 svg').length < 1) {
           newWidget.d3PieChart.d3PieChartData();
        }
        

    })
    $('.chartSelector_4').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer4.show();
        if ($('#chartContainer_4 svg').length < 1) {
            newWidget.d3StackedBarChart.fetchStackedBarData();
        }
       

    })
    $('.chartSelector_5').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer5.show();
        newWidget.fetchdata.fetchLocationdata();

    })
    $('.chartSelector_6').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer6.show();
        if ($('#chartContainer_6 svg').length < 1) {
            newWidget.d3SimpleBarChart.fetchBarData();
        }
      

    })
    $('.chartSelector_7').on('click', function () {
        $('.chartsArea>div').hide();
        mainContainer.hide();
        chartContainer7.show();
        newWidget.fetchdata.fetchYeardata();

    })

   


    // this.newWidget.init();
};

var dataSeries1, dataSeries2,
    am_datapoints = [],
    pm_datapoints = [],
    title = "Domestic Crime Rate";
title2 = "Non Domestic Crime Rate";

newWidget = {
    fetchdata: {
        fetchPrimaryData: function () {
            fetch('https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/am_pm.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // Work with JSON data here
                    
                    newWidget.filterDataForFields(data);
                    newWidget.chartsrender.chart1();

                    return data;
                })
                .catch(err => {
                    // Do something for an error here
                    console.log(err);
                })
        },
        fetchdayData: function () {

            fetch('https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/day.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // Work with JSON data here
                    
                    newWidget.filterDayDataForFields(data);
                    newWidget.chartsrender.chart2(data);

                    return data;
                })
                .catch(err => {
                    // Do something for an error here
                    console.log(err);
                })

        },
        fetchLocationdata: function () {

            fetch('https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/location.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // Work with JSON data here
                    newWidget.filterLocationDataForField(data);
                    newWidget.chartsrender.chart4(data);
                    return data;
                })
                .catch(err => {
                    // Do something for an error here
                    console.log(err);
                })

        },
        fetchYeardata: function () {
            fetch('https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/year.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // Work with JSON data here
                    newWidget.filterYearForFields(data);
                    newWidget.chartsrender.chart3();

                    return data;
                })
                .catch(err => {
                    // Do something for an error here
                    console.log(err);
                })

        }

    },
    chartsrender: {
        chart1: function (result) {
           
            var chart1 = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light1",
                title: {
                    text: "Crimes by AM and PM"
                },
                axisY: {
                    // valueFormatString:,
                    title: "Number of crimes",
                    titleFontSize: 24
                },
                axisX: {
                    title: 'Years',
                    titleFontSize: 24,
                    ValueFormatString: "YYYY"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    fontSize: 18
                },
                data: [{
                    type: "spline",
                    showInLegend: true,
                    name: 'AM crimes',
                    dataPoints: am_datapoints
                },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: 'PM crimes',
                        dataPoints: pm_datapoints
                    }]
            });
            chart1.render();

        },
        chart2: function () {
            var chart2 = new CanvasJS.Chart("chartContainer_1", {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light1",
                title: {
                    text: "Crimes by weekdays and weekends"
                },
                axisY: {
                    // valueFormatString:,
                    title: "Number of crimes",
                    titleFontSize: 24,
                    xValueFormatString: "Year ####"
                },
                axisX: {
                    title: 'Years',
                    titleFontSize: 24,
                    xValueFormatString: "Year ####"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    fontSize: 18
                },
                data: [{
                    type: "stackedArea",
                    showInLegend: true,
                    name: 'Weekdays',
                    dataPoints: arrest_datapoints
                },
                    {
                        type: "stackedArea",
                        showInLegend: true,
                        name: 'Weekends',
                        dataPoints: nonarrest_datapoints
                    }]
            });

            chart2.render();
        },
        chart3: function () {
            var chart3 = new CanvasJS.Chart("chartContainer_7", {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light1",
                title: {
                    text: "Total crimes by year"
                },
                axisY: {
                    // valueFormatString:,
                    title: "Number of crimes",
                    titleFontSize: 24,
                    xValueFormatString: "Year ####"
                },
                axisX: {
                    title: 'Years',
                    titleFontSize: 24,
                    xValueFormatString: "Year ####"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    fontSize: 18
                },
                data: [{
                    type: "bar",
                    showInLegend: true,
                    name: 'Total crimes in a year',
                    dataPoints: crimenum_datapoints
                }]
            });

            chart3.render();
        },
        chart4: function () {
            var chart4 = new CanvasJS.Chart("chartContainer_5", {
                animationEnabled: true,
                height: 800,
                title: {
                    text: "Crimes by location"
                },
                axisX: {
                    title: 'Years',
                    titleFontSize: 24,
                    ValueFormatString: "YYYY"
                },
                legend: {
                    fontSize: 12
                    // left, center ,right 
                    // verticalAlign: "center",  // top, center, bottom
                },
                axisY: {
                    title: "No of Crimes" 
                },
                data: dataRequired

            });
            chart4.render();
        }

    },
    filterDataForFields: function (data) {
        am_datapoints = [],
            pm_datapoints = []
        for (var i = 0; i < data.length; i++) {

            am_datapoints.push({
                label: data[i].year,
                y: parseInt(data[i].am)
            });
            pm_datapoints.push({
                label: data[i].year,
                y: parseInt(data[i].pm)
            });

        }
    },
    filterDayDataForFields: function (data) {
        arrest_datapoints = [], nonarrest_datapoints = [];
        for (var i = 0; i < data.length; i++) {

            arrest_datapoints.push({
                label: data[i].year,
                y: parseInt(data[i].weekday)
            });
            nonarrest_datapoints.push({
                label: data[i].year,
                y: parseInt(data[i].weekend)
            });

        }
    },
    filterYearForFields: function (data) {
        crimenum_datapoints = [];
        for (var i = 0; i < data.length; i++) {

            crimenum_datapoints.push({
                label: data[i].year,
                y: parseInt(data[i].no_of_crimes)
            });

        }
    },
    filterLocationDataForField: function (data) {
        var _keys = Object.keys(data[0]);
        dataRequired = [];
        var tempObj = {};
        for (var i = 1; i < data.length; i++) {
            tempObj.type = "scatter";
            tempObj.name = data[i].location;
            tempObj.toolTipContent = "location : " + data[i].location + "<br>" + "no: {y}";
            tempObj.animationEnabled = true;
            tempObj.animationDuration = 3000;
            tempObj.showInLegend = true;
            tempObj.dataPoints = [{label: "2012", y: +data[i][2012]}, {
                label: "2013",
                y: +data[i][2013]
            }, {label: "2014", y: +data[i][2014]}, {label: "2015", y: +data[i][2015]}, {
                label: "2016",
                y: +data[i][2016]
            }];
            dataRequired.push(tempObj);
            tempObj = {};
        }


    },
    d3lineChart: function () {

        var margin = {top: 20, right: 200, bottom: 30, left: 100},
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // parse the date / time
        var parseTime = d3.timeParse("%Y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the line
        var valueline = d3.line()
            .x(function (d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.arrest);
            });
        // define the line
        var valueline2 = d3.line()
            .x(function (d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.not_arrest);
            });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#chartContainer_2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        function draw(data) {

            // format the data
            data.forEach(function (d) {
                d.year = parseTime(d.year);
                d.arrest = +d.arrest;
                d.not_arrest = +d.not_arrest;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));
            y.domain([0, d3.max(data, function (d) {
                return Math.max(d.arrest, d.not_arrest);
            })]);

            var g = svg.append("g")
                .attr("transform", "translate(10, 0)");

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);
            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line2")
                .attr("d", valueline2);
            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            //chart title
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top / 2) + 15)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("Arrested and Not Arrested");
            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            g.selectAll("circle").data(data).enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.year) - 12;
                })
                .attr("cy", function (d) {
                    return y(d.arrest)
                })

                .attr("r", function (d, i) {
                    return 10;
                })
                .style("fill", "#fcb0b5")
                .on("mouseover", function (d) {

                    d3.select(this).transition().duration(200).style("fill", "#d30715");

                    g.selectAll("#tooltip").data([d]).enter().append("text")
                        .attr("id", "tooltip")
                        .text(function (d, i) {
                            return d.arrest + ' ' + '-' + ' ' + 'Arrested';
                        })
                        .attr("y", function (d) {
                            return y(d.arrest)
                        })
                        .attr("x", function (d) {
                            return x(d.year);
                        })

                    g.selectAll("#tooltip_path").data([d]).enter().append("line")
                        .attr("id", "tooltip_path")
                        .attr("x1", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("x2", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("y1", height)
                        .attr("y2", function (d) {
                            return y(d.arrest)
                        })
                        .attr("stroke", "black")
                        .style("stroke-dasharray", ("3, 3"));
                })
                .on("mouseout", function (d) {
                    d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

                    g.selectAll("#tooltip").remove();
                    g.selectAll("#tooltip_path").remove();
                });

            g.selectAll("circle1").data(data).enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.year) - 12;
                })
                .attr("cy", function (d) {
                    return y(d.not_arrest)
                })
                .attr("r", function (d, i) {
                    return 10;
                })
                .style("fill", "#fcb0b5")
                .on("mouseover", function (d) {

                    d3.select(this).transition().duration(200).style("fill", "#d30715");

                    g.selectAll("#tooltip").data([d]).enter().append("text")
                        .attr("id", "tooltip")
                        .text(function (d, i) {
                            return (d.not_arrest + ' ' + '-' + ' ' + ' Not Arrested');
                        })
                        .attr("y", function (d) {
                            return y(d.not_arrest)
                        })
                        .attr("x", function (d) {
                            return x(d.year);
                        })

                    g.selectAll("#tooltip_path").data([d]).enter().append("line")
                        .attr("id", "tooltip_path")
                        .attr("x1", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("x2", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("y1", height)
                        .attr("y2", function (d) {
                            return y(d.not_arrest)
                        })
                        .attr("stroke", "black")
                        .style("stroke-dasharray", ("3, 3"));
                })
                .on("mouseout", function (d) {
                    d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

                    g.selectAll("#tooltip").remove();
                    g.selectAll("#tooltip_path").remove();
                });

        }

        // Get the data
        d3.json("https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/arr.json", function (error, data) {
            if (error) throw error;

            // trigger render
            draw(data);
        });


    },
    d3PieChart: {
		d3PieChartData: function () {
            var margin = {top: 20, right: 200, bottom: 30, left: 100},
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // parse the date / time
        var parseTime = d3.timeParse("%Y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the line
        var valueline = d3.line()
            .x(function (d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.domestic);
            });
        // define the line
        var valueline2 = d3.line()
            .x(function (d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.non_domestic);
            });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#chartContainer_3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        function draw(data) {

            // format the data
            data.forEach(function (d) {
                d.year = parseTime(d.year);
                d.domestic = +d.domestic;
                d.non_domestic = +d.non_domestic;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return d.year;
            }));
            y.domain([0, d3.max(data, function (d) {
                return Math.max(d.domestic, d.non_domestic);
            })]);

            var g = svg.append("g")
                .attr("transform", "translate(10, 0)");

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);
            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line2")
                .attr("d", valueline2);
            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            //chart title
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top / 2) + 15)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("Domestic and Non Domestic Crimes");
            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            g.selectAll("circle").data(data).enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.year) - 12;
                })
                .attr("cy", function (d) {
                    return y(d.domestic)
                })

                .attr("r", function (d, i) {
                    return 10;
                })
                .style("fill", "#fcb0b5")
                .on("mouseover", function (d) {

                    d3.select(this).transition().duration(200).style("fill", "#d30715");

                    g.selectAll("#tooltip").data([d]).enter().append("text")
                        .attr("id", "tooltip")
                        .text(function (d, i) {
                            return d.domestic + ' ' + '-' + ' ' + 'Domestic';
                        })
                        .attr("y", function (d) {
                            return y(d.domestic)
                        })
                        .attr("x", function (d) {
                            return x(d.year);
                        })

                    g.selectAll("#tooltip_path").data([d]).enter().append("line")
                        .attr("id", "tooltip_path")
                        .attr("x1", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("x2", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("y1", height)
                        .attr("y2", function (d) {
                            return y(d.domestic)
                        })
                        .attr("stroke", "black")
                        .style("stroke-dasharray", ("3, 3"));
                })
                .on("mouseout", function (d) {
                    d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

                    g.selectAll("#tooltip").remove();
                    g.selectAll("#tooltip_path").remove();
                });

            g.selectAll("circle1").data(data).enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.year) - 12;
                })
                .attr("cy", function (d) {
                    return y(+d.non_domestic)
                })
                .attr("r", function (d, i) {
                    return 10;
                })
                .style("fill", "#fcb0b5")
                .on("mouseover", function (d) {

                    d3.select(this).transition().duration(200).style("fill", "#d30715");

                    g.selectAll("#tooltip").data([d]).enter().append("text")
                        .attr("id", "tooltip")
                        .text(function (d, i) {
                            return (d.non_domestic + ' ' + '-' + ' ' + ' Non Domestic');
                        })
                        .attr("y", function (d) {
                            return y(d.non_domestic)
                        })
                        .attr("x", function (d) {
                            return x(d.year);
                        })

                    g.selectAll("#tooltip_path").data([d]).enter().append("line")
                        .attr("id", "tooltip_path")
                        .attr("x1", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("x2", function (d) {
                            return x(d.year) - 10
                        })
                        .attr("y1", height)
                        .attr("y2", function (d) {
                            return y(d.non_domestic)
                        })
                        .attr("stroke", "black")
                        .style("stroke-dasharray", ("3, 3"));
                })
                .on("mouseout", function (d) {
                    d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

                    g.selectAll("#tooltip").remove();
                    g.selectAll("#tooltip_path").remove();
                });

        }

        // Get the data
        d3.json("https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/dom.json", function (error, data) {
            if (error) throw error;

            // trigger render
            draw(data);
        });
        }
        
		
    },

    d3StackedBarChart: {
        fetchStackedBarData: function () {
            var _keys, tempObj = {}, processData = [];
            //fetch and process data 
            d3.json("https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/primary_by_year.json	", function (error, data) {
                if (error) throw error;
                //find out keys 
                _keys = Object.keys(data[0]);
                //fetch data required to draw graph
                for (var i = 1; i < 6; i++) {
                    for (var j = 0; j < _keys.length; j++) {
                        tempObj[_keys[j]] = +data[i][_keys[j]];
                    }
                    processData.push(tempObj);
                    tempObj = {};
                }
                draw(processData);

                //drawing graph
                function draw(data) {
                    //initializing
                    var margin = {top: 20, right: 100, bottom: 30, left: 100};
                    width = 960 - margin.left - margin.right,
                        height = 700 - margin.top - margin.bottom,
                        tooltip = d3.select("body").append("div").attr("class", "toolTip"),
                        svg = d3.select("#chartContainer_4").append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom);
                    //chart title
                    svg.append("text")
                        .attr("x", (width / 2))
                        .attr("y", 0 - (margin.top / 2) + 50)
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Crimes by types");
                    g = svg.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    x = d3.scaleBand()
                        .rangeRound([0, width - 250])
                        .paddingInner(0.05).align(0.1),
                        y = d3.scaleLinear().domain([0, 6.5e8]).range([height, 0]);
                        z = d3.scaleOrdinal()
                            .range(["#800000", "#ff6600", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]),
                        keys = [];


                    for (key in data[0]) {
                        if (key != "year" && key != "total")
                            keys.push(key);
                    }

                    data.forEach(function (d) {
                        d.total = 0;
                        keys.forEach(function (k) {
                            d.total += d[k];
                        })
                    });

                    /*data.sort(function (a, b) {
                        return b.total - a.total;
                    });*/
                    x.domain(data.map(function (d) {
                        return d.year;
                    }));
                    y.domain([0, d3.max(data, function (d) {
                        return d.total;
                    })]).nice();
                    z.domain(keys);


                    g.append("g")
                        .selectAll("g")
                        .data(d3.stack().keys(keys)(data))
                        .enter().append("g")
                        .attr("fill", function (d) {
                            return z(d.key);
                        })
                        .selectAll("rect")
                        .data(function (d) {
                            return d;
                        })
                        .enter().append("rect")
                        .attr("x", function (d) {
                            return x(d.data.year);
                        })
                        .attr("y", function (d) {
                            return y(d[1]);
                        })
                        .attr("height", function (d) {
                            return y(d[0]) - y(d[1]);
                        })
                        .attr("width", x.bandwidth() - 10)
                        .on("mousemove", function (d) {
                            var subgroupName = d3.select(this.parentNode).datum().key;
                            var subgroupValue = d.data[subgroupName];
                            tooltip
                                .style("left", d3.event.pageX - 50 + "px")
                                .style("top", d3.event.pageY - 70 + "px")
                                .style("display", "inline-block")
                                .html((subgroupName + ":" + subgroupValue));

                        })
                        .on("mouseout", function (d, i) {
                            tooltip.style("display", "none");

                        });
                    // x axis
                    g.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));
                    //y axis
                    g.append("g")
                        .attr("class", "axis")
                        .call(d3.axisLeft(y).ticks(null, "m"))
						.call(d3.axisLeft(y).ticks(20))
                        .append("text")
                        .attr("x", 2)
                        .attr("y", y(y.ticks().pop()) + 0.5)
                        .attr("fill", "#000")
                        .attr("font-weight", "bold")
                        .attr("text-anchor", "start");
                    //legends 
                    var legend = g.append("g")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .attr("text-anchor", "end")
                        .selectAll("g")
                        .style('margin-left', '30px')
                        .data(keys.slice().reverse())
                        .enter().append("g")
                        .attr("transform", function (d, i) {
                            return "translate(0," + i * 20 + ")";
                        });
                    //legends rectangle
                    legend.append("rect")
                        .attr("x", width - 19)
                        .attr("width", 19)
                        .attr("height", 19)
                        .attr("fill", z);
                    //legend text
                    legend.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9.5)
                        .attr("dy", "0.32em")
                        .attr("width", 30)
                        .attr("height", 30)
                        .text(function (d) {
                            return d;
                        });
                }
            });
        }
    },
    d3SimpleBarChart: {
        fetchBarData: function () {
            var processData = [];
            //fetch and process data 
            d3.json("https://raw.githubusercontent.com/Riteshlohiya/Data608_Project_Chicago_Crimes/master/CrimeAnalysis/Crime_visualization/Schema/total_month.json", function (error, data) {
                if (error) throw error;

                for (var i = 0; i < data.length; i++) {
                    processData.push({
                        "label": data[i].months,
                        "value": +data[i].Total,
                        "2012": +data[i]["2012"],
                        "2013": +data[i]["2013"],
                        "2014": +data[i]["2014"],
                        "2015": +data[i]["2015"],
                        "2016": +data[i]["2016"]
                    });
                }
                draw(processData);


                //draw graph with process data

                function draw(data) {
                    var tooltip = d3.select("body").append("div").attr("class", "toolTip"),
                        margin = {top: 20, right: 100, bottom: 30, left: 100};
                    width = 960 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom,
                        tooltip = d3.select("body").append("div").attr("class", "toolTip"),
                        svg = d3.select("#chartContainer_6").append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom),
                        xScale = d3.scaleBand().range([0, width]).padding(0.4),
                        yScale = d3.scaleLinear().range([height, 0]),
                        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    //chart title
                    svg.append("text")
                        .attr("x", (width / 2))
                        .attr("y", 0 - (margin.top / 2) + 25)
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Crimes by months");
                    xScale.domain(data.map(function (d) {
                        return d.label;
                    }));
                    yScale.domain([0, d3.max(data, function (d) {
                        return d.value;
                    })]);

                    g.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(xScale));

                    g.append("g")
                        .call(d3.axisLeft(yScale).tickFormat(function (d) {
                            return d;
                        }).ticks(10));


                    g.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function (d) {
                            return xScale(d.label);
                        })
                        .attr("y", function (d) {
                            return yScale(d.value);
                        })
                        .attr("width", xScale.bandwidth())
                        .attr("height", function (d) {
                            return height - yScale(d.value);
                        })
                        .on("mousemove", function (d) {
                            tooltip
                                .style("left", d3.event.pageX - 50 + "px")
                                .style("top", d3.event.pageY - 70 + "px")
                                .style("display", "inline-block")
                                .html(("2012 :" + d[2012]) + "<br>" + "2013 :" + (d[2013]) + "<br>" + "2014 :" + (d[2014]) + "<br>" + "2015 :" + (d[2015]) + "<br>" + "2016 :" + (d[2016]));
                            d3.select(this)
                                .style("fill", "#001a33");
                        })
                        .on("mouseout", function (d, i) {
                            tooltip.style("display", "none");
                            d3.select(this)
                                .style("fill", "steelblue");
                        });
                }
            });
        }
    }
}



