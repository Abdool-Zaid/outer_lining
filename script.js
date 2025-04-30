
let pattern_start = '{{'
let pattern_end = '}}'
let state = {
    variable:{
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
        
            if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end))
                if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
                    // add to the list of things that should be rerendered
                    get_variable_name(Element)
                    add_unique_id(Element,index)
                }
        }
    })


})

let get_variable_name = (Element)=>{
    let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
    let i_end = Element.innerHTML.indexOf(pattern_end)
    let variable_name = Element.innerHTML.slice(i_start,i_end)
    console.log(variable_name)
}

let add_unique_id = (Element, number)=>{
    let uid = "v"
        uid = uid + number +  crypto.randomUUID()
        console.log(uid)
    // todo assign id to element

    // return uid
}

// return the state for other scripts to acccess
 window.state = state