let _state ={
    data:{},
    themes: {
        light:{
            primary: '',
            secondary: '',
            accent : '',
        },
        dark:{
            primary: '#050808',
            secondary: '#333535',
            accent : '#ff8847',
        },
    },
    _locations:[],
    controllers:{
        wants_dark_theme :(arg)=> _prefers_dark_theme(arg)
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





function _prefers_dark_theme(func) { // might be better to put styling stuff in a seperate style file
    if(typeof(func)== 'function'){
        func()
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

function _set_theme(){
const styles = document.createElement('style')

let theme = 'default'
_prefers_dark_theme? theme ='dark' : theme ='light'

const cssRules = `
    *{
        background-color: ${state.themes[theme].primary};
        color:${state.themes[theme].secondary};
    }
`;

styles.textContent = cssRules;
document.head.appendChild(styles);

}
window.addEventListener('DOMContentLoaded',()=>{
    _set_theme()
})


const state = new Proxy(_state, _handler);