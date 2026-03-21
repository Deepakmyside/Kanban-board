const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const tasks = document.querySelectorAll('.task');
// const col = document.querySelector('.task-column')
const columns = [ todo, progress, done];
 

let dragElement = null;

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
        console.log("Dropped", dragElement, column);
        //  shifting the task from one to other column {magic: one element can be in only one parent at one time , that's how it getting auto removed from last one}
        column.appendChild(dragElement);

        column.classList.remove("hover-over");

        updateCount()
        

    })
}
// Modal logic 

function updateCount(){
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const countE1 =col.querySelector(".right");
    
        if(countE1) {
            countE1.innerText= tasks.length
        }
    })
}


const modal= document.querySelector(".modal"); 
const modalBg = document.querySelector(".modal .bg")
const toggleModeButton = document.querySelector("#toggle-modal");
const addTaskButton = document.querySelector("#add-new-task");

addTaskButton.addEventListener("click", () => {
    
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    const div = document.createElement("div")
    div.setAttribute("draggable","true",)
     div.classList.add("task")
    div.innerHTML = `
            <h2> ${taskTitle} </h2>
            <p>${taskDesc}</p>
            <button class="delete-btn">Delete</button>
            `
          
        todo.appendChild(div)

        div.addEventListener("drag", (e) => {
            dragElement=div;
        })

        updateCount()
        modal.classList.remove("active")
    
})
 
//    const deleteButton = div.querySelector(".delete-btn")
//  deleteButton.addEventListener("click", () => {
   

//    deleteButton.classList.remove("div")
//  })

 
toggleModeButton.addEventListener("click", () => {
    modal.classList.toggle("active")

})

modalBg.addEventListener("click",() => {
    modal.classList.toggle("active")
})
  



 
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress)
addDragEventsOnColumn(done)