let pattern_start = '{{'
let pattern_end = '}}'
let _locations = new Map()
let _state = {
    variables:{
        x_num: 1,
        y_num: 0
    },
    locations:_locations,
    controllers: {}
}
const handler1= {}
const state = new Proxy(_state, handler1);



document.addEventListener('DOMContentLoaded',()=>{
    let x_num = document.getElementById('var_1')
    let y_num = document.getElementById('var_2')
    console.log(x_num.innerHTML, y_num.innerHTML)
})



