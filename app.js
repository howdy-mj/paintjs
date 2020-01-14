const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; // 기본 색상
const CANVAS_SIZE = 700;

// js내에 canvas pixel modifier에 사이즈를 줘야 출력될 수 있음
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본값이 흰색 배경이 되도록 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 연필
ctx.fillStyle = INITIAL_COLOR; // 채우기
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; // 채운 후에 그릴 수 있도록 따로 variable 생성

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
    ctx.fillStyle = color;
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

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event){
    event.preventDefault(); // 우클릭방지
}

// 저장 버튼
function handleSaveClick(){
    const image = canvas.toDataURL(""); //default는 png
    const link = document.createElement("a");
    link.href = image; // href는 주소
    link.download = "PaintJS_Export"; //download는 문서 이름
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu)
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

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}