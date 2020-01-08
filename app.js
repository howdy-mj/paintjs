const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting(){
    painting = false;
}

// 캔버스 위 마우스 좌표
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
}

// 캔버스 위 마우스 클릭시 painting 시작
function onMouseDown(event){
    painting = true;
}

// 캔버스에서 마우스 클릭을 멈춘 경우 painting 중단
function onMouseUp(event){
    stopPainting();
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}