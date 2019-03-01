//时间计时

import { define, WeElement } from 'omi'
import dayjs from 'dayjs'
import style from './_index.css'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createPublicKey } from 'crypto';

define('life-love', class extends WeElement {
  static get data() {
    return { dateBar: '' }
  }
    install() {
        dayjs.extend(relativeTime)
  }
    installed() {
        this.interBarDate()
    
    }
    interBarDate() {
        setInterval(() => {
            this.barDateSet()        
        }, 300);
    }
    barDateSet() {
        let bdate = '0'
        bdate = dayjs(bdate).add(300, 's')
        const nowDay = dayjs()
        this.store.intertBarTime('倒计时'+bdate.diff(nowDay,'second')+'s')
    }
  
  css() {
    return style
  }

 render(props, data, store) {
    return (
      
       <a type="button">{this.store.data.content}</a>
    
    )
  }
})
