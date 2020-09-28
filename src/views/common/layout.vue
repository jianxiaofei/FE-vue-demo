<template>
  <div class="page">
    <Aside/>
    <Layout>
      <Header/>
      <main>
        <Tags/>
        <router-view/>
        <footer>@copyright by xiaofei.jian 2020-infinity</footer>
      </main>
    </Layout>
  </div>
</template>

<script>
  import { Layout } from 'ant-design-vue'
  import Aside from '@v/common/aside'
  import Header from '@v/common/header'
  import Tags from '@v/common/tags'

  export default {
    name: 'layout',
    components: {
      Aside,
      Header,
      Layout,
      Tags,
    },
  }
</script>

<style scoped lang="stylus">
  .page
    display flex
    main
      position relative
      height 100%
      overflow hidden
      padding 6px 10px 10px 10px
      footer
        position absolute
        bottom 10px
        width 90vw
        text-align center

</style>
