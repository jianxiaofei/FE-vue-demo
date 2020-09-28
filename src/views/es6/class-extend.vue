<template>
  <div>
    <h1>class/extend</h1>
    <pre>
    1.
      class Obj{
        constructor(){
          this.a = 123
        }
        fun(){
            console.log(this.a)
        }
      }
      const  eg1 = new Obj()
      eg1.fun() // 123

    2.
      class Obj1{
          constructor(){
              this.a = 123
              this.b = 789
          }
          fun(){
              console.log(this.a)
          }
      }
      class Obj2 extends Obj1{
        constructor(){
          super()
          this.a = 456
        }
        fun(){
          console.log(this.a,this.b)
        }
      }
      const eg2 = new Obj2()
      eg2.fun() // 456， 789
    </pre>
  </div>
</template>

<script>
export default {
  name: 'class-extend',
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus">

</style>
