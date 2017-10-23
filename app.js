window.addEventListener('load', init, false);

function init() {

    var c = new Note('C');
    var d = new Note('D');
    var e = new Note('E');
    var f = new Note('F');
    var g = new Note('G');
    var a = new Note('A');
    var b = new Note('B');
    var currentNote = null;
    var notes = [c, d, e, f, g, a, b];
    var noteType = ['', 'b', '#'];

    var bgColors = ['#feca0c', '#e44322', '#51e8b9', '#7e4556', '#0967b1'];
    var currentBbColor;

    var counter = 0;
    var timeLimit = 5;
    var timeCounter = timeLimit;
    var noteIndex = 0;

    var body = document.getElementById('body');
    var screenWidth = body.clientWidth;
    var screenHeight = body.clientHeight;

    var container = document.createElement('div');
    var noteTxt = document.createElement('p');
    var positionTxt = document.createElement('p');
    var timerTxt = document.createElement('p');
    var newBtn = document.createElement('button');
    var newBtnWidth = 250;

    container.style.position = 'absolute';

    noteTxt.id = 'noteTxt';
    positionTxt.id = 'positionTxt';
    timerTxt.id = 'timerTxt';

    var textColor = 'white';
    var notesFontFamily = '"Comfortaa", cursive';
    var fontFamily = '"Comfortaa", cursive';

    noteTxt.style.color = textColor;
    noteTxt.style.fontFamily = notesFontFamily;
    noteTxt.style.fontSize = '250px';
    noteTxt.style.marginTop = '-20px';
    noteTxt.style.marginBottom = '0px';
    noteTxt.style.userSelect = 'none';
    noteTxt.style.textShadow = '5px 5px 10px rgba(0, 0, 0, 0.1)';

    positionTxt.style.color = textColor;
    positionTxt.style.fontFamily = fontFamily;
    positionTxt.style.fontSize = '50px';
    positionTxt.style.marginTop = '-30px';
    positionTxt.style.marginBottom = '0px';
    positionTxt.style.userSelect = 'none';

    timerTxt.style.color = textColor;
    timerTxt.style.fontFamily = fontFamily;
    timerTxt.style.fontSize = '30px';
    timerTxt.style.marginTop = '-5px';
    timerTxt.style.marginBottom = '0px';
    timerTxt.style.userSelect = 'none';

    newBtn.style.textAlign = 'center';
    newBtn.style.height = '60px';
    newBtn.style.width = screenWidth + 'px';
    newBtn.style.fontFamily = fontFamily;
    newBtn.style.fontSize = '20px';
    newBtn.style.color = 'black';
    newBtn.style.border = 'none';
    newBtn.style.borderRadius = '30px';
    newBtn.style.marginTop = '30px';
    newBtn.style.backgroundColor = textColor;
    newBtn.id = 'newBtn';
    newBtn.innerText = 'New Position';
    newBtn.addEventListener('click', setNewPosition, false);
    newBtn.style.width = newBtnWidth + 'px';
    newBtn.style.outline = 'none';
    newBtn.style.cursor = 'pointer';

    body.appendChild(container);
    container.style.textAlign = 'center';
    container.appendChild(noteTxt);
    container.appendChild(positionTxt);
    container.appendChild(timerTxt);
    container.appendChild(newBtn);

    window.onresize = onresize;

    function update() {
        window.requestAnimationFrame(update);

        counter++;
        if (counter == 60) {
            counter = 0;

            timeCounter--;

            if (timeCounter < 0) {
                timeCounter = timeLimit;
                changePositionAndNote();
            }

            setTimer();
        }
    }

    setTimer();
    changePositionAndNote();
    update();

    function changePositionAndNote() {
        noteIndex = Math.floor(Math.random() * notes.length);
        currentNote = notes[noteIndex];
        noteTxt.innerText = currentNote.letter + '' + noteType[Math.floor(Math.random() * noteType.length)];
        positionTxt.innerHTML = 'Position ' + (Math.floor(Math.random() * 7) + 1);
        body.style.backgroundColor = getBgColor();
        newBtn.style.color = currentBbColor;
    }

    function setTimer() {
        timerTxt.innerText = 'Time: ' + timeCounter;
    }

    function setNewPosition(e) {
        timeCounter = timeLimit;
        changePositionAndNote();
        counter = 0;
        setTimer();
    }

    function getBgColor() {
        var color = bgColors[(Math.floor(Math.random() * bgColors.length))];
        if (color == currentBbColor) {
            return getBgColor();
        }
        currentBbColor = color;
        return currentBbColor;
    }

    function onresize(e) {
        var containerHeight = container.clientHeight;
        body = document.getElementById('body');
        screenHeight = window.innerHeight;
        screenWidth = body.clientWidth;
        var ypos = (screenHeight - containerHeight) / 2;
        var xpos = (screenWidth - newBtnWidth) / 2;
        container.style.top = ypos + 'px';
        container.style.width = screenWidth + 'px';
        newBtn.style.left = xpos + 'px';
    }
    onresize(null);
}