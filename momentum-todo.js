const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; 

let toDos = [];

function deleteToDo(event){
//console.dir 을 하면 인자의 정보가 나온다
//console.log(event.target.parentNode);
//id를 볼 수 있다
const btn = event.target;
const li = btn.parentNode;
toDoList.removeChild(li);
const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
    //문자열을 숫자로 변환
});
toDos = cleanToDos;
saveToDos();
}

//toDo를 가져와서 로컬저장소에 저장
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //자바스크립트는 localstorage에 있는 모든 데이터를 string으로 저장하려 한다
    //JSON.stringify는 자바스크립트 object를 string으로 바꿔준다
    //JSON = JavaScript Object Notation
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    //todo리스트 삭제
    //어떤 버튼이 클릭됐는지 알아야 한다
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    //todo를 push 한 후에 save
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); 
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value = "";
}

function loadToDos() {
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if (loadedtoDos !== null) {
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
            //forEach는 배열을 위한 함수이다
        }); 
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();