const DB_NAME = "todo-db";
const todoInput = document.querySelector("#todo-input");

//ADD AND SAVE TODO TO LS
const addTodo = () => {
  if (!todoInput.value) {
    const formMessage = document.querySelector("#prompt");
    formMessage.classList.remove("hidden");
    formMessage.innerHTML = "Please Enter a Todo to Add ...";

    setTimeout(() => {
      formMessage.classList.add("hidden");
    }, 5000);
    return;
  }

  const Todo = {
    uuid: uuid(),
    description:'Add a description...',
    title: todoInput.value,
    created_on: Date.now(),
  };
  const newTodo = todo_DB();
  const newTodoDB= [...newTodo, Todo]
  saveToDatabase(DB_NAME,newTodoDB)
  todoInput.value = "";
  fetchTodo();
};

//fetch and renders todo to TODOLIST
const fetchTodo = () => {
  const todoInstance = todo_DB();
  const todoWrapper = document.querySelector("#todoContainer");
  const dbEmpty = todoInstance.length === 0 || null;
  if (dbEmpty) {
    todoWrapper.innerHTML = `<p class='text-center text-slate-400'>TODOLIST IS EMPTY, Add now....</p>`;
    return;
  }

  const todos = todoInstance.sort((a, b) => {
    if (a.created_on > b.created_on) return -1;
    if (a.created_on < b.created_on) return 1;
    return 0;
    // b.created_on > a.created_on
    // a.created_on > b.created_on ? -1 : a.created_on < b.created_on ? 1 :0
  });

  const mappedTodos = todos.map((todo) => [

    ` <div class="group flex items-center justify-between p-4 mb-4 rounded-md w-full h-16 bg-slate-100 hover:bg-slate-200 text-slate-100 shadow-md">
            <button onclick="todoToProview('${todo.uuid}')" class="font-bold text-black truncate" style='max-width:400px;'>${todo.title}</button> 
            <section class="flex hidden gap-6 group-hover:block  pl-8">
                <button onclick="handleEditMode('${todo.uuid}')" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
                </svg>
                </button>
                  
                <button class='pl-4' onclick="deleteTodo('${todo.uuid}')" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
                </button>    
            </section>
          </div> 
        `,
  ]);
  // console.log(todoInstance)
  todoWrapper.innerHTML = mappedTodos.join("");
};

//DELETE TODO
const deleteTodo = (id) => {
  const new_Db = todo_DB();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const filteredDB = new_Db.filter((todo) => todo.uuid !== id);
      saveToDatabase(DB_NAME,filteredDB);
      fetchTodo();

      Swal.fire("Deleted!", "Your Todo has been deleted.", "success");
    }
  });
};

//UPDATE TODO
//handles edit mode
const handleEditMode = (id) => {
  console.log(id);

  const todo_db = todo_DB();
  const todo_to_update = todo_db.find((todo) => todo.uuid === id);

  todoInput.value = todo_to_update.title;
  todoInput.focus();
  const addBtn = document.querySelector("#add-todo-Btn");
  addBtn.classList.add("hidden");

  const updateBtn = document.querySelector("#update-todo-Btn");
  updateBtn.classList.remove("hidden");
  updateBtn.setAttribute("todo_id_to_update", id);
};

//Actual Update BTN
const updateTodo = (id) => {
  if (!todoInput.value) {
    const formMessage = document.querySelector("#prompt");
    formMessage.classList.remove("hidden");
    formMessage.innerHTML = "Kindly Enter a Title, Field cannot be empty...";

    setTimeout(() => {
      formMessage.classList.add("hidden");
    }, 5000);
    return;
  }

  const updateBtn = document.querySelector("#update-todo-Btn");
  const todo_id_to_update = updateBtn.getAttribute("todo_id_to_update");
  const todoToUpdate = todo_DB();
  const updatedTodo = todoToUpdate.map((todo) => {
    if (todo.uuid === todo_id_to_update) {
      return { ...todo, title: todoInput.value };
    } else {
      return todo;
    }
  });

  Swal.fire("Updated!", "Your Todo has been Updated.", "success");
  saveToDatabase(DB_NAME,updatedTodo)
  fetchTodo();

  todoInput.value = "";
  const addBtn = document.querySelector("#add-todo-Btn");
  addBtn.classList.remove("hidden");
  updateBtn.classList.add("hidden");
};


const todoToProview =(id)=>{
saveToDatabase('todoToPreview',id)

window.location.href='/preview-todo.html'
}


fetchTodo();
