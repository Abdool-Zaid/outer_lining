
console.log(state)


let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
     
    state.variables.x_num == null ? state.variables.x_num = 1 : true
    state.variables.x_num++
    
    console.log(state.variables.x_num)

    
})