//时间计时
/*
import { define, WeElement } from 'omi'
import dayjs from 'dayjs'
import style from './_index.css'
import relativeTime from 'dayjs/plugin/relativeTime'

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
        }, 1000);
    }
    barDateSet() {
        let bdate = '2019-02-26'
        bdate = dayjs(bdate).add(100, 'year')
        const nowDay = dayjs()
        this.store.intertBarTime(bdate.diff(nowDay,'day')+'-day,'+bdate.diff(nowDay,'month')+'-month,'+bdate.diff(nowDay,'hour')+'-hour,'+bdate.diff(nowDay,'minute')+'-minute,'+bdate.diff(nowDay,'second')+'-second')
    }
  
  css() {
    return style
  }

 render(props, data, store) {
    return (
      <div class="life">
        <h1> {store.data.dateBar} </h1>
        <div> I am time.</div>
      </div>
    )
  }
})
*/