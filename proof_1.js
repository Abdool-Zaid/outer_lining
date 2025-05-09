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
       set_theme :(theme) =>_set_theme(theme)
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

window.addEventListener('DOMContentLoaded',()=>{
    _set_theme()
    // console.log(document.getElementById) // might want to extend to find by custom attribute
})


const state = new Proxy(_state, _handler);