//Seleciona elementos do HTML
const task = document.getElementById("add-task")
const form = document.querySelector("form")
const taskContent = document.querySelector("ul")
const content = document.querySelector(".content")
const createdTasks = document.querySelector(".info .created-tasks p")
const completedTasks= document.querySelector(".info .completed-tasks p")
const boxList = document.querySelector(".box-lists")


form.onsubmit = (e) => {
//Impede que o form seja atualizado com enviar.
  e.preventDefault()

  const newTask = {
    id: new Date().getTime(),
    taskValue: task.value,
  }

  // Chama a função que add o item na lista
  addTask(newTask)

}

function addTask(newTask) {
  try {
    //Cria o elemento div para ficar dentro do task-content
    const content = document.createElement("div")
    content.classList.add("flex")

    //Cria o elemento div que vai suportar o ícone do checkbox
    const checkboxImg = document.createElement("div")
    checkboxImg.classList.add("checkbox-image")

    //Cria o elemento input tipo checkbox
    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.setAttribute("id", "checkbox")

    //Cria o texto da lista
    const label = document.createElement("label")
    label.textContent = newTask.taskValue

    //Cria o ícone de remover
    const removeIcon = document.createElement("section")
    removeIcon.classList.add("trash-icon")

    //Add o input no checkboxImg
    checkboxImg.append(input)

    //Add checkboxImg, label e removeIcon no content
    content.append(checkboxImg, label, removeIcon)

    //Add content no task-content
    taskContent.prepend(content)

    //Limpa o formulário para add um novo item
    formClear()

    //Att os totais
    updateCreatedTasks()
    updateCompletedTasks()
    
  } catch (error) {
    alert("Não foi posível atualizar a lista de tarefas")
    console.log(error)
  }
}


//Att tasks created
function updateCreatedTasks(){
  try {
    //Recupera os itens (tasks) da lista (ul)
    const items = taskContent.children
    
    //Att a quantidade de itemns da lista
    createdTasks.textContent = `${items.length}`
    
    //Variável para icrementar o total
    let total = 0
    
    total += Number(createdTasks)

    //Verifica se a projeto tem lista, para add o container de tarefas nao criadas
    if(items.length === 0){
      boxList.classList.remove("hidden")
      document.querySelector(".separator").classList.remove("hidden")
    }else{
      boxList.classList.add("hidden")
      document.querySelector(".separator").classList.add("hidden")
    }
    
  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar as tarefas criadas")
  }
}

//Variável de tarefas concluídas
let value = 0

//Att Completed Tasks
function updateCompletedTasks(){
  try {
    document.querySelector(".flex").addEventListener("change", (e) => {

      if (e.target.checked) {   
        //Incrementa  o valor
        value++
        completedTasks.textContent = value

      } else {
        //Reduz o valor
        value--
        completedTasks.textContent = value
        
      }
      
    })

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar as tarefas concluídas")
  }
}

//Evento que captura os cliques nos itens da lista
taskContent.addEventListener("click", function(e){
  //Verifica se o elemento clicado é o ícone de remover
  if(e.target.classList.contains("trash-icon")){
    //Obtém a div pai do elemento clicado
    const item = e.target.closest(".flex")

    //Remove o item da lista
    item.remove()
  }
  
  //Att totals
  updateCreatedTasks()
  
})

//Limpa o formulário
function formClear(){
  task.value = ""

  //Coloca o foco no input de expense
  task.focus()
}

