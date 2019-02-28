export default {
  data: {
    name: '点击图标开始计时',
    dateBar: '',
    numcount: [1, 2, 3, 4, 5, 6, 7, 8, '']
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
  }
}
