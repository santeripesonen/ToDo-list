
/*
Lista todoista, esim:
{
    id: 1,
    text: "pese pyykit",
    done: true
}
*/
let todoItems = [];

// täytetään todoilla jos localstoragessa on todoita
if (window.localStorage.getItem("todo-items")) {
    todoItems = JSON.parse(localStorage.getItem("todo-items"))
}

// tallenetaan lomake, jotta siihen voidaan viitata javascriptissä
const form = document.getElementById("form1")

form.addEventListener("submit", (e) => {
    //estää uudelleenohjauksen
    e.preventDefault()

    addTodo()
})

// siistii kentän submitin jälkeen
function clearTodo() {
    document.getElementById("todo-input").value = ""
}

function addTodo() {
    const inputText = document.getElementById("todo-input").value
    if (inputText.length < 4) {
        showError()
    } else {
        let id = 1;
        if (todoItems.length > 0) {
            id = todoItems[todoItems.length - 1].id + 1
        }

        const newTodo = {
            id: id,
            text: inputText,
            done: false
        }

        todoItems.push(newTodo)
        // siivotaan kenttä
        renderTodos()
        clearTodo()
    }
}

// poistetaan tietty todo listasta
function deleteTodo(id) {
    const newTodoItems = todoItems.filter(item => item.id !== id)
    todoItems = newTodoItems;
    renderTodos()

}

function showError() {
    const inputField = document.getElementById("todo-input")
    const inputError = document.getElementById("input-error")
    inputField.style.border = "2px solid red"
    inputError.classList.remove("hidden")

    setTimeout(() => {
        inputField.style.border = "none"
        inputError.classList.add("hidden")
    }, 3000)
}

// ladataan todot näkyville
function renderTodos() {
    const todoList = document.getElementById("todo-list")
    // poistetaan olemassa olleet todot
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild)
    }

    // tuodaan listalta jokainen todo esille
    todoItems.forEach(item => {
        // rakennetaan meidän todo itemi
        const li = document.createElement("li")
        const p = document.createElement("p")
        const inputText = item.text
        const button = document.createElement("button")
        button.classList = "btn fa fa-trash"
        button.addEventListener("click", () => {
            deleteTodo(item.id)
        })

        const textContent = document.createTextNode(inputText)
        p.appendChild(textContent)
        li.appendChild(p)
        li.appendChild(button)

        p.addEventListener("click", e => {
            const isDone = item.done;
            if (!isDone) {
                let foundItemIndex = todoItems.findIndex(listItem => listItem.id === item.id)
                todoItems[foundItemIndex].done = true;
            } else {
                let foundItemIndex = todoItems.findIndex(listItem => listItem.id === item.id)
                todoItems[foundItemIndex].done = false;
            }
            renderTodos()
        })

        if (item.done) {
            p.classList.add("todo-done")
        }

        // lisätään rakennettu todo itemi listalle
        li.classList.add("todo-item")
        todoList.appendChild(li)
        saveToLocalStorage()
    })
}
// ajetaan kun tallennetaan todot local storageen
function saveToLocalStorage() {
    localStorage.setItem("todo-items", JSON.stringify(todoItems))
}
//rendataan todot näkyville kun sivu latautuu
renderTodos()
