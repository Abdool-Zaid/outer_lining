
let pattern_start = '{{'
let pattern_end = '}}'
let state = {
    variables:{
        init:"variable"
    },
    locations:{
        _init: []
    },
    controllers: {}
}

window.addEventListener('DOMContentLoaded',()=>{ // find the stuff that needs to change
    // console.log("content has been loaded")
   let all_elements = document.querySelectorAll('*')
    all_elements.forEach((Element,index)=>{
        if(!Element.innerHTML.includes("</")){
        
            if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){

                if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
                    let variable_name= get_variable_name(Element)
                    add_unique_id(Element,index)
                    append_state(variable_name, Element.uid)
                    // add to the list of things that should be rerendered
                    
                }
            }
        }
    })
    
    
})

let get_variable_name = (Element)=>{
    let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
    let i_end = Element.innerHTML.indexOf(pattern_end)
    let variable_name = Element.innerHTML.slice(i_start,i_end)
    // console.log(variable_name)
    return variable_name
}

let add_unique_id = (Element, number)=>{
    if(Element.uid== undefined){
        /* This is a comment */
        let uid = "v"
        uid = uid + number +  crypto.randomUUID()
        Element.uid = uid
        
    }  else{
        console.log("element has uid already")
    }
}
let append_state= (variable_name, uid)=>{
    if(state.variables.variable_name==undefined){ // must add variable
        
        state.variables[variable_name]= null
        state.locations[variable_name]= [uid]
        
    }else{
        if(!state.locations.variable_name.includes(uid)){
            console.log("should add uid", uid)
        }    
    }

}

 window.state = state