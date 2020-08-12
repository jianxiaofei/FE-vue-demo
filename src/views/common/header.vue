<template>
  <div class="header">
    <img class="logo" width="50" height="50" src="../../assets/WechatIMG41.jpeg" alt="logo">
    <div class="header-right">
      <a-badge class="badge" dot>
        <a-icon type="bell" style="color: #fff;font-size: 18px"/>
      </a-badge>
      <a-avatar src="./img/jxfstyle.png" class="avatar"/>
      <span class="user-welcome">欢迎你, {{userName}}</span>
    </div>
  </div>
</template>

<script>
  import { Icon, Badge, Avatar } from 'ant-design-vue'

  export default {
    components: {
      'a-icon': Icon,
      'a-badge': Badge,
      'a-avatar': Avatar
    },
    data () {
      return {
        collapsed: false,
        userName: sessionStorage.userName
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  .header
    height 50px
    background #000
    display flex
    flex-direction row
    justify-content space-between
    align-items center

    .header-right
      display flex
      justify-content left
      align-items center

      .user-welcome, .logo, .badge, .avatar
        color #fff
        margin 0 8px

</style>
