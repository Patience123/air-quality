<template>
    <div id="v_PM25">
        <div id="PM25TimeLineChart" :style="{width: '100%', height: '500px', margin:'0 auto'}"></div>
        <div id="PM25TimePieChart" :style="{width: '1000px', height: '500px', margin:'50px auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'
export default {
    name: 'v_PM25',
    data() {
        return {
            dates: [],
            max: "",
            min: "",
            avg: "",
            cityName: "",
            levelList: []
        }
    },
    created () {
        this.fetchData("北京", "2018-05-01", "2018-05-30", 2);
    },
    methods: {
        drawLinePM25(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('PM25TimeLineChart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `${this.cityName}PM2.5变化趋势`,
                    subtext: `最大值：${this.max}    最小值：${this.min}    平均值：${this.avg}`,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    data: this.dates.map(function (item) {
                        return item[0];
                    })
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                toolbox: {
                    left: 'left',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: this.dates[0][0]
                }, {
                    type: 'inside'
                }],
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 35,
                        color: '#096'
                    }, {
                        gt: 35,
                        lte: 75,
                        color: '#ffde33'
                    }, {
                        gt: 75,
                        lte: 115,
                        color: '#ff9933'
                    }, {
                        gt: 115,
                        lte: 150,
                        color: '#cc0033'
                    }, {
                        gt: 150,
                        lte: 250,
                        color: '#660099'
                    }, {
                        gt: 250,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: [{
                    name: `${this.cityName} PM2.5`,
                    type: 'line',
                    data: this.dates.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 35
                        }, {
                            yAxis: 75
                        }, {
                            yAxis: 115
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 250
                        }]
                    }
                }]
            });
        },
        drawPiePM25(){
            var myChart = this.$echarts.init(document.getElementById('PM25TimePieChart'))
            console.log(this.levelList)
            myChart.setOption({
                title : {
                    text: `${this.cityName}PM2.5分布情况`,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['严重污染','重度污染','中度污染','轻度污染','良','优']
                },
                series : [
                    {
                        name: '空气质量等级',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        label: {
                            normal: {
                                formatter: "{b}({d}%)",
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                textStyle: {
                                    color: 'rgba(0, 0, 0, 1)'
                                }
                            }
                        },
                        data:[
                            {value: this.levelList[0].count, name: this.levelList[0].level, itemStyle: {color: '#096'}},
                            {value: this.levelList[1].count, name: this.levelList[1].level, itemStyle: {color: '#ffde33'}},
                            {value: this.levelList[2].count, name: this.levelList[2].level, itemStyle: {color: '#ff9933'}},
                            {value: this.levelList[3].count, name: this.levelList[3].level, itemStyle: {color: '#cc0033'}},
                            {value: this.levelList[4].count, name: this.levelList[4].level, itemStyle: {color: '#660099'}},
                            {value: this.levelList[5].count, name: this.levelList[5].level, itemStyle: {color: '#7e0023'}}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },

        // 获取后台数据
        fetchData (city, dateStart, dateEnd, type) {
            axios.post({
                url: "airtrend",
                data: {
                    city: city,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    type: type
                }
            }).then((response) => {
                console.log(response);
                if(this.dates) {
                    this.dates = [];
                }
                response.airtrendlist.forEach((item) => {
                    this.dates.push([item.date, item.points]);
                });
                this.max = response.max;
                this.min = response.min;
                this.avg = response.avg;
                this.cityName = response.city;
                this.levelList = response.levellist;
                console.log(this.dates);
                // 获取数据完立即渲染图表
                this.drawLinePM25();
                this.drawPiePM25();
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>