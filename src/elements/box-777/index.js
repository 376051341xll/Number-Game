//游戏页面
import { define, WeElement } from 'omi'
import style from './_index.css'

define('box-777', class extends WeElement {
 

  css() {
    return style
  }

  render(props, data) {
    return (
      <div >       
        {props.text}&nbsp;
      </div>
    )
  }

  clickd = (text,index,si) => {
  
    console.log(text, index, si)
    
  }



})


