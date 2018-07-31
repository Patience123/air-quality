<template>
    <div id="v_NO2">
        <div id="NO2TimeLineChart" :style="{width: '100%', height: '500px', margin:'0 auto'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'
export default {
    name: 'v_NO2',
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
        this.fetchData("北京", "2018-05-01", "2018-05-30", 5);
    },
    methods: {
        drawLinePM25(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('NO2TimeLineChart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `${this.cityName}NO2变化趋势`,
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
                        lte: 10,
                        color: '#096'
                    }, {
                        gt: 10,
                        lte: 20,
                        color: '#ffde33'
                    }, {
                        gt: 20,
                        lte: 30,
                        color: '#ff9933'
                    }, {
                        gt: 30,
                        lte: 40,
                        color: '#cc0033'
                    }, {
                        gt: 40,
                        lte: 50,
                        color: '#660099'
                    }, {
                        gt: 50,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: [{
                    name: `${this.cityName} NO2`,
                    type: 'line',
                    data: this.dates.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 10
                        }, {
                            yAxis: 10
                        }, {
                            yAxis: 30
                        }, {
                            yAxis: 40
                        }, {
                            yAxis: 50
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