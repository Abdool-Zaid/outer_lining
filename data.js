
console.log(state.themes.wants_dark_theme)

let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    
    state.controllers.set_theme('light')
    // state.variables.x_num++
    
})