<template>
  <div>
    <pre>
      1.() => code here
      2.param => code here
      3.(val,index) => {  if(index>5) return val + 10> 100 }
      4.const obj = {a: 'use test',fun:() => this.a}
      5.
        var x = 'is "var" x'
        let y = 'is "let" y'
        const a = 'global a'
        const obj = {
          a: 'use obj a',
          x: 'use obj x',
          y: 'use obj y',
          fun: () => console.log(this.a, this.x, this.y),
          fun1() { console.log(this.a) },
        }
        obj.fun() // undefined is "var" x undefined
        obj.fun1() // use test
    </pre>

  </div>
</template>

<script>

export default {
  name: 'arrow-function',
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus">

</style>
