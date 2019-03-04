//游戏初始化
import { define, WeElement } from 'omi'
import style from './_index.css'
import logo from './logo.png'
import '../box-777'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import $ from 'jquery' ;

define('app-777', class extends WeElement {
  // static observe = true
  static get data() {
    return { numcount:[] }
  }
  
  data = {
    intime: null,
    bossIndex:0 // 关键index
  }


  install() { // 初始化
    this.randNumCount();
   // dayjs.extend(relativeTime)
  }
  installed() {
  //  this.interBarDate()
  }
/*

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


*/


  revNumCount = (index, nide) => { // 转换
    // console.log('index-revcount',index,nide)
    // this.data.bossIndex=index
    this.store.revNumcount(index, nide)
    this.alertResult()
  }

  alertResult() {
    // 验证最后一位是否空
    if (this.store.data.numcount[this.store.data.numcount.length - 1] != '') {
      return
    }
    if (this.data.intime) {
      clearTimeout(this.data.intime)
      this.data.intime=null
    }
    this.data.intime=setTimeout(() => {
      this.resultObj()
    }, 550);
   
  }
  resultObj() {
    // console.log('reuslt-----')
    let isResult = this.store.data.numcount.every((elex, index, array) => {
      return elex == index + 1 || index == array.length - 1
    })
    if (isResult) {
      
      this.store.addmemo(this.store.data.si)

      alert('恭喜发财，通关成功！记录已保存')
       this.store.clearsteps();
       this.upLevel();
    
      
  
    }
  }
  upLevel() {
    // 升级难度
    let level=this.store.data.si+1
    this.randNumCount(level*level,level);
   
    
    
  }

  //初始化游戏
  randNumCount(kk=9,si=3) { 
    // 位数
    // const kk = 9
    let map = []
    for (let i = 1; i < kk; i++) { 
      map.push(i)
    }
    map.push('')
    // 随机空位
   /*  // 随机bug 会有无解情况，类似 15 14 or 8 7 逆序，解决方法按正常顺序生成 随机步数
   let emtIndex = this.getRandomIntOk(kk)
    let map = []
    let isNumber={}
    for (let i = 0; i < kk; i++){
      if (emtIndex == i) {
        map.push('')
      } else {
        let num =this.getRandomIntOk(kk,isNumber)
        map.push(num)
      }
      
    }*/
    this.store.data.numcount=map
    this.store.data.si = si
    this.data.bossIndex=map.length-1// 记录位置
    this.initNumber()
    
  }
  initNumber() { // 随机打乱
    // 随机下标 随机移动
    let i = 0
    const max=500 // 随机步数
    while (i < max) {
      this.clickBox(undefined,this.getRandomBossIndex(this.data.bossIndex))
      i++
    }
  }
  getRandomBossIndex(index) {
    // 随机上下左右
    let i = this.getRandomInt(0, 4)
    let n=0
    switch (i) {
      case 0:
        if (index >= this.store.data.si) { 
          n = index - this.store.data.si
          break;
        }
        
      case 1:
        if (index + this.store.data.si < this.store.data.numcount.length) {
          n = index + this.store.data.si    
          break;
        }
        
      case 2:
      if ((index) % this.store.data.si > 0) {
        n = index - 1  
        break;
      }
        
      case 3:
      if ((index) % this.store.data.si < (this.store.data.si-1)) { 
        n = index + 1
        break;
      }
        
      default:
      if (index >= this.store.data.si) { 
        n = index - this.store.data.si
      }else   if (index + this.store.data.si < this.store.data.numcount.length) {
        n = index + this.store.data.si    
      }else  if ((index) % this.store.data.si > 0) {
        n = index - 1  
      }else if ((index) % this.store.data.si < (this.store.data.si-1)) { 
        n = index + 1
      }
      // n = index - this.store.data.si
        break;
    }
    this.data.bossIndex=n
    return n
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  // data= {
  //   index: -1, // 计数器
  //   si:3, // 取余数
  //   globalCount: [1, 2, 3, 4, '', 6, 7, 8, 9]
  // }
  // globalData:['globalCount']
  // + `.plane { width:${this.store.data.si*110}px}` 
  css() {
    return style 
  }
 
  clickBox = (text,index) => {
    // 规则 根据下标 获取相邻四个位置（上index-si 下index+si 左index-1 右index+1）值
    console.log('val', this.countValBy(index, 'up'), this.countValBy(index, 'down'), this.countValBy(index, 'left'), this.countValBy(index, 'right'))
    // console.log('list',this.store.data.numcount)
    
  }

  countValBy = (index, type) => {
    
    let myval = null
    let nide = null
    switch (type) {
      case 'up':
        nide = index - this.store.data.si
        break;
      case 'down':
        nide = index+this.store.data.si
        break;
      case 'left': // 左右跟globalSi取余大于1
        if ((index) % this.store.data.si > 0) {
          nide =index-1  
        }
        
        break;
      case 'right':
        
        if ((index) % this.store.data.si < (this.store.data.si-1)) { 
          nide=index+1
        }
        
        break;
      default:
        break;
    }
    if (nide >= 0 && this.store.data.numcount.length > nide) {
      myval = this.store.data.numcount[nide]
      if (myval == '') {
        this.revoleCountByIndexAndType(index,nide)
      }
    }
    return type+'='+myval;
  }
  revoleCountByIndexAndType(index,nide) {
    // console.log('revole');
    // let vap = this.data.globalCount[nide]
    // this.data.globalCount[nide] = this.data.globalCount[index]
    // this.data.globalCount[index]=vap
    // this.fire('revoleval', { index: index, nide })
    this.revNumCount(index,nide)
  }
  changeSel = evt => {
    // console.log(evt.target.value)
    if (evt.target.value) {
      let num=Number(evt.target.value)
      this.randNumCount(num*num,num)  
      this.store.clearsteps();
    }
    
  }
  
  // item,index,this.data.globalSi
  render(props,data, store) {
    return (
      
      <div>
       
           <div class="time">
           <div>
           <img type='button' 
            src={logo}
            class="app-logo"
            alt="logo"/>
            </div>
       
       
           <h1>{this.store.data.steps}  步 || <life-love></life-love>
           </h1>
           </div>
          <div>

        <select class='select1' onChange={this.changeSel} value={this.store.data.si} placeholder="change size">
          <option class='option1' value="3">3*3</option>
          <option  class='option1' value="4">4*4</option>
          <option  class='option1' value="5">5*5</option>
          <option  class='option1' value="6">6*6</option>
        </select>
       
          </div> 
         
        <div class="plane" onClick={this.store.addsteps()} style={{width:this.store.data.si*109 +'px'}} >
          {this.store.data.numcount.map((item,index) => {
       
          if (index % this.store.data.si === 0) {
            if(item==""){
              
              return (<box-777 onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class="colory" ></box-777>)
            }
            else{
              if(index+1==item){
                return (<box-777  onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class='colorg'></box-777>)
              }
            return (<box-777  onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class='color'></box-777>)
            }
          } 
          else {
            if(item==""){
              return (<box-777  onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class="colory" ></box-777>)
            }
            else{
              if(index+1==item){
                return (<box-777  onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class='colorg'></box-777>)
              }
            return (<box-777   onClick={this.clickBox.bind(this,item,index)} text={item} index={index} class="color" ></box-777>)  
            }
           
          }
          
          
          
      })}  
        </div>
      </div>
    )
  }

 
})
