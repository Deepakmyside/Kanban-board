let tasksData ={}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

// const col = document.querySelector('.task-column')
const columns = [ todo, progress, done];
let dragElement = null;
 

 function addTask(title, desc, column) {
    const div = document.createElement("div")
    div.classList.add("task")
    div.setAttribute("draggable", "true")

      div.innerHTML= `
      <h2>${title}</h2>
      <p>${desc}</p>
      <button>Delete</button>`
      column.append(div)

      div.addEventListener("drag", (e) => {
        dragElement= div;
      })
    
      const deleteButton =document.querySelector("button");
      deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
      })


      return div;
 }                            

 function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
            
            tasksData[ col.id ] = Array.from(tasks).map(t => {
            return {
                title:t.querySelector("h2").innerText,
                desc :t.querySelector("p").innerText
            }
         })

         localStorage.setItem("tasks", JSON.stringify(tasksData));
         count.innerText=tasks.length
        })
 }



if(localStorage.getItem("tasks")) {

    const data=JSON.parse(localStorage.getItem("tasks"));

     for(const col in data) {
        const column = document.querySelector(`#${col}`);
        data [ col ].forEach(task => {

            addTask(task.title, task.desc, column);

        })
        
         updateTaskCount();

         
       

     }
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
    // console.log("dragging", e);
    dragElement = task;
    })
}
)

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) =>{
        e.preventDefault();
        column.classList.remove("hover-over")
    })
//  tell browser that all three column are the place for task to drop
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    
    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        //  shifting the task from one to other column {magic: one element can be in only one parent at one time , that's how it getting auto removed from last one}
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
        
        
    
})


}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// Modal logic 
const modal= document.querySelector(".modal"); 
const modalBg = document.querySelector(".modal .bg")
const toggleModeButton = document.querySelector("#toggle-modal");
const addTaskButton = document.querySelector("#add-new-task");



 toggleModeButton.addEventListener("click", () => {
    modal.classList.toggle("active")
 })

modalBg.addEventListener("click", ()=> {
     modal.classList.remove("active")
})


addTaskButton.addEventListener("click", () => {
    
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    addTask(taskTitle, taskDesc, todo);   

       updateTaskCount();

        div.addEventListener("drag", (e) => {
            dragElement=div;
        })
      

      
         

        modal.classList.remove("active")
    
})
 
//    const deleteButton = div.querySelector(".delete-btn")
//  deleteButton.addEventListener("click", () => {
   

//    deleteButton.classList.remove("div")
//  })

 


