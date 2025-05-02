
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


let mut_callback =()=>{
  let all_elements = document.querySelectorAll('*')
  all_elements.forEach((Element,index)=>{
      if(!Element.innerHTML.includes("</")){
      
          if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){

              if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
                  let variable_name= get_variable_name(Element)
                  add_unique_id(Element,index)
                  append_state(variable_name, Element.uid)
                  match_location()
                  
              }
          }
      }
  })
  
  
}


// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver(mut_callback);

observer.observe(document, config)




let get_variable_name = (Element)=>{
    let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
    let i_end = Element.innerHTML.indexOf(pattern_end)
    let variable_name = Element.innerHTML.slice(i_start,i_end)
    // console.log(variable_name)
    return variable_name
}

let add_unique_id = (Element, number)=>{
    if(Element.uid== undefined){
        let uid = "v"
        uid = uid + number +  crypto.randomUUID()
        Element.uid = uid
        
    }  else{
        console.log("element has uid already")
    }
}
let append_state= (variable_name, uid)=>{
    if(state.variables.variable_name==undefined){ 
        
        state.variables[variable_name]= null
        state.locations[variable_name]= [uid]
        
    }else{
        if(!state.locations.variable_name.includes(uid)){
            console.log("should add uid", uid)
        }    
    }

}

let match_location= ()=>{
    let match_array =Object.keys(state.variables) 
    match_array.forEach((data, i)=>{
        
        if (state.locations[data]!= undefined){
            for (let index = 0; index < state.locations[data].length; index++) {
                    console.log(state.locations[data][index])
                let element = get_element_by_uid(state.locations[data][index].toString())
                console.log(state.variables[data], element)
                // element.innerHTML= state.variables[data] 
                element.innerHTML= `state.variables[data]` 
            }
        }    
    })
}

function get_element_by_uid (uid_str){

    let allElements = document.querySelectorAll('*');
    

        for (const element of allElements) {
            if (element.uid === uid_str) {
                return element;
            }
}

// Return null if no element is found
return null;
}

 window.state = state