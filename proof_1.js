let pattern_start = '{{'
let pattern_end = '}}'
let  _locations= []
let _state ={
    data:{}, // might switch to io in the future
    themes: {
        wants_dark_theme : _prefers_dark_theme(),
        light:{
            primary: 'white',
            secondary: 'black',
            accent : 'blue',
        },
        dark:{
            primary: '#050808',
            secondary: '#86e9a5',
            accent : '#ff8847',
        },
    },
    controllers:{
       set_theme :(theme) =>_set_theme(theme),
       set_data:(key,value)=> _set_variable(key,value),
       set_input:(key,value)=> _set_input_variable(key,value) 
    }
}



const _handler = { // chore: add hooks for user defined functions
    get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], _handler)
        } else {
          return target[key];
        }
  
      },
      set (target, key, value) {
        
        target[key] = value;
        _set_variables_in_dom(key)
        return true
      }
};

function _get_value_from_template(template){
  let ref = template.replaceAll(pattern_start,'')
  ref = ref.replaceAll(pattern_end,'')
  return ref
}


function _prefers_dark_theme() { // might be better to put styling stuff in a seperate style file
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

function _set_theme(theme){   
   
    if(theme === undefined){
        theme = _prefers_dark_theme() ? 'dark' : 'light';
    }else if (!Object.keys(state.themes ).includes(theme)){
      return  alert("theme is not in state.themes, this argument can be ommited to use default theme ")
    } 
    // chore: extend this to handle all css things
    const cssRules = ` 
    *{
    background-color: ${state.themes[theme].primary};
    color:${state.themes[theme].secondary};
    font-family: monospace;
    }
    a:-webkit-any-link{        
        color:${state.themes[theme].accent};
        }
        `;

    if(document.getElementById('outer_lining_styles')){
      const  styles= document.getElementById('outer_lining_styles')
      styles.textContent = cssRules;
    }else{
        const styles = document.createElement('style')
        styles.id ='outer_lining_styles'
            styles.textContent = cssRules;
            document.head.appendChild(styles);
        }

}



function _set_input_variable(key,value){

    state.data[key]= value //value should be displayed as placeholder

}

function _set_variable(key,value){
   
    state.data[key]= value
}

function _set_variables_in_dom(key){
  _render_custom_DOM_elements()
  let _all_elements = document.querySelectorAll("*")

  _all_elements.forEach((Element)=>{

    if(Element.attributes.template != undefined && Element.attributes.template.includes(`${pattern_start}${key}${pattern_end}`)){ // if you have a template use it , else check if you should have
      
               _interpolate_element (Element, key)   

    }else{
      if(!Element.innerHTML.includes("</") && Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){
        if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
          
           Element.state = {}
           Element.attributes.template = Element.innerHTML
          //  console.log(Element.attributes.template)// should show html with pattern still
            _interpolate_element (Element, key)   
          } 
        } 
    }

  })
}

function _handle_inputs(Element){ 
  let ref =  Element.value.replaceAll(pattern_start,'') // after merge, clean this up with _get_value_from_template 
    ref= ref.replaceAll(pattern_end,'')
    Element.placeholder= state.data[ref]
    Element.value=''
    Element.state= {}
    Element.state[ref]= ref
  Element.addEventListener('change',(Event)=>{
    if(Element.value.length>0){

      state.data[ref]= Element.value  
      
      Element.value=''
    }

  })

}

function _handle_loop(Element){
  let count= Element.getAttribute('count')
  let templates=[]
  let children = Element.children; 
  Array.from(children).forEach(child => {
    if(child.attributes.template != undefined){  //dynamic elements should already have a template
      templates.push(child.attributes.template)
    }
  });
  if(count.includes(pattern_end && pattern_end)){// for dynamic array lengths
    count = _get_value_from_template(count) 
    count = state.data[count]
    
  }else{
  }
    let temp = Element.firstChild.outerHTML
    Element.innerHTML =''
    for (let index = 0; index < count; index++) {
      Element.innerHTML += temp
      
    }
    children = Element.children; 
    Array.from(children).forEach(child => {

      if (templates.length>0 ){
        child.state = {}
        child.attributes.template = templates[0] 
      }
    });
  
}

function _interpolate_element (Element, key){
  Element.state[key]= key
  let variables = Object.keys(Element.state)
  let res  =Element.attributes.template 
    variables.forEach(data=>{ //incrementally build the string so that we can handle as many pieces of data as we need to
      res = res.replaceAll(`${pattern_start}${data}${pattern_end}`, state.data[data])
    })
    Element.innerHTML = res 
     
}

function _render_custom_DOM_elements(){
 let _all_elements = document.querySelectorAll("*") 
 
  
    _all_elements.forEach(Element=>{ // handle the different element types here
      switch (Element.tagName) {
        case 'LOOP':
            _handle_loop(Element)
          break;
        case 'INPUT' :
             _handle_inputs(Element)
          break;
        default:
          break;
      }

    })

}


window.addEventListener('DOMContentLoaded',()=>{
  _render_custom_DOM_elements()
    _set_theme()
    
})


const state = new Proxy(_state, _handler);