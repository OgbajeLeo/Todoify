function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


//ADD AND SAVE TODO TO LS
const DB_NAME ="todo-db"
const addTodo =()=>{
    const todoInput=document.querySelector("#todo-input");

    const Todo ={
        uuid:uuid(),
        title:todoInput.value,
        created_on: Date.now()
    }
    const newTodo = JSON.parse(localStorage.getItem(DB_NAME) )|| []
    
    localStorage.setItem(DB_NAME,JSON.stringify([...newTodo,Todo]))
    todoInput.value='';
    fetchTodo()

}

//fetch and renders todo to TODOLIST
const fetchTodo =()=>{
    const todoInstance =JSON.parse(localStorage.getItem(DB_NAME))
    const todoWrapper = document.querySelector('#todoContainer');
    const todos = (todoInstance.sort((a,b)=>{
        a.created_on > b.created_on ? 1: a.created_on < b.created_on ?-1 :0
    })).map((todo)=>[
        `
        <div class="flex group text-center py-3 px-3 rounded-lg justify-between mx-auto hover:bg-slate-100">
            <a href="">${todo.title}</a>
            <section class="flex gap-4 hidden group-hover:block">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
                  
                <button onclick="deleteTodo('${todo.uuid}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                </button>    
            </section>
          </div> 
        `
    ])
    console.log(todoInstance)
    todoWrapper.innerHTML=todos.join('');
}

//DELETE TODO
const deleteTodo =(id)=>{
    

    const newDb = JSON.parse(localStorage.getItem(DB_NAME))

    const newDbfilter = newDb.filter((todo)=>{todo.id !== id})

    console.log(newDbfilter)
    
    localStorage.setItem(DB_NAME,JSON.stringify(newDbfilter))
    fetchTodo();
}


//UPDATE TODO


fetchTodo();