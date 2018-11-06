import './Danmaku.less'
import Danmaku from './Danmaku.js'

function getDan() {
  const dan = []
  for (let i = 0; i < 1000; i++) {
    dan.push(Math.floor(Math.random() * 1000000))
  }
  return dan
}

new Danmaku({
  // el: document.getElementById('container'),
  dan: getDan()
  // speed: 20, // 1000px/s
  // danHeight: 40,
  // extraWidth: 20,
  // spaceX: 10,
  // spaceY: 10
})
