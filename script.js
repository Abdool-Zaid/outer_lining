
let pattern_start = '{{'
let pattern_end = '}}'
let locations = new Map()
 window.state = {
    variables:{},
    locations:locations,
    controllers: {}
}


let mut_callback =()=>{
  let all_elements = document.querySelectorAll('*')
  all_elements.forEach((Element,index)=>{
      if(!Element.innerHTML.includes("</")){
      
          if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){

              if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
                  let variable_name= get_variable_name(Element)
                  append_state(variable_name, Element)
                  match_location()
                  
              }
            }
        }
    })
    
    
}


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver(mut_callback);

document.addEventListener('DOMContentLoaded', ()=>{ // add state 
    
    const state_node = document.createElement('state')
    document.head.appendChild(state_node)
    console.log('should add state here', document.head)

})

observer.observe(document, config) // can be state instead of document ?



let get_variable_name = (Element)=>{
    let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
    let i_end = Element.innerHTML.indexOf(pattern_end)
    let variable_name = Element.innerHTML.slice(i_start,i_end)
    // console.log(variable_name)
    return variable_name
}


let append_state= (variable_name, element)=>{
    if(window.state.variables.variable_name==undefined){   // not catching properly
        
        window.state.variables[variable_name]= null
        window.state.locations.set(variable_name, element);
        
    }else{
        console.log(window.state.locations)
        // if(!window.state.locations.variable_name.includes(uid)){ //todo refactor to map logic
        //     console.log("should add uid", uid)
        // }    
    }

}

let match_location= ()=>{
    console.log(window.state.variables)     
    let match_array =Object.keys(window.state.variables) 
    match_array.forEach((data, i)=>{
        let el = get_element_by_uid(data)
        el.innerHTML= el.innerHTML.replace(`${pattern_start}${data}${pattern_end}`,`${state.variables[data]}`)
    })
}

function get_element_by_uid (variable_name){

    return window.state.locations.get(variable_name) || null;
}

