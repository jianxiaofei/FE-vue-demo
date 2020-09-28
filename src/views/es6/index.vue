<template>
  <a-tabs default-active-key="5">
    <a-tab-pane key="1" v-for="item of tabs" :key="item.id">
      <span slot="tab">
        {{item.title}}
      </span>
      <keep-alive>
        <component :is="item.view"/>
      </keep-alive>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { Tabs, Icon } from 'ant-design-vue'
import Promise from './async-plan'
import LetConst from './let-const'
import AsyncPlan from './async-plan'
import ArrowFunction from './arrow-function'
import ClassExtend from './class-extend.vue'
import ModuleJs from './module-js.vue'
import StructureAssignment from './structure-assignment.vue'
import UseExtend from './use-extend.vue'

export default {
  name: 'ES6',
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    'a-icon': Icon,
    Promise,
    LetConst,
    ArrowFunction,
    AsyncPlan,
    ClassExtend,
    ModuleJs,
    StructureAssignment,
    UseExtend,
  },
  data() {
    const tabs = [
      { id: '1', title: '块级作用域', view: 'let-const' },
      { id: '2', title: '语法扩展', view: 'use-extend' },
      { id: '3', title: '箭头函数', view: 'arrow-function' },
      { id: '4', title: '模块化', view: 'module-js' },
      { id: '5', title: '异步方案', view: 'async-plan' },
      { id: '6', title: '解构赋值', view: 'structure-assignment' },
      { id: '7', title: '类与继承', view: 'class-extend' },
    ]
    return {
      tabs: tabs,
    }
  },
}
</script>

<style scoped lang="stylus">

</style>
