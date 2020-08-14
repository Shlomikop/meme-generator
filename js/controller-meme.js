'use strict';
let gCurrImgUrl;
let gCurrId;

var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');

let gClickCount = 0;

let gCurrText = '';
let gFontSize = 20
let gTxtAlign = 'left'
let gFont = 'impact'
let gStrokeColor = 'black'
let gFillColor = 'white'

let xCanvas = 20;
let yCanvas = 80;
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
        drawText(gMeme.lines[gClickCount].txt)
        // gMeme.lines.map(line => drawText(line))
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
    if (gClickCount === 0) {
        setTxtMeme(txt)
        gCurrText = txt
        renderCanvas()
    }
    if (gClickCount > 0) {
        setTxtMeme(txt)
        gCurrText = txt
        drawText(txt)
    }
}


function onMoveLine(val) {
    if (yCanvas < 40) yCanvas=31
    if (val === 'up') {
        yCanvas -= 10
        renderCanvas()
    }
    if (yCanvas > 330) yCanvas=339
    if (val === 'down') {
        yCanvas += 10
        renderCanvas()
    }
}


var addLineButton = document.querySelector('.btn-add') //counting the clicks here and in the function below

function onAddLine() {

    gClickCount += 1
    setLineIdx()
    pushLine()
    if (gClickCount === 1) yCanvas = gCanvas.height - 80;
    if (gClickCount > 1) yCanvas = gCanvas.height / 2;
    document.querySelector('.line-text').value = '';

}


function drawText(text, x = xCanvas, y = yCanvas) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = `${gStrokeColor}`;
    gCtx.fillStyle = `${gFillColor}`;
    gCtx.font = `${gFontSize}px ${gFont}`;

    if (gTxtAlign === 'right') x = gCanvas.width - 20
    if (gTxtAlign === 'center') x = gCanvas.width / 2

    gCtx.textAlign = `${gTxtAlign}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}



function onClearCanvas() {
    document.querySelector('.line-text').value = '';
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gFontSize = 20
    gClickCount = 0
    yCanvas = 80;
    clearLineIdx()
    getMeme(gCurrId)
    renderCanvas()
}

function onSetFontSize(btn) {
    let fontSize;
    if (btn === '+' && gFontSize < 100) {
        gFontSize += 10
        renderCanvas()

    }
    if (btn === '-' && gFontSize > 20) {
        gFontSize -= 10
        renderCanvas()
    }
    fontSize = gFontSize
    setFontSize(fontSize)
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
    gTxtAlign = txtAlign
    renderCanvas()
}

function onFontSelection(font) {
    setFont(font)
    gFont = font
    renderCanvas()
}

function setStrokeColor(ev) {
    const color = ev.target.value
    gStrokeColor = color
    renderCanvas()

}

function setFillColor(ev) {
    const color = ev.target.value
    gFillColor = color
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