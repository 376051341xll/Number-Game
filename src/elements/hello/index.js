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
        
        <div class='hello'>
        <a  onClick={this.store.showmemo()} style='font-size:25px'>游戏记录</a>
        <table class='table1'>
          <tr>
            <th>时间</th>
            <th>等级</th>
            <th>步数</th>
            <th>所用时间s</th>
            </tr>
            {this.store.data.infolen.map((item,index) => {

       console.log(item)
     
   
         return (<tr>
           <th>{JSON.parse(this.store.data.info[item]).memo}</th>
           <th>{JSON.parse(this.store.data.info[item]).level}</th>
           <th>{JSON.parse(this.store.data.info[item]).step}</th>
           <th>{JSON.parse(this.store.data.info[item]).time+'s'}</th>
           </tr>)
       

      
       
       
   })}  

         
            
                </table>
        </div>
        
      )
    }
  })
  