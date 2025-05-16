let pattern_start = '{{'
let pattern_end = '}}'

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
    _locations:[],
    controllers:{
       set_theme :(theme) =>_set_theme(theme),
       set_data:(key,value)=> _set_variable(key,value) 
    }
}
const _handler = {
    get(target, key) {
        // user defined  pre-hook
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], _handler)
        } else {
          return target[key];
        }
        // user defined post-hook
      },
      set (target, key, value) {// add hooks here as well
        target[key] = value;
        _set_variables_in_dom(key,value)
        // console.log(key,value)
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
    // console.log(key,value)
    state.data[key]= value
}

function _set_variables_in_dom(key, value){
  let _all_elements = document.querySelectorAll("*")

  _all_elements.forEach((Element)=>{

    if(Element.template != undefined && Element.template.includes(key)){ // if you have a template use it , else check if you should have
      console.log(Element.template)
               _interpolate_element (Element, key, value)   

    }else{
      if(!Element.innerHTML.includes("</") && Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){
        if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){
           console.log('setting template')
          // add variables to el.state
          Element.state= {}
          Element.template = Element.innerHTML
          _interpolate_element (Element, key, value)   
        } 
      } 
    }

  })
}


function _interpolate_element (Element, key, value){
  Element.state[key]= value
  Element.innerHTML = Element.template.replaceAll(`${pattern_start}${key}${pattern_end}`, value) 
}



window.addEventListener('DOMContentLoaded',()=>{
    _set_theme()
    // _get_variable_locations()
    // console.log(document.getElementById) // might want to extend to find by custom attribute
})


const state = new Proxy(_state, _handler);