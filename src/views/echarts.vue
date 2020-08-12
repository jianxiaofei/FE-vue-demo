<template>
  <div class="view">
    <div ref="chart" style="width: 100%;height: 800px"></div>
  </div>
</template>

<script>
  import ECharts from 'echarts'
  import axios from 'axios'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.drawChart()
    },
    methods: {
      drawChart () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = ECharts.init(this.$refs.chart)
        this.myChart.showLoading()
        this.httpData().then(data => {
          this.createCharts(data)
        }).then(v => {
          console.log(v)
        })
      },
      httpData () {
        // 想要某个函数?拥有promise功能，只需让其返回一个promise即可。
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:7300/mock/5f2d0c613fa98d3ede92fc59/tree-chart-demo')
            .then(data => {
              data = data.data
              this.myChart.hideLoading()
              if (data) {
                resolve(data)
              } else {
                reject(data)
              }
            })
        })
      },
      createCharts (data) {
        ECharts.util.each(data.children, function (datum, index) {
          index % 2 === 0 && (datum.collapsed = true)
        })

        this.myChart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [data],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        })
      }
    }
  }

</script>
<style scoped lang="stylus">
</style>
