# outer_lining

proof of concept p.1.0.0

instructions 
1. link the min.js in html and no further imports will be needed anywhere else

2. to set data use this in any js file 
    state.controllers.set_data('foo', 'bar')

3. to display the data in html, call it with double curly braces, and any time the data is changed it will be reflected in the DOM   

        <h1>{{foo}}</h1>

4. theme detection is automatic but you can set your own custom them with 
  state.controllers.set_theme("custom_theme")
  you can define your custom theme in state.themes in this format
     custom_theme:{
            primary: '#050808',
            secondary: '#86e9a5',
            accent : '#ff8847',
        }


5. you can use loops with