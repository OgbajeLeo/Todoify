
//function to generate a unique Id 
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//Database
const todo_DB =() =>{ JSON.parse(localStorage.getItem(DB_NAME) )|| []}


//InputPrompt
const inputCheck =(toast)=>{
    if(!todoInput.value){

        const formMessage = document.querySelector("#prompt");       
        formMessage.classList.remove('hidden');
        formMessage.innerHTML = toast

        setTimeout(()=>{
            formMessage.classList.add('hidden')
        },5000)
        return
    }
}