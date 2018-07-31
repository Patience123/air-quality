<template>
    <div id="seriouspollutionlist">
        
    </div>
</template>

<script>
import axios from '../../../../lib/util'

export default {
    name: 'seriouspollutionlist',
    data () {
        return {
            wordList: []
        }
    },
    created() {
        this.fatchData();
    },
    methods: {
        // 获取词云数据，并转化为{name: ""，value: ""}的形式
        fatchData () {
            axios.post({
                url: 'seriouspollutionlist'
            }).then(response => {
                let temp = response.seriouspollutionlist.map(item => {
                    return {
                        name: item.city,
                        value: item.count
                    }
                });
                this.wordList = temp;
                this.drawCloud();
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        drawCloud () {
            var worldCloudcharts = this.$echarts.init(document.getElementById('seriouspollutionlist'));
            var worldCloudoption = {
                title: {
                    text: '空气质量等级为严重污染的词云分析',
                    x: 'center',
                    textStyle: {
                        fontSize: 23,
                        color:'black'
                    }
                },
                tooltip: {
                    show: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            iconStyle: {
                                normal: {
                                    color: '#FFFFFF'
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: '空气质量为严重污染的天数',
                    type: 'wordCloud',
                    // shape: 'circle',
                    sizeRange: [18, 84],
                    rotationRange: [-45, 90],
                    textPadding: 0,
                    autoSize: {
                        enable: true,
                        minSize: 6
                    },
                    textStyle: {
                        normal: {
                            color: function() {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: []
                }]
            };
            worldCloudoption.series[0].data = this.wordList;
            worldCloudcharts.setOption(worldCloudoption);
        }
    }
}
</script>

<style scoped>
#seriouspollutionlist {
    padding: 30px;
}
</style>
