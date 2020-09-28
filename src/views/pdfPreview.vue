<template>
  <div class="view">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Tab 1">
        <div class="contor">
          <a-button @click="prev">上一页</a-button>
          <a-button @click="next">下一页</a-button>
          <span>Page: <span v-text="page_num"/> / <span v-text="page_count"/></span>
          <a-button icon="plus" @click="addscale" />
          <a-button icon="minus" @click="minus" />
        </div>
        <canvas id="the-canvas" class="canvasstyle" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        <!-- <PDFH5/> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import PDFH5 from './pdfH5'
import { Button, Tabs } from 'ant-design-vue'
import * as PDFJS from 'pdfjs-dist'
console.log(PDFJS)
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker')
export default {
  components: { 'a-tabs': Tabs, 'a-tab-pane': Tabs.TabPane, 'a-button': Button, PDFH5 },
  data() {
    return {
      pdfUrl: '@/assets/dc19-07.pdf', // 这里是pdf文件地址，后台给的流文件请求地址也是可以的
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1.2, // 放大倍数
      page_num: 0, // 当前页数
      page_count: 0, // 总页数
      maxscale: 2, // 最大放大倍数
      minscale: 0.8, // 最小放大倍数
    }
  },
  computed: {
    ctx() {
      const id = document.getElementById('the-canvas')
      return id.getContext('2d')
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化pdf
      PDFJS.getDocument(this.pdfUrl)
        .promise.then(pdfDoc_ => {
          console.log(pdfDoc_)
          this.pdfDoc = pdfDoc_
          this.page_count = this.pdfDoc.numPages
          this.renderPage(this.pageNum)
        })
        .catch(err => console.log(err))
    },
    renderPage(num) {
      // 渲染pdf
      this.pageRendering = true
      const canvas = document.getElementById('the-canvas')
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(page => {
        var viewport = page.getViewport(this.scale)
        // alert(this.canvas.height)
        canvas.height = viewport.height
        this.pdfWidth = canvas.width = viewport.width
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: this.ctx,
          viewport: viewport,
        }
        var renderTask = page.render(renderContext)
        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })
      this.page_num = this.pageNum
    },
    addscale() {
      // 放大
      if (this.scale >= this.maxscale) {
        return
      }
      this.scale += 0.1
      this.queueRenderPage(this.pageNum)
    },
    minus() {
      // 缩小
      if (this.scale <= this.minscale) {
        return
      }
      this.scale -= 0.1
      this.queueRenderPage(this.pageNum)
    },
    prev() {
      // 上一页
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    next() {
      // 下一页
      if (this.pageNum >= this.page_count) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
  },
}
</script>

<style scoped lang="stylus"></style>
