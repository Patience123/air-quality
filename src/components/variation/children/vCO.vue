<template>
    <div id="v_CO">
        <div id="COTimeLineChart" :style="{width: '100%', height: '500px', margin:'0 auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'
export default {
    name: 'v_CO',
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
        this.fetchData("北京", "2018-05-01", "2018-05-30", 6);
    },
    methods: {
        drawLinePM25(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('COTimeLineChart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `${this.cityName}CO变化趋势`,
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
                        lte: 0.15,
                        color: '#096'
                    }, {
                        gt: 0.15,
                        lte: 0.3,
                        color: '#ffde33'
                    }, {
                        gt: 0.3,
                        lte: 0.45,
                        color: '#ff9933'
                    }, {
                        gt: 0.45,
                        lte: 0.6,
                        color: '#cc0033'
                    }, {
                        gt: 0.6,
                        lte: 0.75,
                        color: '#660099'
                    }, {
                        gt: 0.75,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: [{
                    name: `${this.cityName} CO`,
                    type: 'line',
                    data: this.dates.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 0.15
                        }, {
                            yAxis: 0.3
                        }, {
                            yAxis: 0.45
                        }, {
                            yAxis: 0.6
                        }, {
                            yAxis: 0.75
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