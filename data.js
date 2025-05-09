
console.log(state.controllers.wants_dark_theme(test_func))

function test_func (){
    console.log('test func')
}

let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    
    state.variables.x_num++
    
})