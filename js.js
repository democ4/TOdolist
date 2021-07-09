

let projectList=[];
  if(JSON.parse(localStorage.getItem("projects"))){projectList = JSON.parse(localStorage.getItem("projects")) }
  let currentProject=projectList[0];
  if(document.getElementsByClassName("object-item").length>0) document.getElementsByClassName("object-item")[projectList.indexOf(currentProject)].classList.add("current")


let addobjectForm = document.getElementById("add-object-form");
let addproject =document.getElementById("addproject");

function removeME(e){
    if (this.parentNode.className=="tesk tesk-item"){
        // remove this.parentNode.firstChild,innerHtml from currentproject.todolist
        currentProject.todolist.forEach(todo=>{
            if(todo.title==this.parentNode.firstChild.innerHTML) currentProject.todolist.splice(currentProject.todolist.indexOf(todo),1)
        })
    }
    else{
        let kk=projectList.find(e=>e.projectname==this.parentNode.firstChild.innerHTML)
        projectList.splice(projectList.indexOf(kk),1)             
        console.table(projectList)
    }
    this.parentNode.parentNode.removeChild(this.parentNode)
    e.stopPropagation();
    localStorage.setItem("projects",JSON.stringify(projectList))
}

function setDeleteEvent(){

    let deletebutton = document.getElementsByClassName("delete-button");
    Array.from(deletebutton).forEach(element => {
        element.addEventListener("click",removeME)
    });
}
setDeleteEvent();
    
//tesk pop add button
let teskPopbutton=document.getElementById("tesk-pop")
let teskAddtable=document.getElementById("tesk-popout")
let teskCloseButton=document.getElementById("cancel-add-tesk")

 teskPopbutton.addEventListener("click",popTeskAdd)

 teskCloseButton.addEventListener("click",closeTeskAdd)

function popTeskAdd(){
    teskPopbutton.classList += " active";
    teskAddtable.classList.remove("active");
}
function closeTeskAdd(){

    teskAddtable.classList += " active";
    teskPopbutton.classList.remove("active");

}

//
//  project pop add button
addproject.addEventListener("click",display);
function display(){
    this.classList+="active";
    addobjectForm.classList=""
}
document.getElementById("cancel-add-project").addEventListener("click",redisplay);
function redisplay(){
    addobjectForm.classList +="active";
    addproject.classList=""
}
//
////

//project clicked  then change container to its todos
function setProjectItemClick(){
    let sideBarprojects = document.getElementsByClassName("object-item")
    Array.from(sideBarprojects).forEach(e=>e.addEventListener("click",projectclicked))
    function projectclicked(){
        //change current project to cliked project 
    if(document.getElementsByClassName("current")[0]) document.getElementsByClassName("current")[0  ].classList.remove("current")
        currentProject= projectList.find(e=>e.projectname == this.firstChild.innerHTML )
        this.classList.add("current")
        flashContainer()   
    }
}


class todos{
    constructor(title, description, dueDate ){
        this.title=title,
        this.description=description,
        this.dueDate=dueDate
    }
}
class project {
    constructor(projectname){
        this.projectname=projectname,
        this.todolist=[]
    }
    addToDos(todo){
        this.todolist.push(todo);
    }
    deleteToDos(todo){
        this.todolist.splice(this.todolist.indexOf(todo), 1);
     }

}

function createProject(projectname){
    return new project(projectname);
}
//   add-project-project
let addProjectButton=document.getElementById("add-project");
addProjectButton.addEventListener("click",clickAddPj)
function clickAddPj(){ 

    let newPjName = document.getElementById("newPjName")
    if(newPjName.value == "")return 0 
    addProject(createProject(newPjName.value))

    clearValueof(newPjName)
    redisplay()
    console.table(projectList)
    
}
function clearValueof(n){
n.value=""
}
//
//


// 

flashProjects()
function addProject(pj){
    let a = 0
    projectList.forEach(oldP=>{ if(oldP.projectname ==pj.projectname){ a = 1 ;alert("name existed");}} )
   
    if(a==0)projectList.push(pj);
    localStorage.setItem("projects",JSON.stringify(projectList))
    flashProjects()

}
function deleteProject(pj){
    projectList.splice(projectList.indexOf(pj),1);
}

document.getElementById("add-tesk").addEventListener("click",addToDos)
function addToDos(){
    
    //screan form  to var todos
        let formInPut=document.getElementById("tesk-popout").children;
        if(formInPut[0].value =="")return alert("enter title ")
        if(formInPut[2].value=="")return alert("enter date")
        let todo = new todos(formInPut[0].value,formInPut[1].value,formInPut[2].value)
        //add todos to current project   
      
        currentProject.todolist.push(todo);
    //clean form
    formInPut[0].value=formInPut[1].value=formInPut[2].value=""


    //switch back
    closeTeskAdd()
    flashContainer()
}
function flashContainer(){
    //clear container
    let item=document.getElementsByClassName("tesk-item")
    Array.from(item).forEach(e=>{e.remove()})
    //pop container duel to current project
    let pop= document.getElementById("tesk-popout")
    currentProject.todolist.forEach(todo=>{
        pop.parentNode.insertBefore(transferToDOtoHtmlElement(todo),pop);
    })
    localStorage.setItem("projects",JSON.stringify(projectList))
    setDeleteEvent();   

}
function transferToDOtoHtmlElement(todo){
    let item= document.createElement("div")
    item.classList+="tesk tesk-item";
    item.innerHTML=
    `<div class="teskname">${todo.title}</div>
    <div class="delete-button">
        <div>×︁</div>
    </div>
    <div class="description"> 
                ${todo.description}                
    </div>
    <div class="dueDate">
            ${todo.dueDate}      
    </div>`
    return item
}

function flashProjects(){
    //  clean projectsidebar
    let projects=document.getElementsByClassName("object-item")
    Array.from(projects).forEach(p=>{p.parentNode.removeChild(p)})
    //add projectsidebar vau projectlist
    let addproject=document.getElementById("addproject")
    projectList.forEach(project=>{
        let insert=document.createElement("li")
        insert.classList+="object-item"
        insert.innerHTML=`<div class="object-name">${project.projectname}</div>  <div class="delete-button">×︁</div>`
        addproject.parentNode.insertBefore(insert,addproject);
    })
   //   currentProject.classlist.add("current")
     if(projectList.indexOf(currentProject)!=-1 )document.getElementsByClassName("object-item")[projectList.indexOf(currentProject)].classList.add("current")
            
    setDeleteEvent()
    setProjectItemClick()
}

