window.addEventListener('load', init, false);

function init() {

    var c = new Note('C');
    var d = new Note('D');
    var e = new Note('E');
    var f = new Note('F');
    var g = new Note('G');
    var a = new Note('A');
    var b = new Note('B');
    var notes = [c, d, e, f, g, a, b];
    var noteType = ['', 'b', '#'];
    var previousNotes = [];

    var bgColors = ['#feca0c', '#e44322', '#51e8b9', '#7e4556', '#0967b1'];
    var currentBbColor;
    var startTime;
    var endTime;

    var counter = 0;
    var timeLimit = 30;
    var timeCounter = timeLimit;
    var noteIndex = 0;
    var isPaused = false;

    var body = document.getElementById('body');
    var screenWidth = body.clientWidth;
    var screenHeight = body.clientHeight;

    var container = document.createElement('div');
    var noteTxt = document.createElement('p');
    var positionTxt = document.createElement('p');
    var timerTxt = document.createElement('p');
    var resetBtn = document.createElement('button');
    var playBtn = document.createElement('button');
    var completedTxt = document.createElement('p');
    var buttonWidth = 300;
    var buttonHeight = 40;

    container.style.position = 'absolute';

    noteTxt.id = 'noteTxt';
    positionTxt.id = 'positionTxt';
    timerTxt.id = 'timerTxt';
    resetBtn.id = 'resetBtn';
    playBtn.id = 'playBtn';
    completedTxt.id = 'completedTxt';

    var textColor = 'white';
    var notesFontFamily = '"Oswald", sans-serif';
    var fontFamily = '"Open Sans Condensed", sans-serif';

    noteTxt.style.color = textColor;
    noteTxt.style.fontFamily = notesFontFamily;
    noteTxt.style.fontSize = '300px';
    noteTxt.style.fontWeight = '700';
    noteTxt.style.marginTop = '-110px';
    noteTxt.style.marginBottom = '0px';
    noteTxt.style.userSelect = 'none';
    noteTxt.style.textShadow = '5px 5px 10px rgba(0, 0, 0, 0.1)';

    positionTxt.style.color = textColor;
    positionTxt.style.fontFamily = fontFamily;
    positionTxt.style.fontSize = '65px';
    positionTxt.style.marginTop = '-80px';
    positionTxt.style.marginBottom = '0px';
    positionTxt.style.userSelect = 'none';

    timerTxt.style.color = textColor;
    timerTxt.style.fontFamily = fontFamily;
    timerTxt.style.fontSize = '20px';
    timerTxt.style.marginTop = '-15px';
    timerTxt.style.marginBottom = '0px';
    timerTxt.style.userSelect = 'none';

    resetBtn.style.textAlign = 'center';
    resetBtn.style.height = buttonHeight + 'px';
    resetBtn.style.width = screenWidth + 'px';
    resetBtn.style.fontFamily = fontFamily;
    resetBtn.style.fontSize = '20px';
    resetBtn.style.color = 'black';
    resetBtn.style.border = 'none';
    resetBtn.style.borderRadius = '30px';
    resetBtn.style.backgroundColor = textColor;
    resetBtn.id = 'newBtn';
    resetBtn.innerText = 'Reset';
    resetBtn.addEventListener('click', setNewPosition, false);
    resetBtn.style.width = buttonWidth + 'px';
    resetBtn.style.outline = 'none';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.display = 'block';
    resetBtn.style.marginTop = '20px';
    resetBtn.style.marginLeft = 'auto';
    resetBtn.style.marginRight = 'auto';

    playBtn.style.textAlign = 'center';
    playBtn.style.height = buttonHeight + 'px';
    playBtn.style.width = screenWidth + 'px';
    playBtn.style.fontFamily = fontFamily;
    playBtn.style.fontSize = '20px';
    playBtn.style.color = 'black';
    playBtn.style.border = 'none';
    playBtn.style.borderRadius = '30px';
    playBtn.style.backgroundColor = textColor;
    playBtn.id = 'newBtn';
    playBtn.innerText = 'Pause';
    playBtn.addEventListener('click', playBtnAction, false);
    playBtn.style.width = buttonWidth + 'px';
    playBtn.style.outline = 'none';
    playBtn.style.cursor = 'pointer';
    playBtn.style.display = 'block';
    playBtn.style.marginTop = '10px';
    playBtn.style.marginLeft = 'auto';
    playBtn.style.marginRight = 'auto';

    completedTxt.innerText = 'Press SPACE BAR to mark as completed.'
    completedTxt.style.color = textColor;
    completedTxt.style.fontFamily = fontFamily;
    completedTxt.style.marginTop = '5px';
    completedTxt.style.marginBottom = '0px';

    body.appendChild(container);
    container.style.textAlign = 'center';
    container.appendChild(noteTxt);
    container.appendChild(positionTxt);
    container.appendChild(timerTxt);
    container.appendChild(resetBtn);
    container.appendChild(playBtn);
    container.appendChild(completedTxt);

    window.onresize = onresize;

    setTimer();
    update();
    changePositionAndNote();

    function update() {
        if (!isPaused) {
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
    }

    function changePositionAndNote() {
        noteIndex = Math.floor(Math.random() * notes.length);
        var note = new Note(notes[noteIndex].letter);
        note.noteType = noteType[Math.floor(Math.random() * noteType.length)];
        note.position = (Math.floor(Math.random() * 7) + 1);

        if (checkPreviousNotes(note)) {
            changePositionAndNote();
        } else {

            if (startTime != null) {
                endTime = new Date();
                var timeDiff = endTime - startTime; //in ms
                // strip the ms
                timeDiff /= 1000;
                previousNotes[(previousNotes.length - 1)].time = timeDiff;
            }

            previousNotes.push(note);
            startTime = new Date();
            noteTxt.innerText = note.letter + '' + note.noteType;
            positionTxt.innerHTML = 'POSITION ' + note.position;
            getBgColor();
            body.style.backgroundColor = currentBbColor;
            resetBtn.style.color = currentBbColor;
            playBtn.style.color = currentBbColor;
        }
    }

    function setTimer() {
        timerTxt.innerText = 'Time: ' + timeCounter;
    }

    function getBgColor() {
        var color = bgColors[(Math.floor(Math.random() * bgColors.length))];
        if (color == currentBbColor) {
            return getBgColor();
        }
        currentBbColor = color;
    }

    function checkPreviousNotes(pnote) {
        for (var i = 0; i < previousNotes.length; i++) {
            if (previousNotes[i].isPlayed(pnote)) {
                return true;
            }
        }
        return false;

    }

    function setNewPosition(e) {
        timeCounter = timeLimit;
        changePositionAndNote();
        counter = 0;
        setTimer();
    }

    onresize(null);

    function onresize(e) {
        var containerHeight = container.clientHeight;
        body = document.getElementById('body');
        screenHeight = window.innerHeight;
        screenWidth = window.innerWidth;
        var ypos = (screenHeight - containerHeight) / 2;
        var xpos = (screenWidth - buttonWidth) / 2;
        container.style.top = ypos + 'px';
        container.style.width = screenWidth + 'px';
        resetBtn.style.left = xpos + 'px';
    }

    function playBtnAction(e) {
        isPaused = !isPaused;
        if (isPaused) {
            playBtn.innerHTML = 'Continue';
        } else {
            playBtn.innerHTML = 'Stop';
            update();
        }
    }

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            if (!isPaused) {
                previousNotes[(previousNotes.length - 1)].isCompletedBeforeTimeEnds = true;
                timeCounter = timeLimit;
                changePositionAndNote();
                setTimer();
            }
        }
    }
}