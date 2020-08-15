'use strict';


var gMeme;
var gImgs = _createImages();
let gNextId = 0;
let gCurrID;
let gLineIdx = 0;


function getImagesForDisplay() {
    return gImgs;
}


function _createMeme(imgId) {
    let meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            font: 'impact',
            size: 30,
            align: 'left',
            color: 'white',
            x:20,
            y:80
        }
        
    ]
    
}
gMeme = meme;

};


function getMeme(imgId) {
    gCurrID = imgId
    _createMeme(imgId);
}


//---------------------------

function setTxtMeme(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


function pushLine(){
    var line=  {
        txt: '',
        font: gMeme.lines[gMeme.selectedLineIdx-1].font,
        size: gMeme.lines[gMeme.selectedLineIdx-1].size,
        align: gMeme.lines[gMeme.selectedLineIdx-1].align,
        color: gMeme.lines[gMeme.selectedLineIdx-1].color
        
    }
    gMeme.lines.push(line)
}


function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setFontSize(fontSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function setTxtAlign(txtAlign) {
    gMeme.lines[gMeme.selectedLineIdx].align = txtAlign
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineIdx() {
    gMeme.selectedLineIdx += 1
}

function clearLineIdx() {
    gMeme.selectedLineIdx = 0
}


//---------------------------


function _createImages() {
    var images = [];

    images.push(
        _createImage('./images/1.jpg', ['funny', 'trump']),
        _createImage('./images/2.jpg', ['animals']),
        _createImage('./images/3.jpg', ['animals', 'baby', 'cute']),
        _createImage('./images/4.jpg', ['animals', 'cat']),
        _createImage('./images/5.jpg', ['funny', 'baby']),
        _createImage('./images/6.jpg', ['chandler', 'funny']),
        _createImage('./images/7.jpg', ['baby', 'funny']),
        _createImage('./images/8.jpg', ['funny']),
        _createImage('./images/9.jpg', ['baby', 'funny']),
        _createImage('./images/10.jpg', ['obama']),
        _createImage('./images/11.jpg', ['sport', 'basketball']),
        _createImage('./images/12.jpg', ['funny']),
        _createImage('./images/13.jpg', ['cheers', 'money']),
        _createImage('./images/14.jpg', ['matrix']),
        _createImage('./images/15.jpg', ['serious']),
        _createImage('./images/16.jpg', ['funny']),
        _createImage('./images/17.jpg', ['putin']),
        _createImage('./images/18.jpg', ['toys']))
    return images;
}

function _createImage(url, keywords) {
    return {
        id: makeId(),
        url,
        keywords
    };
}

function getLineIndex(){
    return gMeme.selectedLineIdx
}