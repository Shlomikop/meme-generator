'use strict';
let currImgUrl;

var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');

let gCurrText = '';
let gFontSize = 20
let gTxtAlign = 'left'
let gFont = 'impact'
let gStrokeColor = 'black'
let gFillColor = 'white'
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
    currImgUrl = imgUrl
    onOpenModal()
    getMeme(imgId)
    renderCanvas(imgUrl);
}

function renderCanvas() {
    const img = new Image();
    img.src = currImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(gCurrText)
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

    var updatedTxt = setTxtMeme(txt)
    gCurrText = updatedTxt
    renderCanvas()
}

function drawText(text, x = 20, y = 40) {
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
    getMeme(gCurrID)
    renderCanvas()
    gFontSize = 20
}

function onSetFontSize(btn) {
    let fontSize;
    if (btn === '+' && gFontSize < 80) {
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
    gFillColor=color
    setColor(color)
    renderCanvas()

}