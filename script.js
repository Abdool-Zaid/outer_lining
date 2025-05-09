
let pattern_start = '{{'
let pattern_end = '}}'
let _locations = new Map()
let state = {
    variables:{},
    locations:_locations,
    controllers: {}
}


let _mut_callback =()=>{
  let _all_elements = document.querySelectorAll('*')
  _all_elements.forEach((Element,index)=>{
      if(!Element.innerHTML.includes("</")){
          
          if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){
              
              if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
                  let variable_name= _get_variable_name(Element)
                  _append_state(variable_name, Element)
                  _match_location()

                  
              }
            }
        }
    })
    
    
}


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true }; 

const observer = new MutationObserver(_mut_callback);
let _state_node = document.createElement('state')

document.addEventListener('DOMContentLoaded', ()=>{ // add state 
    
    
    document.head.appendChild(_state_node)
    _mut_callback() // call once to initialise the state
    _state_node.state = state
})

observer.observe(_state_node, config) 



let _get_variable_name = (Element)=>{
    let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
    let i_end = Element.innerHTML.indexOf(pattern_end)
    let variable_name = Element.innerHTML.slice(i_start,i_end)
    // console.log(variable_name)
    return variable_name
}


let _append_state= (variable_name, element)=>{
    if(state.variables.variable_name==undefined){   // not catching properly
        
        state.variables[variable_name]= null
        state.locations.set(variable_name, element);
        
    }else{
        console.log(state.locations)
        // if(!state.locations.variable_name.includes(uid)){ //todo refactor to map logic
        //     console.log("should add uid", uid)
        // }    
    }

}

let _match_location= ()=>{
    let match_array =Object.keys(state.variables) 
    match_array.forEach((data, i)=>{
        let el = get_element_by_uid(data)
        el.innerHTML= el.innerHTML.replace(`${pattern_start}${data}${pattern_end}`,`${state.variables[data]}`)
    })
}

function get_element_by_uid (variable_name){

    return state.locations.get(variable_name) || null;
}
 



