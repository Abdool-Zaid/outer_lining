

    state.controllers.set_data('x_num', 1)
    state.controllers.set_data('y_num', 0)
    state.controllers.set_input('text_inp_1', 'str_1')
    

let action_btn = document.getElementById('action_btn')
action_btn.addEventListener('click', ()=>{
    
    state.data.x_num++
    // [state.data.y_num,state.data.x_num] = [state.data.x_num,state.data.y_num]
})