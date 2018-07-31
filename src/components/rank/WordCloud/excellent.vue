<template>
    <div id="excellent">
        
    </div>
</template>

<script>
import axios from '../../../../lib/util'

export default {
    name: 'excellent',
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
                url: 'excellentlist'
            }).then(response => {
                let temp = response.excellentlist.map(item => {
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
            var worldCloudcharts = this.$echarts.init(document.getElementById('excellent'));
            var worldCloudoption = {
                title: {
                    text: '空气质量等级为优的词云分析',
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
                    name: '空气质量为优的天数',
                    type: 'wordCloud',
                    shape: 'circle',
                    sizeRange: [6, 62],
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
#excellent {
    padding: 30px;
}
</style>
