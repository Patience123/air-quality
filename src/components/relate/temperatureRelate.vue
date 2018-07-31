<template>
    <div id="temperature-relate">
        <top @changeCity="seachCity" @changeYear="selectYear" :defaultCity="cityDefault"></top>
        <Row class="analytics-title">
            <div class="analytics-title-h3">温度与AQI指标分布</div>
        </Row>
        <spin v-if="spinShow" class="spin" size="large"></spin>
        <div id="city-value" :style="{width: '1200px', height: '600px', margin: '50px auto', position: 'relative'}"></div>
        <Row class="analytics-title">
            <div class="analytics-title-h3">温度与各质量指标相关系数</div>
        </Row>
        <Table class="analytics-table" border :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import top from '../public/top'
import axios from '../../../lib/util'

export default {
    name: 'temperatureRelate',
    components: {
        top
    },
    created () {
        this.fetchRatio('北京', 1);
        this.fetchValue('北京', '2016', 1);
    },
    data () {
        return {
            spinShow: true,
            columns1: [
                {
                    title: '质量指标',
                    key: 'type'
                },
                {
                    title: '皮尔逊系数',
                    key: 'pearson'
                },
                {
                    title: '斯皮尔曼系数',
                    key: 'spearman'
                }
            ],
            data1: [],
            cityDefault: ['直辖市', '北京'],
            currentCity: '北京',
            cityValue: [],
            itemStyle: {
                normal: {
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            year: '2016'
        }
    },
    methods: {
        fetchRatio (city, year, type) {
            axios.post({
                url: 'airtem',
                data: {
                    city: city,
                    year: 'a',
                    type: type
                }
            }).then(response => {
                console.log(response);
                this.data1 = response.airtemlist;
            }).catch(error => {
                console.log(error);
            })
        },
        fetchValue (city, year, type) {
            axios.post({
                url: 'aqitemlist',
                data: {
                    city: city,
                    year: year,
                    type: type
                }
            }).then(response => {
                this.cityValue = response.aqitemlist.map(item => {
                    return [
                        item.temperature,
                        item.aqi,
                        item.pm25,
                        item.pm10,
                        item.co,
                        item.no2,
                        item.so2,
                        item.o3,
                        item.level,
                        item.date
                    ]
                });
                this.drawLine();
                this.spinShow = false;
                if(this.cityValue.length === 0) {
                    this.$Notice.info({
                        top: 50,
                        duration: 6,
                        title: '温馨提示',
                        desc: '非常抱歉，该城市在该年份暂无数据'
                    });
                }
                console.log(response);
                console.log(this.cityValue);
            }).catch(error => {
                console.log(error);
            })
        },
        seachCity (value) {
            this.currentCity = value[1];
            // console.log(this.currentCity);
            this.fetchRatio(this.currentCity, 1);
            this.fetchValue(this.currentCity, this.year, 1);
        },
        selectYear (year) {
            this.year = year;
            this.fetchValue(this.currentCity, this.year, 1);
        },
        drawLine () {
            let myChart = this.$echarts.init(document.getElementById('city-value'))

            var schema = [
                {name: 'date', index: 0, text: '日'},
                {name: 'AQIindex', index: 1, text: 'AQI指数'},
                {name: 'PM25', index: 2, text: 'PM2.5'},
                {name: 'PM10', index: 3, text: 'PM10'},
                {name: 'CO', index: 4, text: '一氧化碳（CO）'},
                {name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
                {name: 'SO2', index: 6, text: '二氧化硫（SO2）'},
                {name: 'O3', index: 7, text: '臭氧（O3）'}
            ]

            let option = {
                backgroundColor: '#4d617d',
                color: [
                    '#dd4444'
                ],
                // legend: {
                //     y: 'top',
                //     data: ['北京'],
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 16
                //     }
                // },
                title: {
                    text: `${this.year}年${this.currentCity}温度-AQI指数`,
                    textStyle: {
                        color: '#fff',
                        fontSize: 22 
                    },
                    x: 'center',
                    top: 10
                },
                grid: {
                    x: '10%',
                    x2: 150,
                    y: '18%',
                    y2: '10%'
                },
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + obj.seriesName + ' ' + value[9] + '：'
                            + value[8]
                            + '</div>'
                            + schema[1].text + '：' + value[1] + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>'
                            + schema[3].text + '：' + value[3] + '<br>'
                            + schema[4].text + '：' + value[4] + '<br>'
                            + schema[5].text + '：' + value[5] + '<br>'
                            + schema[6].text + '：' + value[6] + '<br>'
                            + schema[7].text + '：' + value[7] + '<br>';
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '温度',
                    nameGap: 16,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    min:-25,
                    max: 40,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'AQI指数',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 16
                    },
                    axisLine: {
                        onZero:false,
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        left: 'right',
                        top: '10%',
                        dimension: 2,
                        min: 0,
                        max: 250,
                        itemWidth: 30,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['圆形大小：PM2.5'],
                        textGap: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            symbolSize: [10, 70]
                        },
                        outOfRange: {
                            symbolSize: [10, 70],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    },
                    {
                        left: 'right',
                        bottom: '5%',
                        dimension: 6,
                        min: 0,
                        max: 50,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['明暗：二氧化硫'],
                        textGap: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            colorLightness: [1, 0.5]
                        },
                        outOfRange: {
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '北京',
                        type: 'scatter',
                        itemStyle: this.itemStyle,
                        data: this.cityValue
                    },
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
#cityaqi {
    margin: 50px;
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
.analytics-table {
    margin: 2%;
}
.spin {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%); 
}
</style>
