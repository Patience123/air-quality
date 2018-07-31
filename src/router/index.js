import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import AqiRank from '../components/rank/AQIRank'
import generalRank from '../components/rank/GeneralRank'
import variationIndex from '../components/variation/variationIndex'
import allcity from '../components/urbanDistribution/Allcity'
import compareIndex from '../components/compare/compareIndex'
import intro_aqi from '../components/konwledge/IntroduceAqi'
import trend from '../components/predict/trend'
import temperatureRelate from '../components/relate/temperatureRelate'
import rainRelate from '../components/relate/rainRelate'
import CloudIndex from '../components/rank/CloudIndex'
import excellent from '../components/rank/WordCloud/excellent'
import goodlist from '../components/rank/WordCloud/goodlist'
import lightpollutionlist from '../components/rank/WordCloud/lightpollutionlist'
import middlepollutionlist from '../components/rank/WordCloud/middlepollutionlist'
import heavypollutionlist from '../components/rank/WordCloud/heavypollutionlist'
import seriouspollutionlist from '../components/rank/WordCloud/seriouspollutionlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'AqiRank',
          component: AqiRank
        },
        {
          path: 'generalRank',
          name: 'generalRank',
          component: generalRank
        },
        {
          path: "CloudIndex",
          // name: "CloudIndex",
          component: CloudIndex,
          children: [
            {
              path: '',
              name: 'excellent',
              component: excellent
            },
            {
              path: 'goodlist',
              name: 'goodlist',
              component: goodlist
            },
            {
              path: 'lightpollutionlist',
              name: 'lightpollutionlist',
              component: lightpollutionlist
            },
            {
              path: 'middlepollutionlist',
              name: 'middlepollutionlist',
              component: middlepollutionlist
            },
            {
              path: 'heavypollutionlist',
              name: 'heavypollutionlist',
              component: heavypollutionlist
            },
            {
              path: 'seriouspollutionlist',
              name: 'seriouspollutionlist',
              component: seriouspollutionlist
            }
          ]
        },
        {
          path: 'variationIndex',
          name: 'variationIndex',
          component: variationIndex
        },
        {
          path: 'allCity',
          name: 'allCity',
          component: allcity
        },
        {
          path: 'compareIndex',
          name: 'compareIndex',
          component: compareIndex
        },
        {
          path: 'intro_aqi',
          name: 'intro_aqi',
          component: intro_aqi
        },
        {
          path: 'trend',
          name: 'trend',
          component: trend
        },
        {
          path: 'temperatureRelate',
          name: 'temperatureRelate',
          component: temperatureRelate
        },
        {
          path: 'rainRelate',
          name: 'rainRelate',
          component: rainRelate
        }
      ]
    }
  ]
})
