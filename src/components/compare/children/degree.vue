<template>
    <div id="c-degree">
        <div id="compareCharts" :style="{height: '600px'}"></div>
        <div id="compareCharts2" :style="{height: '600px'}"></div>
    </div>
</template>

<script>
import axios from '../../../../lib/util'

export default {
    name: 'cDegree',
    data () {
        return {
            cityOne: "北京",
            cityTwo: "杭州",
            dateStart: "2018-05-01",
            dateEnd: "2018-05-31",
            sourceData: [],
            levelcountOne: '',
            levelcountTwo: ''
        }
    },
    created () {
        this.fetchQualityOne(this.cityOne, this.dateStart, this.dateEnd);
        this.fetchQualityTwo(this.cityTwo, this.dateStart, this.dateEnd);
    },
    computed: {
        bestCity () {
            return this.levelcountOne > this.levelcountTwo ? this.cityOne : this.cityTwo
        }
    },
    methods: {
        fetchQualityOne (city, dateStart, dateEnd) {
            axios.post({
                url: 'aqilevellist',
                data: {
                    city: city,
                    sdate: dateStart,
                    edate: dateEnd
                }
            }).then(response => {
                // this.sourceData = [];
                this.sourceData = response.aqilevellist.map(item => {
                    return [
                        item.level,
                        item.percent
                    ]
                });
                this.cityOne = city;
                this.levelcountOne = response.levelcount;
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        },
        fetchQualityTwo (city, dateStart, dateEnd) {
            axios.post({
                url: 'aqilevellist',
                data: {
                    city: city,
                    sdate: dateStart,
                    edate: dateEnd
                }
            }).then(response => {
                for(let i = 0; i < this.sourceData.length; i++) {
                    this.sourceData[i] = this.sourceData[i].concat(response.aqilevellist[i].percent);
                }
                this.cityTwo = city;
                this.levelcountTwo = response.levelcount;
                this.sourceData.unshift(['污染程度', this.cityOne, this.cityTwo]);
                this.drawBar();
                this.drawPie();
                console.log(this.sourceData);
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        },
        drawBar(){
            let myChart = this.$echarts.init(document.getElementById('compareCharts'));
            myChart.setOption({
                title: {
                    text: `${this.cityOne} VS ${this.cityTwo} 日空气质量比较`,
                    subtext: `${this.bestCity}空气质量较好`,
                    x: 'center',
                    textStyle: {
                        fontSize: 24
                    },
                    subtextStyle: {
                        fontSize: 16
                    }
                },
                legend: {
                    left: 20,
                    top: 20,
                    data: [this.cityOne, this.cityTwo]
                },
                grid: {
                    y: 100,
                },
                tooltip: {
                    // formatter: '{a}: {c1}'
                },
                dataset: {
                    source: this.sourceData
                },
                xAxis: {type: 'category'},
                yAxis: {
                axisLabel: {
                        formatter: '{value} %'
                    }
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar', 
                        name: this.cityOne,
                        itemStyle: {
                            normal: {color:'#EBA954'},
                        },
                    },
                    {
                        type: 'bar', 
                        name: this.cityTwo,
                        itemStyle: {
                            normal: {color:'#01949B'},
                        },
                    }
                ]
            });
        },
        drawPie() {
            let myChart = this.$echarts.init(document.getElementById('compareCharts2'));
            let option = {
                legend: {
                    // orient: 'vertical',
                    // left: 10,
                    // top: 20,
                },
                tooltip: {},
                dataset: {
                    source: this.sourceData
                },
                series: [{
                    type: 'pie',
                    radius: 60,
                    center: ['25%', '25%'],
                    encode: {
                        itemName: '污染程度',
                        value: this.cityOne
                    }
                }, {
                    type: 'pie',
                    radius: 60,
                    center: ['25%', '60%'],
                    encode: {
                        itemName: '污染程度',
                        value: this.cityTwo
                    }
                }]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
#c-degree {
    display: flex;
    margin-top: 30px;
}
#compareCharts {
    flex: 2
}
#compareCharts2 {
    flex: 1
}
</style>