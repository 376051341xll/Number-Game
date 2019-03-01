export default {
  data: {
    name: '点击倒计时',
    dateBar: '',
    numcount: [1, 2, 3, 4, 5, 6, 7, 8, ''],
    steps:-1,
    totalTime: 300,
    content: '移动数字即开始倒计时',
    canClick: true
  },
  

  rename(name) {
    this.data.name = name
  },
  intertBarTime(dateBar = '') {
    // console.log('date-bar');
    this.data.dateBar = dateBar
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
    console.log(this.data.steps)
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

 
}

 
