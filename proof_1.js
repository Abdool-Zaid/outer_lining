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
       set_theme : _set_theme
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

function _set_theme(){ // todo adjust to use custom theme 
const styles = document.createElement('style')

let theme = 'default'
_prefers_dark_theme? theme ='dark' : theme ='light'

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
styles.textContent = cssRules;
document.head.appendChild(styles);

}

window.addEventListener('DOMContentLoaded',()=>{
    _set_theme()
    console.log(document.getElementById) // might want to extend to find by custom attribute
})


const state = new Proxy(_state, _handler);