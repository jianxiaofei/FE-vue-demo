<template>
  <div class="view">
    <a-menu
      :selected-keys="[current]"
      :open-keys="openKeys"
      :theme="theme"
      :inline-collapsed="collapsed"
      mode="inline"
      @openChange="onOpenChange"
      @click="handleClick">
      <template v-for="item of navTabs">
        <a-sub-menu v-if="item.sub" :key="item.index">
          <span slot="title">
            <icon-font v-if="item.isIconFont" :type="item.icon"/>
            <a-icon v-else :type="item.icon"/>
            <span>{{item.title}}</span>
          </span>
          <template v-for="item_0 of item.sub">
            <a-sub-menu v-if="item_0.sub" :key="item_0.index" :title="item_0.title">
              <a-menu-item v-for="item_1 of item_0.sub" :key="item_1.index">
                {{item_1.title}}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="item_0.index">
              {{item_0.title}}
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item v-else :key="item.index">
          <span>
            <icon-font v-if="item.isIconFont" :type="item.icon"/>
            <a-icon v-else :type="item.icon"/>
            <span>{{item.title}}</span>
          </span>
        </a-menu-item>
      </template>
    </a-menu>
    <a-button class="btn-collapse" type="primary" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>
  </div>
</template>
<script>
  import { Menu, Icon, Button } from 'ant-design-vue'
  import bus from '@/utils/bus'
  import NavTabs from '@/router/navTab'

  export default {
    components: {
      'a-menu': Menu,
      'a-sub-menu': Menu.SubMenu,
      'a-menu-item': Menu.Item,
      'a-button': Button,
      'a-icon': Icon,
    },
    data () {
      return {
        current: 'home',
        rootSubmenuKeys: ['Navigation-one', 'Navigation-two'],
        openKeys: ['Navigation-one'],
        theme: 'dark',
        collapsed: false,
        navTabs: NavTabs
      }
    },
    methods: {
      handleClick (e) {
        this.current = e.key
        this.$router.push('/' + e.key)
        // bus.$emit('nav-active', e.key)
      },
      onOpenChange (openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      },
      changeTheme (checked) {
        this.theme = checked ? 'dark' : 'light'
      },
      // 根据面包屑操作交互导航选中,折叠收、展(目前只支持两层折叠)
      collapseNavTabs (msg) {
        const tempNav = msg.slice(1)
        this.current = tempNav
        this.navTabs.forEach(key => {
          if (key.sub) {
            key.sub.forEach(key0 => {
              if (key0.index === tempNav) {
                this.openKeys = [key.index]
              }
            })
          }
        })
      },
      toggleCollapsed () {
        this.collapsed = !this.collapsed
        bus.$emit('collapse', this.collapsed)
      }
    },
    created () {
      // 根据折叠按钮交互导航向左收起
      bus.$on('collapse', msg => {
        this.collapsed = msg
      })
      bus.$on('tags', msg => {
        this.collapseNavTabs(msg)
      })
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../assets/stylus/color.styl"
  .view
    position relative
    background url("http://www.datatom.com/cn/images/banner10.jpg") no-repeat
    background-size auto 100%

    .ant-menu-root
      height 100vh
      padding 10px 0

    >>> .ant-menu
      background-color rgba(1, 1, 1, .1)

  .btn-collapse
    position absolute
    z-index 1
    bottom 0

</style>
