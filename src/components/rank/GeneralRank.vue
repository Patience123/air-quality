<template>
    <div id="aqiAvg">
        <top @changeYear="selectYear" @changeCity="selectCity" :defaultCity="cityValue"></top>
        <Row class="analytics-title">
            <div class="analytics-title-h3">月平均AQI统计</div>
        </Row>
        <div id="avgBar"></div>
    </div>
</template>

<script>
import top from '../public/top'
import axios from '../../../lib/util'

export default {
    name:'aqiAvg',
    data () {
        return {
            months: [],
            avgs: [],
            year: '2016',
            currentCity: '北京',
            best: '',
            cityValue: ['直辖市', '北京']
        }
    },
    components: {
        top
    },
    created () {
        this.fetchMonthAvg(this.currentCity, this.year, 0);
    },
    methods: {
        fetchMonthAvg (city, year, type) {
            axios.post({
                url: '/monthavg',
                data: {
                    city: city,
                    year: year,
                    type: type
                }
            }).then(response => {
                if(this.avgs && this.months) {
                    this.avgs = [];
                    this.months = [];
                }
                response.aqimonthavglist.forEach(item => {
                    this.months.push(item.month);
                });
                response.aqimonthavglist.forEach(item => {
                    this.avgs.push(item.avgaqi);
                });
                this.best = response.bestMonth + '月';
                this.drawBar();
                console.log(response);
                // console.log(this.months, this.avgs);
            }).catch(error => {
                console.log(error);
            })
        },
        selectYear (year) {
            this.year = year;
            this.fetchMonthAvg(this.currentCity, this.year, 0);
        },
        selectCity (city) {
            this.currentCity = city[1];
            this.fetchMonthAvg(this.currentCity, this.year, 0);
        },
        drawBar () {
            let myCharts = this.$echarts.init(document.getElementById('avgBar'));
            let option = {
                // color: ['#1f4c7a'],
                title: {
                    text: `${this.year}年${this.currentCity}每月平均AQI`,
                    subtext: `最好月份：${this.best}`,
                    textStyle: {
                        color: '#000',
                        fontSize: 22 
                    },
                    subtextStyle: {
                        fontSize: 18
                    },
                    x: 'center',
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.months,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        max: 300,
                        min: 0,
                        splitNumber: 6,
                    }
                ],
                series : [
                    {
                        name:'AQI平均值',
                        type:'bar',
                        barWidth: '60%',
                        data: this.avgs
                    }
                ]
            };
            myCharts.setOption(option);
        }
    }
}
</script>

<style scoped>
#avgBar {
    width: 1200px;
    margin: 30px auto 0;
    height: 600px;
}
.analytics-title {
    width: 96%;
    padding-bottom: 5px;
    margin: 0 auto;
    border-bottom: 2px solid #e3e8ee;
}
.analytics-title-h3 {
    float: left;
    font-size: 18px;
    color: #4d617d;
    line-height: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    padding-bottom: 10px;
}
</style>
