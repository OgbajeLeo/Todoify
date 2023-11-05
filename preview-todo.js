
const id_to_preview =JSON.parse(localStorage.getItem('todoToPreview'))
const getTodoToPreview=()=>{
    //const id_to_preview =JSON.parse(localStorage.getItem('todoToPreview'))
    const todo_DB = JSON.parse(localStorage.getItem('todo-db'))
    const previewTodo = todo_DB.find((todo) => todo.uuid === id_to_preview)
    const previewContainer = document.getElementById('preview-todo')
    const {date,description,title,id}=previewTodo
    console.log(previewTodo);
    const mappedTodos = 

        ` 
        <div class="flex justify-between items-center justify-center">
      <div>
            <div class="font-bold text-slate-900 container text-2xl truncate" style="max-width:200px;">${title}</div>
            <div class="text-[9px] text-gray-700">${todoDate(previewTodo.created_on)}</div>
          </div>
      
      <section class="flex gap-6">
        <button onclick="('${id}')" title="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
        </svg>
        </button>
          
        <button class='' onclick="('${id}')" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
        </button>    
    </section>

  </div>
  <!-- Edit Description Section-->
  <div class="flex flex-col hidden mt-4" id="edit">
  <textarea class="form-input w-full h-24 p-2 border rounded-md mb-4" contenteditable="true" placeholder="Enter your text here..." id="descriptionInput"></textarea>
  <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md" onclick="updateDescription()">Update</button>
</div>


      <!--Description Section-->
      <div id='desCard' class=" flex items-center justify-between border border-b-slate-300 mt-4 p-2 group">
        <div><b class="text-gray-400">Description:</b><br>
         <code id='description'>${description}</code></div>


         <button class="hidden group-hover:block" onclick="editDescription()" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
          </svg>
          </button>
         
        </div>

            `
      ;
      console.log(previewTodo.uuid);
previewContainer.innerHTML=mappedTodos;
}

const editDescription =() =>{ 
  getTodoToPreview()
  const description = document.getElementById("description");
  const desCard = document.getElementById("desCard");
  desCard.classList.add('hidden');
  const edit = document.getElementById("edit").classList.remove('hidden');
  const descriptionInput =document.getElementById("descriptionInput");
  descriptionInput.focus();
  ///////////////////////
  // descriptionInput.innerText="previewTodo.description"
  // console.log(previewTodo.description)
  ///////////////////////

}

const updateDescription = ()=>{
  const descriptionInput =document.getElementById("descriptionInput");
 
  if (!descriptionInput.value) { 
      Swal.fire("", "Description cannot be empty.", "warning");
    return;
  }
   
          const todo_description_to_update = JSON.parse(localStorage.getItem('todo-db'));
          const updatedDescription = todo_description_to_update.map((todo) => {
            if (todo.uuid === id_to_preview) {
              return { ...todo, description: descriptionInput.value };
            } else {
              return todo;
            }
          });

        saveToDatabase('todo-db',updatedDescription)
        getTodoToPreview()
}

getTodoToPreview()