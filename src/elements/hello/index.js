//游戏成功
import { define, WeElement } from 'omi'
import style from './_index.css'

define('tip-element', class extends WeElement {
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

 /* render(props, data, store) {
    return (
   
    
      <h1>{{ msg }}</h1>
      
        <input type="text" name="username" v-model="userName"></input>
        <input type="text" name="age" v-model="age"> </input>
        <a href="javascript:;" onClick={this.store.addUser()}>提交</a>
      
        )
      }
    })*/

    render(props, data, store) {
      return (
        
        <div class='hello' >
       <h4>将表中数字按顺序 从左到右 从上到下 末尾为空 即可</h4>
        </div>
        
      )
    }
  })
  