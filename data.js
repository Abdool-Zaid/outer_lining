
window.state.variables.y_num = 0
window.state.variables.x_num = 0
console.log(window.state)


let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    window.state.variables.x_num++ 
})