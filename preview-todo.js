const id_to_preview = JSON.parse(localStorage.getItem("todoToPreview"));
const getTodoToPreview = () => {
  const todo_DB = JSON.parse(localStorage.getItem("todo-db"));
  const previewTodo = todo_DB.find((todo) => todo.uuid === id_to_preview);
  const previewContainer = document.getElementById("preview-todo");
  const { description, title, id } = previewTodo;
  //console.log(previewTodo);
  const mappedTodos = ` 
        <div class="flex justify-between items-center justify-center">
          <div class="" id="title">
  
           <div class="font-bold text-slate-900 container text-2xl truncate" style="max-width:200px;">${title}</div>
            <div class="text-[9px] text-gray-700">${todoDate(previewTodo.created_on)}</div>
          </div>
      
      <section class="flex gap-6" id="editDelete">
        <button onclick="editDescription()" title="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
        </svg>
        </button>
          
        <button class='' onclick="deleteTodo()" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
        </button>    
    </section>
  </div>


  <!-- Edit Description Section-->
  <div class="flex flex-col hidden mt-4" id="edit">
  <label for="titleInput" class="font-bold">Title</label>
  <input
    type="text" id="titleInput" class="form-input w-full p-2 border rounded-md mb-4" placeholder="Edit title...">
    <label for="descriptionInput" class="font-bold">Description</label>
    <textarea class="form-input w-full h-24 p-2 border rounded-md mb-4" contenteditable="true" placeholder="Add description..." id="descriptionInput"></textarea>
  <button class="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700" onclick="updateDescription()">Update</button>
</div>


      <!--Description Section-->
      <div id='desCard' class=" flex items-center justify-between border border-b-slate-300 mt-4 p-2 group">
        <div>
        <b class="text-gray-400">Description:</b><br>
         <code id='description'>${description}</code>
        </div>


         <button class="hidden group-hover:block" onclick="editDescription()" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
          </svg>
          </button>
         
        </div>

            `;
  
  previewContainer.innerHTML = mappedTodos;
};

const editDescription = () => {
  const title = document.getElementById("title").classList.add('hidden');
  const editDelete = document.getElementById("editDelete").classList.add('hidden');
  
  const description = document.getElementById("description");
  const desCard = document.getElementById("desCard");
  desCard.classList.add("hidden");

  const edit = document.getElementById("edit").classList.remove("hidden");
  const descriptionInput = document.getElementById("descriptionInput")
  const titleInput = document.getElementById("titleInput");
  titleInput.focus();

  //making the todo title and  description editable on the form
  const todo_DB = JSON.parse(localStorage.getItem("todo-db"));
  let previewTodo = todo_DB.find((todo) => todo.uuid === id_to_preview);
  descriptionInput.innerText = previewTodo.description;
  titleInput.value=previewTodo.title;
  const length = descriptionInput.value.length;
  descriptionInput.setSelectionRange(length, length);
};

const updateDescription = () => {
  const descriptionInput = document.getElementById("descriptionInput");
  const titleInput = document.getElementById("titleInput");

//checks if title is empty
  if (!titleInput.value) {
    Swal.fire("", "Title cannot be empty.", "warning");
    return;
  }
  //Checks if description is empty
  if (!descriptionInput.value || descriptionInput.value === 'Add a description...') {
    Swal.fire("", "Description cannot be empty.", "warning");
    return;
  }

  
//saving the edited title and description to localStorage
  const todo_description_to_update = JSON.parse(localStorage.getItem("todo-db")
  );
  const updatedDescription = todo_description_to_update.map((todo) => {
    if (todo.uuid === id_to_preview) {
      return { ...todo,title:titleInput.value, description: descriptionInput.value };
    } else {
      return todo;
    }
  });
  Swal.fire("Updated!", "Your Todo has been Updated.", "success");
  saveToDatabase("todo-db", updatedDescription);
  getTodoToPreview();
};

//DELETE TODO
const deleteTodo = () => {
  const todo_DB = JSON.parse(localStorage.getItem("todo-db"));
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
      const filteredDB = todo_DB.filter((todo) => todo.uuid !== id_to_preview);
      saveToDatabase("todo-db", filteredDB);
      Swal.fire("Deleted!", "Your Todo has been deleted.", "success");
      window.location.href='/index.html'
    }
  });
};



getTodoToPreview();
