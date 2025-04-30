
let pattern_start = '{{'
let pattern_end = '}}'

window.addEventListener('DOMContentLoaded',()=>{ // find the stuff that needs to change
    // console.log("content has been loaded")
   let all_elements = document.querySelectorAll('*')
    all_elements.forEach(Element=>{
        if(!Element.innerHTML.includes("</")){
        
            if(Element.innerHTML.includes(pattern_start) && Element.innerHTML.includes(pattern_end))
                if(Element.innerHTML.indexOf(pattern_start)< Element.innerHTML.indexOf(pattern_end))
            console.log( Element.innerHTML)
        }
    })


})

