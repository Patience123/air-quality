<template>
    <div id="rain-relate">
        <top class="top" @changeCity="select" @changeYear="slectedYear" :defaultCity="cityValue"></top>
        <div id="rain-so2"></div>
        <div id="rain-pm25"></div>
        <div id="rain-pm10"></div>
        <div id="rain-no2"></div>
        <div id="rain-aqi"></div>
        <BackTop :height="100" :bottom="200">
            <div class="back-top">返回顶端</div>
        </BackTop>
    </div>
</template>

<script>
import axios from '../../../lib/util'
import top from '../public/top'

export default {
    name: "rainRelate",
    components: {
        top
    },
    data () {
        return {
            currentCity: '海口',
            currentYear: '2016',
            so2Data: [],
            pm25Data: [],
            pm10Data: [],
            aqiData: [],
            no2Data: [],
            cityValue: ['海南', '海口']
        }
    },
    created () {
        this.fetchData(this.currentCity, this.currentYear, 0);
    },
    methods: {
        fetchData (city, year, type) {
            axios.post({
                url: 'aqirainlist',
                data: {
                    city: city,
                    year: year,
                    type: type
                }
            }).then(response => {
                this.so2Data[0] = response.rainso2.nLists;
                this.so2Data[1] = response.rainso2.yLists;
                this.pm25Data[0] = response.rainpm25.nLists;
                this.pm25Data[1] = response.rainpm25.yLists;
                this.pm10Data[0] = response.rainpm10.nLists;
                this.pm10Data[1] = response.rainpm10.yLists;
                this.no2Data[0] = response.rainno2.nLists;
                this.no2Data[1] = response.rainno2.yLists;
                this.aqiData[0] = response.rainaqi.nLists;
                this.aqiData[1] = response.rainaqi.yLists;
                this.drawRainSo2();
                this.drawRainPm25();
                this.drawRainPm10();
                this.drawRainNo2();
                this.drawRainAqi();
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        },
        select (selectedCity) {
            this.currentCity = selectedCity[1];
            this.fetchData(this.currentCity, this.currentYear, 0);
        },
        slectedYear (selectedYear) {
            this.currentYear = selectedYear;
            this.fetchData(this.currentCity, this.currentYear, 0);
        },
        drawRainSo2 () {
            let myCharts = this.$echarts.init(document.getElementById('rain-so2'));
            let option = {
                title: {
                    text: `${this.currentYear}年${this.currentCity}: 降雨对SO2的影响`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['无雨','有雨']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '单位ug/m3'
                    }
                ],
                series: [
                    {
                        name: '无雨',
                        type: 'bar',
                        data: this.so2Data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '有雨',
                        type: 'bar',
                        data: this.so2Data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        drawRainPm25 () {
            let myCharts = this.$echarts.init(document.getElementById('rain-pm25'));
            let option = {
                title: {
                    text: `${this.currentYear}年${this.currentCity}: 降雨对PM2.5的影响`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['无雨','有雨']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '单位ug/m3'
                    }
                ],
                series: [
                    {
                        name: '无雨',
                        type: 'bar',
                        data: this.pm25Data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '有雨',
                        type: 'bar',
                        data: this.pm25Data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        drawRainPm10 () {
            let myCharts = this.$echarts.init(document.getElementById('rain-pm10'));
            let option = {
                title: {
                    text: `${this.currentYear}年${this.currentCity}: 降雨对PM10的影响`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['无雨','有雨']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '单位ug/m3'
                    }
                ],
                series: [
                    {
                        name: '无雨',
                        type: 'bar',
                        data: this.pm10Data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '有雨',
                        type: 'bar',
                        data: this.pm10Data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        drawRainNo2 () {
            let myCharts = this.$echarts.init(document.getElementById('rain-no2'));
            let option = {
                title: {
                    text: `${this.currentYear}年${this.currentCity}: 降雨对NO2的影响`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['无雨','有雨']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '单位ug/m3'
                    }
                ],
                series: [
                    {
                        name: '无雨',
                        type: 'bar',
                        data: this.no2Data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '有雨',
                        type: 'bar',
                        data: this.no2Data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        drawRainAqi () {
            let myCharts = this.$echarts.init(document.getElementById('rain-aqi'));
            let option = {
                title: {
                    text: `${this.currentYear}年${this.currentCity}: 降雨对AQI的影响`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['无雨','有雨']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '单位ug/m3'
                    }
                ],
                series: [
                    {
                        name: '无雨',
                        type: 'bar',
                        data: this.aqiData[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '有雨',
                        type: 'bar',
                        data: this.aqiData[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        }
    }
}
</script>

<style scoped>
    .top {
        box-shadow: 0 2px 1px 0 rgba(0,0,0,.1);
    }
    #rain-so2, #rain-pm25, #rain-pm10, #rain-no2, #rain-aqi {
        width: 1200px;
        margin: 0 auto;
        height: 500px;
        margin-top: 50px;
    }
    .back-top {
        padding: 10px;
        background: rgba(0, 153, 229, .8);
        color: #fff;
        text-align: center;
        border-radius: 10px;
    }
</style>