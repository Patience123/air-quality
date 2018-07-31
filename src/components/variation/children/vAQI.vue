<template>
    <div id="v_AQI">
        <div id="aqiTimeLineChart" :style="{width: '100%', height: '500px', margin:'0 auto'}"></div>
        <div id="aqiTimePieChart" :style="{width: '1000px', height: '500px', margin:'50px auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'
export default {
    name: 'v_AQI',
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
        // 页面加载默认渲染
        this.fetchData("北京", "2018-05-01", "2018-05-30", 1);
    },
    methods: {
        drawLineAQI () {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('aqiTimeLineChart'));

            // 绘制图表
            myChart.setOption({
                title: {
                    text: `${this.cityName}AQI变化趋势`,
                    subtext: `最大值：${this.max}    最小值：${this.min}    平均值：${this.avg}`,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
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
                        lte: 50,
                        color: '#096'
                    }, {
                        gt: 50,
                        lte: 100,
                        color: '#ffde33'
                    }, {
                        gt: 100,
                        lte: 150,
                        color: '#ff9933'
                    }, {
                        gt: 150,
                        lte: 200,
                        color: '#cc0033'
                    }, {
                        gt: 200,
                        lte: 300,
                        color: '#660099'
                    }, {
                        gt: 300,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: [{
                    name: `${this.cityName} AQI`,
                    type: 'line',
                    data: this.dates.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                    }
                }]
            });
        },
        drawPieAQI () {
            var myChart = this.$echarts.init(document.getElementById('aqiTimePieChart'))
            console.log(this.levelList)
            myChart.setOption({
                title : {
                    text: `${this.cityName}AQI分布情况`,
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
                this.drawLineAQI();
                this.drawPieAQI();
            }).catch((error) => {
                console.log(error);
                this.$Message.error({
                    top: 50,
                    duration: 6,
                    closable: true,
                    content: '您选择的日期范围不正确或该范围暂无相关数据，请重新选择'
                });
            })
        }
    }
}
</script>

<style scoped>

</style>