window.addEventListener('load', init, false);

function init() {
    /*
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext('2d');
    */
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

    var counter = 0;
    var timeLimit = 30;
    var timeCounter = timeLimit;
    var noteIndex = 0;

    var screenWidth;
    var screenHeight;
    var body = document.getElementById('body');
    var noteTxt = document.createElement('p');
    var positionTxt = document.createElement('p');
    var timerTxt = document.createElement('p');
    var newBtn = document.createElement('button');;

    body.appendChild(noteTxt);
    body.appendChild(positionTxt);
    body.appendChild(timerTxt);
    body.appendChild(newBtn);

    noteTxt.id = 'noteTxt';
    positionTxt.id = 'positionTxt';
    timerTxt.id = 'timerTxt';
    newBtn.id = 'newBtn';
    newBtn.innerText = 'New';
    newBtn.addEventListener('click', setNewPosition, false);
    console.log(body);

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
}