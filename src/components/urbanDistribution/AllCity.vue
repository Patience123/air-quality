<template>
    <div>
        <Row class="analytics-title">
            <div class="analytics-title-h3">聚类分析</div>
        </Row>
        <Collapse v-model="value1" class="collapse">
            <Panel name="1">
                第一类城市（{{titleList[0].minpoint}} ~ {{titleList[0].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data1" :show-header="showHeader"></Table>
            </Panel>
            <Panel name="2">
                第二类城市（{{titleList[1].minpoint}} ~ {{titleList[1].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data2" :show-header="showHeader"></Table>
            </Panel>
            <Panel name="3">
                第三类城市（{{titleList[2].minpoint}} ~ {{titleList[2].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data3" :show-header="showHeader"></Table>
            </Panel>
            <Panel name="4">
                第四类城市（{{titleList[3].minpoint}} ~ {{titleList[3].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data4" :show-header="showHeader"></Table>
            </Panel>
            <Panel name="5">
                第五类城市（{{titleList[4].minpoint}} ~ {{titleList[4].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data5" :show-header="showHeader"></Table>
            </Panel>
            <Panel name="6">
                第六类城市（{{titleList[5].minpoint}} ~ {{titleList[5].maxpoint}}）
                <Table slot="content" :columns="columns1" :data="data6" :show-header="showHeader"></Table>
            </Panel>
        </Collapse>
        <Row class="analytics-title">
            <div class="analytics-title-h3">PM2.5分布</div>
        </Row>
        <div id="map"></div>
    </div>
</template>

<script>
import 'echarts/map/js/china.js';
import axios from '../../../lib/util';
import { geoCoordMap } from '../../../lib/mapData';

export default {
    name: "cityAqi",
    data() {
        return {
            value1: '1',
            PM25Data: [],
            titleList: [],
            showHeader: false,
            columns1: [
                {
                    key: 'city1'
                },
                {
                    key: 'city2'
                },
                {
                    key: 'city3'
                },
                {
                    key: 'city4'
                },
                {
                    key: 'city5'
                },
                {
                    key: 'city6'
                }
            ],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            data5: [],
            data6: [],
        };
    },
    created () {
        this.fetchPM25Data();
        this.fetchClassifyData();
        this.fetchClassifyTitle();
    },
    methods: {
        fetchClassifyTitle () {
            axios.post({
                url: 'clusterbound'
            }).then(response => {
                this.titleList = response.clusterbound;
                console.log(this.titleList);
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        fetchClassifyData () {
            axios.post({
                url: 'cluster'
            }).then(response => {
                this.data1 = response.group1;
                this.data2 = response.group2;
                this.data3 = response.group3;
                this.data4 = response.group4;
                this.data5 = response.group5;
                this.data6 = response.group6;
                console.log(response);
            }).catch(errpr => {
                console.log(error);
            });
        },
        fetchPM25Data () {
            axios.post({
                url: 'pmlist'
            }).then(response => {
                console.log(response);
                this.PM25Data = response.pmlist.map(item => {
                    return {
                        name: item.city,
                        value: item.avgpm25
                    }
                });
                this.drawMap();
            }).catch(error => {
                console.log(error);
            });
        },
        drawMap() {
            let myChart =  this.$echarts.init(document.getElementById('map'));
            let convertData = data => {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            let option = {
                backgroundColor: '#404a59',
                title: {
                    text: '全国主要城市空气质量',
                    subtext: 'data from PM25.in',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: params => {
                        return params.name+'<br/>' + params.seriesName + ": " + params.value[2]
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x:'right',
                    data:['pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series : [
                    {
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(this.PM25Data),
                        symbolSize: val => val[2] / 10,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 10',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(this.PM25Data.sort((a, b) => b.value - a.value).slice(0, 11)),
                        symbolSize: val => val[2] / 10,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'fill'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>

<style scoped>
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
#map {
    width: 1400px;
    height: 800px;
    margin: 20px auto;
}
.collapse {
    width: 96%;
    margin: 20px auto;
}
</style>