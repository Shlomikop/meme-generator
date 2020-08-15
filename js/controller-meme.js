'use strict';
let gCurrImgUrl;
let gCurrId;

var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');

let gClickCount = 0;
let gSwitchCounter=0
let gStrokeColor = 'black'


// elInput.addEventListener('input', updateText); 



function init() {
    var imgs = getImagesForDisplay()
    renderImgs(imgs);
}


function renderImgs(imgs) {
    var strHtml = imgs.map(function (img) {
        return `
        <img class="img" id='${img.id}' src='${img.url}' onclick="onOpenMemeEditor('${img.id}', '${img.url}')" alt='meme picture'/>
        `
    })

    document.querySelector('.gallery').innerHTML = strHtml.join(' ');
}


function onOpenMemeEditor(imgId, imgUrl) {
    gCurrId = imgId
    gCurrImgUrl = imgUrl
    onOpenModal()
    getMeme(imgId)
    renderCanvas();
}

function renderCanvas() {
    const img = new Image();
    img.src = gCurrImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.map(line => drawText(line.txt, line.x, line.y))
    }
}




function onOpenModal() {
    var elModal = document.querySelector('.modal-container')
    elModal.style.display = 'block'
}

function onCloseModal() {
    var elModal = document.querySelector('.modal-container')
    elModal.style.display = 'none'
}

function onTextInput(txt) {

    setTxtMeme(txt)
    renderCanvas()

}


function onMoveLine(val) {

    if (gMeme.lines[gClickCount].y < 40) gMeme.lines[gClickCount].y = 31
    if (val === 'up') {
        gMeme.lines[gClickCount].y -= 10
        renderCanvas()
    }
    if (gMeme.lines[gClickCount].y > 330) gMeme.lines[gClickCount].y = 339
    if (val === 'down') {
        gMeme.lines[gClickCount].y += 10
        renderCanvas()
    }
}

var addLineButton = document.querySelector('.btn-add') //counting the clicks here and in the function below

function onAddLine() {

    gClickCount += 1
    setLineIdx()
    pushLine()
    if (gClickCount === 1) {
        gMeme.lines[1].y = gCanvas.height - 80;
        gMeme.lines[1].x = 20
    } //setting Y+X in the model
    if (gClickCount > 1) {
        gMeme.lines[gClickCount].y = gCanvas.height / 2;
        gMeme.lines[gClickCount].x = 20
    }
    //setting Y+X in the model
    document.querySelector('.line-text').value = '';

}


function drawText(text, x = gMeme.lines[getLineIndex()].x, y = gMeme.lines[getLineIndex()].y) { //***************************************//
    gCtx.beginPath()
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = `${gStrokeColor}`;
    gCtx.fillStyle = `${gMeme.lines[gClickCount].color}`;
    gCtx.font = `${gMeme.lines[gClickCount].size}px ${gMeme.lines[gClickCount].font}`;
    if (gMeme.lines[gClickCount].align === 'right') x = gCanvas.width - 20
    if (gMeme.lines[gClickCount].align === 'center') x = gCanvas.width / 2

    gCtx.textAlign = `${gMeme.lines[gClickCount].align}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function onSwitchLine(){
    if(gMeme.lines.length<2)return
    gSwitchCounter+=1
    if(gSwitchCounter%2===0){
        gMeme.lines[0].y=280
        gMeme.lines[1].y=80
    }else{
        gMeme.lines[0].y=80
        gMeme.lines[1].y=280
    }

    renderCanvas()
}

function onClearCanvas() {
    document.querySelector('.line-text').value = '';
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines[gClickCount].size = 30
    gClickCount = 0
    clearLineIdx()
    getMeme(gCurrId)
    renderCanvas()
}

function onSetFontSize(btn) {
    let fontSize = gMeme.lines[getLineIndex()].size;

    if (btn === '+' && fontSize < 100) fontSize += 10

    if (btn === '-' && fontSize > 20) fontSize -= 10

    setFontSize(fontSize)
    renderCanvas()
}

function onTextAlign(val) {
    var txtAlign;
    if (val === 'AL') {
        txtAlign = 'left'
        setTxtAlign(txtAlign)
    }
    if (val === 'AC') {
        txtAlign = 'center'
        setTxtAlign(txtAlign)
    }
    if (val === 'AR') {
        txtAlign = 'right'
        setTxtAlign(txtAlign)
    }

    renderCanvas()
}

function onFontSelection(font) {
    setFont(font)
    renderCanvas()
}

function setStrokeColor(ev) {
    const color = ev.target.value
    gStrokeColor = color
    renderCanvas()

}

function setFillColor(ev) {
    const color = ev.target.value
    setColor(color)
    renderCanvas()

}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}




function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}


// function onShare(){
    
//     document.querySelector('.share-container').innerHTML = `
//     <a class="btn-share" href="https://www.facebook.com/sharer/sharer.php?u=${gCurrImgUrl}&t=${gCurrImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${gCurrImgUrl}&t=${gCurrImgUrl}'); return false;">
//        Share   
//     </a>`
// }