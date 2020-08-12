<template>
  <div>
    <h1>promise</h1>
    <pre>
      const async = new Promise((resolve, reject) => {
        if(success){
          resolve()
        }else{
          reject()
        }
      })
    </pre>
    <h1>async,await</h1>
    <pre>
      test(num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('timer is ok! 执行的第>>' + num)
        }, 3000)
      })
    },
    async testAsync() {
      const str1 = await this.test(1)
      const str2 = await this.test(2)
      const str3 = await this.test(3)
      return str1 + '\n' + str2 + '\n' + str3
    },
    </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "promise",
  data() {
    return {}
  },
  mounted() {/*
    this.testPromise().then(res => {
      console.log(res instanceof Object ? res : JSON.parse(res))
      this.testFun()
    }, res => console.log(res))*/

    this.testAsync().then(result => {
      console.log(result)
    })

    this.asyncPrint('hello world', 5000)
  },
  methods: {
    ajax(params) {
      const url = params.url
      const type = params.type || 'GEt'
      const success = params.success
      const error = params.error
      const xhr = new XMLHttpRequest()

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) { // 4 = load
          if (xhr.status === 200) { // 200 = OK
            success(xhr.responseText)
          } else {
            error("请求数据失败！", xhr.status)
          }
        }
      }
      xhr.open(type, url, true)
      xhr.send(null)
    },
    testAjax() {
      let rest = null
      this.ajax({
        url: 'http://localhost:7300/mock/5f2d0c613fa98d3ede92fc59/promiseTest',
        success: res => rest = res,
        error: res => rest = res
      })
      return rest
    },
    // 测试promise
    testPromise() {
      return new Promise((resolve, reject) => {
        this.ajax({
          url: 'http://localhost:7300/mock/5f2d0c613fa98d3ede92fc59/promiseTest',
          success: res => resolve(res),
          error: res => reject(res)
        })
      }).catch(e => console.log(e))
    },
    test(num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('timer is ok! 执行的第>>' + num)
        }, 3000)
      })
    },
    async testAsync() {
      const str1 = await this.test(1)
      const str2 = await this.test(2)
      const str3 = await this.test(3)
      return str1 + '\n' + str2 + '\n' + str3
    },
    testFun(res) {
      console.log('is complete！', res)
    },
    timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    async asyncPrint(value, ms) {
      await this.timeout(ms);
      console.log(value);
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
