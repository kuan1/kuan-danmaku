class Danmaku {
  constructor(options = {}) {
    this.options = options
    this.el = options.el || document.getElementById('danmaku-container') // 最外层元素
    this.wrap = this.el.getElementsByClassName('danmaku-wrap')[0] // 滚动body
    this.dan = options.dan || [] // 所有数据
    this.speed = options.speed || 20 // 速度
    this.danHeight = options.danHeight || 40 // 单个高度
    this.extraWidth = options.extraWidth || 20 // 额外高度
    this.spaceX = options.spaceX || 10 // 额外高度
    this.spaceY = options.spaceY || 10 // 额外高度
    this.init()
    window.addEventListener('resize', this.init.bind(this))
  }

  reload(newAPI) {
    this.options.api = newAPI
    this.dan = []
  }

  init() {
    if (!this.dan.length) return
    const data = this.formatData()
    console.log(data)
    this.setHtml(data)
  }

  formatData() {
    const itemHeight = this.danHeight + this.spaceY
    const rowsNum = Math.floor(this.el.clientHeight / itemHeight) || 1
    this.wrap.style.height = `${rowsNum * itemHeight}px`

    const rowsWidthArr = [...Array(rowsNum)].map(() => 0) // 记录每一组高度

    const data = this.dan.map(text => {
      const width = this.measure(text) + this.extraWidth + this.spaceX
      const minWidth = Math.min(...rowsWidthArr)
      const index = rowsWidthArr.findIndex(item => item === minWidth)
      const top = itemHeight * index + this.spaceY / 2
      rowsWidthArr[index] = minWidth + width
      return {
        text,
        width,
        top,
        left: minWidth
      }
    })
    const maxWidth = Math.max(...rowsWidthArr)
    const speed = (maxWidth / 1000) * this.speed
    this.wrap.style.width = `${maxWidth}px`
    this.wrap.style['animation-duration'] = `${speed}s`
    this.wrap.style['-webkit-animation-duration'] = `${speed}s`
    return data
  }

  // 生成html
  setHtml(data) {
    const html = data.reduce(
      (html, item) =>
        `${html}<div style="height: ${this.danHeight}px;line-height: ${
          this.danHeight
        }px;left: ${item.left}px;top: ${item.top}px" class="danmaku-item">${
          item.text
        }</div>`,
      ''
    )
    this.wrap.innerHTML = html
  }

  // 获取文字宽度
  measure(text) {
    if (!this.context) {
      const measureStyle = getComputedStyle(this.wrap, null)
      this.context = document.createElement('canvas').getContext('2d')
      this.context.font = measureStyle.getPropertyValue('font')
    }
    return this.context.measureText(text).width
  }
}

export default Danmaku
