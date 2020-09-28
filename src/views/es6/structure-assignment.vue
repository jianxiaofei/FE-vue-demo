<template>
  <div>
    <pre>
     1.
        var a = '123', b = '456'
        const obj = {a, b, c: 'test'}
     2.
        let[vv1,...,jj1] = [123,321,456] // vv1 = 123 ,jj1 = [321, 456]
        const obj = {o: 123}; const {o} = obj // o = 123
    </pre>
  </div>
</template>

<script>
export default {
  name: 'structure-assignment',
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus">

</style>
