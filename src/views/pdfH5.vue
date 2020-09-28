<template>
  <div id="pdf">
    <div id="demo"/>
  </div>
</template>

<script>
import Pdfh5 from 'pdfh5'

export default {
  name: 'pdf',
  data() {
    return {
      pdfh5: null,
    }
  },

  mounted() {
    // 实例化
    this.pdfh5 = new Pdfh5('#demo', {
      pdfurl: '@/assets/nodejs.pdf',
      lazy: true,
    }).on('complete', (status, msg, time) => {
      // 监听完成事件
      console.log('状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum)
    })
  },
}
</script>

<style scoped lang="stylus">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#demo svg {
  height: calc(100vh) !important;
}
</style>
