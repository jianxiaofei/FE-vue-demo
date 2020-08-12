<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <a-icon class="tags-li-icon" @click="closeTags(index)" type="close"/>
      </li>
    </ul>
    <a-dropdown class="tags-close-box">
      <a-button size="small" type="primary" @click="e => e.preventDefault()">
        <span>标签选项</span>
        <a-icon type="down"/>
      </a-button>
      <a-menu @click="handleTags" slot="overlay">
        <a-menu-item command="other">关闭其他</a-menu-item>
        <a-menu-item command="all">关闭所有</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import { Dropdown, Menu, Button, Icon } from 'ant-design-vue'
  import bus from '@/utils/bus'

  export default {
    components: {
      'a-dropdown': Dropdown,
      'a-menu': Menu,
      'a-menu-item': Menu.Item,
      'a-button': Button,
      'a-icon': Icon
    },
    data () {
      return {
        tagsList: []
      }
    },
    methods: {
      isActive (path) {
        return path === this.$route.fullPath
      },
      // 关闭单个标签
      closeTags (index) {
        const delItem = this.tagsList.splice(index, 1)[0]
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path)
        } else {
          this.$router.push('/')
        }
      },
      // 关闭全部标签
      closeAll () {
        this.tagsList = []
        this.$router.push('/')
      },
      // 关闭其他标签
      closeOther () {
        this.tagsList = this.tagsList.filter(item => {
          return item.path === this.$route.fullPath
        })
      },
      // 设置标签
      setTags (route) {
        const isExist = this.tagsList.some(item => {
          return item.path === route.fullPath
        })
        if (!isExist) {
          if (this.tagsList.length >= 8) {
            this.tagsList.shift()
          }
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.matched[1].components.default.name
          })
        }
        bus.$emit('tags', route.fullPath)
      },
      handleTags (command) {
        console.log(command)
        command === 'other' ? this.closeOther() : this.closeAll()
      }
    },
    computed: {
      showTags () {
        return this.tagsList.length > 0
      }
    },
    watch: {
      $route (newValue, oldValue) {
        this.setTags(newValue)
      }
    },
    created () {
      this.setTags(this.$route)
    }
  }

</script>

<style scoped lang="stylus">
  >>> .anticon
    font-size: 10px

    &:hover
      color red

  .tags {
    position: relative;
    top -2px
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
  }

  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
  }

  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    text-align: center;
    width: 110px;
    height: 30px;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }

</style>
