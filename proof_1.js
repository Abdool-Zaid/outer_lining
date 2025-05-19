let pattern_start = '{{'
let pattern_end = '}}'
let  _locations= []
let _state ={
    data:{},
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
       set_data:(key,value)=> _set_variable(key,value) 
    }
}
const _handler = { // add hooks for user defined functions
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





function _prefers_dark_theme() { // might be better to put styling stuff in a seperate style file
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

function _set_theme(theme){   
   
    if(theme === undefined){
        theme = _prefers_dark_theme() ? 'dark' : 'light';
    }else if (!Object.keys(state.themes ).includes(theme)){
      return  alert("theme is not in state.themes, this argument can be ommited to use default theme ")
    } 

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

function _set_variable(key,value){
   
    state.data[key]= value
}

function _set_variables_in_dom(key){
  let _all_elements = document.querySelectorAll("*")

  _all_elements.forEach((Element)=>{

    if(Element.attributes.template != undefined && Element.attributes.template.includes(`${pattern_start}${key}${pattern_end}`)){ // if you have a template use it , else check if you should have
      
               _interpolate_element (Element, key)   

    }else{
      if(!Element.innerHTML.includes("</") && Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){
        if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
          
           Element.state = {}
            Element.attributes.template = Element.innerHTML
            _interpolate_element (Element, key)   
          } 
        } 
    }

  })
}

function _handle_loop(Element){
let count= Element.getAttribute('count')
  Element.attributes.template = Element.innerHTML 
  if(count.includes(pattern_end && pattern_end)){
    // handle custom number 
  }else{
    Element.innerHTML= ''
    for (let index = 0; index < count; index++) {
      Element.innerHTML += Element.attributes.template
    }
    let children = Element.children; 
    Array.from(children).forEach(child => {
        child.attributes.template =Element.attributes.template
    });
    if (Element.attributes.template.includes(pattern_start) && Element.attributes.template.includes( pattern_end)){ // bug: data is already set 
      console.log(Element.attributes.template)
      console.log('has dynamic data')
      // Element.children.forEach(child=>{
      //   console.log(child.innerHTML)
      // })
    }else{
        console.log('no dynamic data found')
    }

    
  }
}

function _interpolate_element (Element, key){
  Element.state[key]= key
  let variables = Object.keys(Element.state)
  let res  =Element.attributes.template
    variables.forEach(data=>{
      res = res.replaceAll(`${pattern_start}${data}${pattern_end}`, state.data[data])
    })
    Element.innerHTML = res 
     
}

function _render_custom_DOM_elements(){
 let _all_elements = document.querySelectorAll("*") 
 
  
    _all_elements.forEach(Element=>{
      switch (Element.tagName) {
        case 'LOOP':
            _handle_loop(Element)
          break;
        case 'INPUT' :
              // input stuff could go here
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