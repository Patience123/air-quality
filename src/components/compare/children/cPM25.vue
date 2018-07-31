<template>
    <div id="cPM25">
        <div id="comparePM25" :style="{width: '1200px', height: '500px', margin: '20px auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'

export default {
    name: 'cPM25',
    data() {
        return {
            cityOne: "北京",
            cityTwo: "杭州",
            pm25OneAvg: "",
            pm25TwoAvg: "",
            dateStart: '2018-05-01',
            dateEnd: '2018-05-31',
            dateData1: [],
            dateData2: []
        }
    },
    created () {
        this.fetchCity1Data(this.cityOne, this.dateStart, this.dateEnd, 2);
        this.fetchCity2Data(this.cityTwo, this.dateStart, this.dateEnd, 2);
    },
    mounted() {
        // this.drawLine();
        // this.changeCharts();
    },
    methods: {
        // changeCharts () {
        //     window.addEventListener('resize', () => {
        //         // this.myChart.resize();
        //         console.log("resize");
        //     });
        // },
        fetchCity1Data (city, dateStart, dateEnd, type) {
            axios.post({
                url: 'airtrend',
                data: {
                    city: city,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    type: type
                }
            }).then(response => {
                this.dateData1 = [];
                // console.log(this.dateData1);
                response.airtrendlist.forEach((item) => {
                    this.dateData1.push([item.date, item.points]);
                });
                this.pm25OneAvg = response.avg;
                this.cityOne = response.city;
                this.drawLine();
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        fetchCity2Data (city, dateStart, dateEnd, type) {
            axios.post({
                url: 'airtrend',
                data: {
                    city: city,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    type: type
                }
            }).then(response => {
                this.dateData2 = [];
                // console.log(this.dateData2);
                response.airtrendlist.forEach((item) => {
                    this.dateData2.push([item.date, item.points]);
                });
                this.pm25TwoAvg = response.avg;
                this.cityTwo = response.city;
                this.drawLine();
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        drawLine() {
            let myChart = this.$echarts.init(document.getElementById('comparePM25'))
            let option = {
                title: {
                    text: `${this.cityOne} VS ${this.cityTwo} PM2.5变化趋势`,
                    subtext: `平均PM2.5 ${this.cityOne}:${this.pm25OneAvg} ${this.cityTwo}:${this.pm25TwoAvg}`,
                    x: 'center',
                    textStyle: {
                        fontSize: 24
                    },
                    subtextStyle: {
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:[this.cityOne, this.cityTwo],
                    left: 10,
                    top: 20
                },
                grid: {
                    y: 100,
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.dateData1.map(item => {
                        return item[0];
                    })
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: this.cityOne,
                        type:'line',
                        data: this.dateData1.map(item => {
                            return item[1];
                        }),
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    },
                    {
                        name: this.cityTwo,
                        type:'line',
                        data: this.dateData2.map(item => {
                            return item[1];
                        }),
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
  
}
</script>

<style scoped>
#cPM25 {
    position: relative;
}
.title {
    width: 300px;
    /*margin: 0 33%*/;
    margin: 0 auto;
    font-family: "Hiragino Sans GB";
    padding-top: 10px;
    padding-bottom: 10px;
}
.title-top {
    font-size: 24px
}
.title-bottom {
    font-size: 16px;
    color: #9ea7b4;
}
</style>