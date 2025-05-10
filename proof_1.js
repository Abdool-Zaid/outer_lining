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
        _set_variables_in_dom(key,value)
        target[key] = value;
        console.log(key,value)
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

// let _get_variable_name = (Element)=>{
//     let i_start = Element.innerHTML.indexOf(pattern_start) + pattern_start.length
//     let i_end = Element.innerHTML.indexOf(pattern_end)
//     let variable_name = Element.innerHTML.slice(i_start,i_end)
//     console.log(variable_name)
//     return [variable_name, i_end]
// }
// let _get_all_variables = (Element)=>{
//     let variables = []
//     let res = new Map()
//     let variable_count
//     let remaining_string = Element.innerHTML.length
//     let search_index= 0
//     while (search_index<remaining_string) {     
//         console.log(Element.innerHTML[search_index])
//         search_index++
//     }


//     // console.log(remaining_string)
// }


function _set_variables_in_dom(key, value){
    console.log('should set variables in dom')
    let _all_elements = document.querySelectorAll('*')
        _all_elements.forEach((Element,index)=>{
        if(!Element.innerHTML.includes("</")){
          
          if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end)){
              
              if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end)){

                Element.innerHTML = Element.innerHTML.replaceAll(`${pattern_start}${key}${pattern_end}`, value)
                  
              }
            }
        }
    })
  
}

window.addEventListener('DOMContentLoaded',()=>{
    _set_theme()
    // _get_variable_locations()
    // console.log(document.getElementById) // might want to extend to find by custom attribute
})


const state = new Proxy(_state, _handler);