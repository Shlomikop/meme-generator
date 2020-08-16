'use strict';
let gCurrImgUrl;
let gCurrId;

let gCanvas;
let gCtx;


let gClickCount = 0;
let gSwitchCounter = -1
let gStrokeColor = 'black'


// elInput.addEventListener('input', updateText); 



function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
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
        gMeme.lines.map(line => drawText(line))
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
    if (gSwitchCounter === -1) {
        setTxtMeme(txt)
        renderCanvas()
    } else {
        setSwitchTxtMeme(txt, gSwitchCounter)
        renderCanvas()
    }
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


function drawText(line) { //***************************************//

    let {
        txt,
        x,
        y,
        color,
        font,
        size,
        align
    } = line

    // gCtx.beginPath()
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = `${gStrokeColor}`;
    gCtx.fillStyle = `${color}`;
    gCtx.font = `${size}px ${font}`;
    if (align === 'right') x = gCanvas.width - 20
    if (align === 'center') x = gCanvas.width / 2

    gCtx.textAlign = `${align}`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}

function onClearCanvas() {
    document.querySelector('.line-text').value = '';
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines[gClickCount].size = 30
    gClickCount = 0
    clearLineIdx()
    gSwitchCounter = -1
    getMeme(gCurrId)
    renderCanvas()
}

function onSwitchLine() {

    if (gMeme.lines.length === 1) return

    document.querySelector('.line-text').value = '';
    if (gSwitchCounter < gMeme.lines.length - 1) {
        gSwitchCounter += 1
        drawRect()
    } else gSwitchCounter = 0
    drawRect()

    // renderCanvas()
}


function drawRect() {

    let x = gMeme.lines[gSwitchCounter].x;
    let y = (gMeme.lines[gSwitchCounter].y - gMeme.lines[gSwitchCounter].size) + 5;
    gCtx.beginPath();

    if (gMeme.lines[gSwitchCounter].align === 'left') {
        gCtx.rect(x, y, gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width, gMeme.lines[gSwitchCounter].size); // x, y, width, height
        gCtx.strokeStyle = 'white';
        gCtx.stroke();
        gCtx.fillStyle = '#f5f5f566';
        gCtx.fillRect(x, y, gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width, gMeme.lines[gSwitchCounter].size); // x, y, width, height
    }
    if (gMeme.lines[gSwitchCounter].align === 'center') {
        gCtx.rect(x - (gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width) / 2, y, gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width, gMeme.lines[gSwitchCounter].size); // x, y, width, height
        gCtx.strokeStyle = 'white';
        gCtx.stroke();
        gCtx.fillStyle = '#f5f5f566';
        gCtx.fillRect(x - (gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width) / 2, y, gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width, gMeme.lines[gSwitchCounter].size); // x, y, width, height
    }
    if (gMeme.lines[gSwitchCounter].align === 'right') {
        gCtx.rect(x, y, (gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width) * -1, gMeme.lines[gSwitchCounter].size); // x, y, width, height
        gCtx.strokeStyle = 'white';
        gCtx.stroke();
        gCtx.fillStyle = '#f5f5f566';
        gCtx.fillRect(x, y, (gCtx.measureText(gMeme.lines[gSwitchCounter].txt).width) * -1, gMeme.lines[gSwitchCounter].size); // x, y, width, height
    }
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
        setTxtAlign(txtAlign, 20)
    }
    if (val === 'AC') {
        txtAlign = 'center'
        setTxtAlign(txtAlign, gCanvas.width / 2)
    }
    if (val === 'AR') {
        txtAlign = 'right'
        setTxtAlign(txtAlign, gCanvas.width - 20)
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


//----------------------------------//
//search bar//

function onSearch(input) {

    if (!input) {
        var imgs = getImagesForDisplay()
        return renderImgs(imgs);
    }

    var imgs = getImagesForDisplay()
    var searchedImgs = imgs.filter(function (img) {
        return (img.keywords[0] === input || img.keywords[1] === input || img.keywords[2] === input)

    })

    return renderImgs(searchedImgs)
}