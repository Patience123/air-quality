<template>
    <div id="v_PM10">
        <div id="PM10TimeLineChart" :style="{width: '100%', height: '500px', margin:'0 auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'
export default {
    name: 'v_PM10',
    data() {
        return {
            dates: [],
            max: "",
            min: "",
            avg: "",
            cityName: "",
            // levelList: []
        }
    },
    created () {
        this.fetchData("北京", "2018-05-01", "2018-05-30", 3);
    },
    methods: {
        drawLinePM25(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('PM10TimeLineChart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `${this.cityName}PM10变化趋势`,
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
                    name: `${this.cityName} PM10`,
                    type: 'line',
                    data: this.dates.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 35
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
                // this.levelList = response.levellist;
                console.log(this.dates);
                // 获取数据完立即渲染图表
                this.drawLinePM25();
                // this.drawPiePM25();
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>