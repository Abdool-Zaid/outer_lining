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


const handler = {
    get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], handler)
        } else {
          return target[key];
        }
      },
      set (target, key, value) {
        console.log(target)
        if(key === 'x_num'){
            console.log(key, 'key');
            let x_num = document.getElementById('var_1')
            x_num.innerHTML= value
            target[key] = value;
        }
        return true
      }
};


const state = new Proxy(_state, handler);



document.addEventListener('DOMContentLoaded',()=>{
    let y_num = document.getElementById('var_2')
    let x_num = document.getElementById('var_1')
    x_num.innerHTML= state.variables.x_num
    y_num.innerHTML= state.variables.y_num
})



