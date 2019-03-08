import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs';
/* eslint-disable no-new */

// 此处需要use后，this.$http.get或者this.$http.post才可以
Vue.use(VueRouter)
Vue.use(VueResource)


export default {

  name:'hello',
  data: {
    name: '点击倒计时',
    dateBar: '',
    numcount: [1, 2, 3, 4, 5, 6, 7, 8, ''],
    steps:-1,
    totalTime: 300,
    content: '移动数字即开始倒计时',
    canClick: true,

    info:{},
    infolen:[],
    button:-1
  },
  

  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  
clickbutton(){
  this.data.button=this.data.button+1;
  console.log('按钮'+this.data.button)
},
  
//axio代替ajax请求数据,显示数据信息
showmemo() { 
  this.data.button=this.data.button+1;
  console.log('按钮'+this.data.button)
  axios.
  get('http://localhost:3000')
  .then(response => {
    for(let i=0; i<response.data.length;i++)
    {
      this.data.info[i]=JSON.stringify(response.data[i])
      this.data.infolen[i]=i;
     
      
    }
   

  
  })
  .catch(error => {
    console.log(error)
    this.errored = true
  })
},

  revNumcount(index, nide) {
    // console.log('store-click', index)
    let vap = this.data.numcount[nide]
    this.data.numcount[nide] = this.data.numcount[index]
    this.data.numcount[index] = vap
    // let isResult = this.data.numcount.every((elex, index, array) => {
    //   // console.log(
    //   //   'txt',
    //   //   elex,
    //   //   'index',
    //   //   index,
    //   //   elex == index + 1,
    //   //   index == array.length - 1
    //   // )
    //   return elex == index + 1 || index == array.length - 1
    // })
    // // console.log(isResult)
    // if (isResult) {
    //   alert('恭喜发财，通关成功！')
    // }
  },


//移动一次记录一步
  addsteps(){
   
    this.data.steps=this.data.steps+1;
    
    if(this.data.steps==2){
      this.countDown();
    }
  },

//清空步数
  clearsteps(){
    this.data.steps=0;
   
  }
,


//倒计时函数
countDown () {
  if (!this.data.canClick) return  //
  this.data.canClick = false
  this.data.content = '倒计时'+this.data.totalTime + 's'
  console.log(this.data.content)
  //梯度算法，保证倒计时一直正常运行
  let clock = window.setInterval(() => {
   this.data.totalTime--
   this.data.content ='倒计时'+ this.data.totalTime + 's'
   if(this.data.steps==1){
     this.data.totalTime=300;
     this.data.content='移动数字即开始倒计时'
     this.countDown();
   }
   if (this.data.totalTime < 0) {
    alert("时间已用完，重新开始");
    location. reload()
    /*window.clearInterval(clock)
    this.data.content = '倒计时'
    this.data.totalTime = 10
    this.data.canClick = true  //这里重新开启*/
   }
  },1000)
  
 },


   //当前时间
   timeFormate(timeStamp) {
    let year = new Date(timeStamp).getFullYear();
    let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
    let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
    let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
    let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
    // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
    // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
    this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
    return this.nowTime;
    //console.log(this.nowTime);
  },
// 定时器函数
  nowTimes(){
    let a= this.timeFormate(new Date());
   
    return a
  },

  intertBarTime() {
    // console.log('date-bar');
    this.data.dateBar = this.nowTimes();
   
  },


  addmemo(si) {  
    let data= {"time":this.data.dateBar=this.nowTimes(),"level":si+'*'+si,"step1":this.data.steps,"time1":300-this.data.totalTime};
    console.log(data)
    axios.post('http://localhost:3000/add',qs.stringify(data,{ indices: false }),{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(res=>{
      
      console.log('res=>',res);            
  })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
  
   },

 

 
}
