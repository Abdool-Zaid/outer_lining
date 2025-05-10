
console.log(state.themes.wants_dark_theme)

let prefers_dark_theme = state.themes.wants_dark_theme 

let theme = !prefers_dark_theme ? 'dark' : 'light'

let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    
    theme = prefers_dark_theme ? 'light' : 'dark'
    state.controllers.set_theme(theme)
    prefers_dark_theme= !prefers_dark_theme
    // state.variables.x_num++
    
})