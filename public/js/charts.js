var skillMap=function(obj){
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: "skillSetMap",
			plotBackgroundColor:"white",
			backgroundColor:"transparent",
			type: 'line',
			marginRight: 25,
			marginTop: 55,
			marginBottom: 50,
		},
		title: {
			text: '',
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: obj.categories,
			lineWidth: 2
		},
		yAxis: {
			lineWidth: 2,
			gridLineWidth: 2,
			lineColor: '#dbe0e6',
			gridLineColor:'#dbe0e6',
			gridLineDashStyle: 'dash',
			title:''
		},
		legend: {
			layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
			itemDistance: 60,
			lineHeight: 14,
			useHTML: true
		},
		plotOptions: {
			series: {
				shadow: false,
				states: {
					hover: {
						lineWidth: 2
					}
				},
				marker: {
					enabled: true,
					symbol: 'circle',
					radius: 6,
					lineWidth: 2,
                    lineColor: '#fff',
					states: {
						hover: {
							enabled: false,
						}
					}
				}
            }
		},
		tooltip: {
			
		},
		series: obj.series,
		credits:{
			enabled: false
		},
		exporting: {
			enabled: false
		}
	});
};

var progressMap=function(obj){
	
	var chart = new Highcharts.Chart({
	    chart: {
            renderTo: "menteesProgressMap",
			plotBackgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                stops: [
                    [0, 'rgb(4, 42, 80)'],
                    [1, 'rgb(32, 193, 241)']
                ]
            },
			marginRight: 0,
			type: 'bubble',
			borderRadius: 5
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: obj.categories,
            gridLineWidth: 1,
            gridLineDashStyle: 'Dash',
            lineWidth: 0
        },
       	yAxis: {
       		lineWidth: 0,
       		title: {
	            text: ''
	        },
			min: 1,
			max: 24,
			gridLineWidth: 1,
            gridLineDashStyle: 'Dash',

			startOnTick: false,
			endOnTick: false,
			labels: {
				useHTML: true,
                formatter: function () {
                    return this.value + '<img src="/css/images/king_16x16.png" />';
                }
            }
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    useHTML: true,
				    formatter : function(){
				    	return '<a href="/' + this.point.name + '"><img class="mentees-icon" src="/users/' + this.point.name + '.png" /></a>'  ; 
				    },
                }
            }
        },

        series: obj.series,
        credits:{
			enabled: false
		},
		exporting: {
			enabled: false
		}

	});
};


