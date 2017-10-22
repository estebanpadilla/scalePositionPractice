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

    var bgColors = ['#e81e26', '#12b57b', '#00addc', '#3fa9f5', '#3fa9f5'];
    var currentBbColor;

    var counter = 0;
    var timeLimit = 30;
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

    body.appendChild(container);
    container.appendChild(noteTxt);
    container.appendChild(positionTxt);
    container.appendChild(timerTxt);
    container.appendChild(newBtn);

    container.style.position = 'absolute';

    noteTxt.id = 'noteTxt';
    positionTxt.id = 'positionTxt';
    timerTxt.id = 'timerTxt';
    newBtn.id = 'newBtn';
    newBtn.innerText = 'New Position';
    newBtn.addEventListener('click', setNewPosition, false);

    var textColor = 'white';
    var notesFontFamily = '"Contrail One", cursive';;
    var fontFamily = '"Contrail One", cursive';
    noteTxt.style.color = textColor;
    positionTxt.style.color = textColor;
    timerTxt.style.color = textColor;
    newBtn.style.backgroundColor = textColor;

    noteTxt.style.fontFamily = notesFontFamily;
    positionTxt.style.fontFamily = fontFamily;
    timerTxt.style.fontFamily = fontFamily;
    newBtn.style.fontFamily = fontFamily;

    noteTxt.style.fontSize = '300px';
    noteTxt.style.marginTop = '10px';
    noteTxt.style.marginBottom = '0px';
    noteTxt.style.textAlign = 'center';

    positionTxt.style.fontSize = '50px';
    positionTxt.style.marginTop = '-50px';
    positionTxt.style.marginBottom = '0px';
    positionTxt.style.textAlign = 'center';

    timerTxt.style.fontSize = '30px';
    timerTxt.style.marginTop = '-5px';
    timerTxt.style.marginBottom = '0px';
    timerTxt.style.textAlign = 'center';

    newBtn.style.textAlign = 'center';
    newBtn.style.height = '60px';
    newBtn.style.width = screenWidth + 'px';
    newBtn.style.fontSize = '20px';
    newBtn.style.border = 'none';
    newBtn.style.borderRadius = '0px';
    newBtn.style.marginTop = '30px';

    window.onresize = onresize;

    function update() {
        window.requestAnimationFrame(update);

        if (timeCounter < 0) {
            timeCounter = timeLimit;
            changePositionAndNote();
        }

        counter++;
        if (counter == 60) {
            counter = 0;
            //changePositionAndNote();
            setTimer();
            timeCounter--;
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
        container.style.top = ypos + 'px';
        newBtn.style.width = screenWidth + 'px';

    }
    onresize(null);
}