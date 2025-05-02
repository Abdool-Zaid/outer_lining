
console.log(window.state)


let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    window.state.variables.x_num= window.state.variables.x_num + 1
    console.log(window.state.variables.x_num)
})