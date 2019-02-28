//游戏成功
import { define, WeElement } from 'omi'
import style from './_index.css'

define('hello-element', class extends WeElement {
  static get data() {
    return { name: '' }
  }

  installed() {
    setTimeout(() => {
      this.store.data.name = 'Good Job!'
    }, 1000)
  }
  clickBox(val) {
    console.log(val)
  }
  css() {
    return style
  }

  render(props, data, store) {
    return (
      <div class="hello">
        <h1> {store.data.name} </h1>
        <div> I am hello element1.</div>
        <div class="omi" />
      </div>
    )
  }
})
