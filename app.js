const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// js내에 canvas pixel modifier에 사이즈를 줘야 출력될 수 있음
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; // 채우기

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// 캔버스 위 마우스 좌표
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); // creating path(line)
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x, y); // path의 이전위치부터 지금까지 line을 잇는 것
        ctx.stroke(); // 획을 긋는 것
    }
}


// 클릭한 곳 style.backgroundColor 가져오기
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 선택한 색상이 유지되도록 color에 뒤집어 씌우기
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

// filling, paint 버튼 통합
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// colors의 색상 위치 가져오기
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}