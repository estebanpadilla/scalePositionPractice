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
    var modes = ['Jonico', 'Dorico', 'Frigio', 'Lidio', 'Mixolydio', 'Eolico', 'Locrio'];
    var notePositions = [1, 2, 3, 4, 5, 6, 7];
    var noteType = ['', 'b', '#'];
    var previousNotes = [];
    var keys = [];
    var modeBtns = [];
    var currentMode = modes[0];
    var notesAvailable = [];

    var bgColors = ['#616e77', '#5c9ea5', '#5e98b7', '#a4845b', '#5d8fae', '#6d8566', '#bc7062', '#ff7275', '#4fcdba', '#2460b6'];
    var currentBbColor = bgColors[0];
    var startTime;
    var endTime;

    var counter = 0;
    var timeLimit = 30;
    var timeCounter = timeLimit;
    var noteIndex = 0;
    var isPaused = true;
    var isShowingKeySelectionContainer = false;
    var isBemolAvailable = true;
    var isSharpAvailable = true;

    var body = document.getElementById('body');
    var screenWidth = body.clientWidth;
    var screenHeight = body.clientHeight;

    var modeTxt = document.createElement('p');
    var noteTxt = document.createElement('p');
    var positionTxt = document.createElement('p');
    var completedTxt = document.createElement('p');
    var buttonWidth = 300;
    var buttonHeight = 40;

    noteTxt.id = 'noteTxt';
    positionTxt.id = 'positionTxt';
    completedTxt.id = 'completedTxt';

    var textColor = 'white';
    var notesFontFamily = '"Oswald", sans-serif';
    var fontFamily = '"Open Sans Condensed", sans-serif';


    modeTxt.style.color = textColor;
    modeTxt.style.fontFamily = notesFontFamily;
    modeTxt.style.fontSize = '80px';
    modeTxt.style.fontWeight = '700';
    modeTxt.style.marginTop = '-120px';
    modeTxt.style.marginBottom = '20px';
    modeTxt.style.letterSpacing = '0px';
    modeTxt.style.userSelect = 'none';
    modeTxt.style.textTransform = 'uppercase';

    noteTxt.style.color = textColor;
    noteTxt.style.fontFamily = notesFontFamily;
    noteTxt.style.fontSize = '300px';
    noteTxt.style.fontWeight = '700';
    noteTxt.style.marginTop = '-110px';
    noteTxt.style.marginBottom = '0px';
    noteTxt.style.letterSpacing = '-10px';
    noteTxt.style.userSelect = 'none';
    noteTxt.style.textShadow = '5px 5px 10px rgba(0, 0, 0, 0.1)';

    positionTxt.style.color = textColor;
    positionTxt.style.fontFamily = fontFamily;
    positionTxt.style.fontSize = '65px';
    positionTxt.style.marginTop = '-80px';
    positionTxt.style.marginBottom = '10px';
    positionTxt.style.userSelect = 'none';

    completedTxt.innerText = 'Press SPACE BAR to mark as completed.'
    completedTxt.style.color = textColor;
    completedTxt.style.fontFamily = fontFamily;
    completedTxt.style.marginTop = '5px';
    completedTxt.style.marginBottom = '0px';
    completedTxt.style.userSelect = 'none';

    document.getElementById('mode_container').appendChild(modeTxt)
    document.getElementById('note_container').appendChild(noteTxt)
    document.getElementById('position_container').appendChild(positionTxt);
    document.getElementById('text_container').appendChild(completedTxt);

    var resetbtn = new Buttom('resetbtn', 'reset', setNewPosition);
    var notesBtn = new Buttom('notesBtn', 'notes', showOptionsContainer);
    //var listBtn = new Buttom('listBtn', 'list', null);
    var timerbtn = new Buttom('timerbtn', 'timer', null);
    var playBtn = new Buttom('playBtn', 'play', playBtnAction);

    var bemolBtn = new KeyTypeButtom('bemol', currentBbColor, onKeySelectionBtn);
    document.getElementById('options_keys_container').appendChild(bemolBtn.svg);

    for (var i = 0; i < notes.length; i++) {
        var key = new KeyButtom(notes[i].letter, onKeySelectionBtn);
        document.getElementById('options_keys_container').appendChild(key.svg);
        keys.push(key);
    }

    var sharpBtn = new KeyTypeButtom('sharp', currentBbColor, onKeySelectionBtn);
    document.getElementById('options_keys_container').appendChild(sharpBtn.svg);

    for (var i = 0; i < modes.length; i++) {
        var modeBtn = new ModeButtom(modes[i], onModeSelectionBtn);
        modeBtns.push(modeBtn);
        document.getElementById('options_modes_container').appendChild(modeBtn.svg);
    }

    modeBtns[0].isActive = true;

    var typeText = new SVGText('#');
    document.getElementById('note_container').appendChild(typeText.svg)

    var closeBtn = new CloseButtom('close', currentBbColor, showOptionsContainer);
    document.getElementById('closeBtn_modes_container').appendChild(closeBtn.svg);

    window.onresize = onresize;
    setNotesAvailable();
    update();
    changePositionAndNote();
    setTimer();

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
    };

    function changePositionAndNote() {

        var noteAvailable = checkForNotesAvaialable();

        if (noteAvailable) {
            noteIndex = Math.floor(Math.random() * notesAvailable.length);

            if (checkPreviousNotes(notesAvailable[noteIndex])) {
                changePositionAndNote();
            } else {

                if (startTime != null) {
                    endTime = new Date();
                    var timeDiff = endTime - startTime; //in ms
                    // strip the ms
                    timeDiff /= 1000;
                    previousNotes[(previousNotes.length - 1)].time = timeDiff;
                }

                notesAvailable[noteIndex].isActive = false;
                previousNotes.push(notesAvailable[noteIndex]);

                startTime = new Date();

                modeTxt.innerText = currentMode;
                noteTxt.innerText = notesAvailable[noteIndex].letter;
                positionTxt.innerHTML = 'POSITION ' + notesAvailable[noteIndex].position;

                getBgColor();

                body.style.backgroundColor = currentBbColor;
                document.getElementById('options_title_container').style.color = currentBbColor;

                var rect = document.getElementById('note_container').getBoundingClientRect();
                typeText.updateStroke(notesAvailable[noteIndex].noteType, currentBbColor, (rect.right - 70));

                for (var i = 0; i < keys.length; i++) {
                    keys[i].updateColor(currentBbColor);
                }

                for (var i = 0; i < modeBtns.length; i++) {
                    modeBtns[i].updateColor(currentBbColor);
                }

                bemolBtn.updateColor(currentBbColor);
                sharpBtn.updateColor(currentBbColor);

                var main_container = document.getElementById('options_container');
                var containerHeight = main_container.clientHeight;
                var containerWidth = main_container.clientWidth;
                closeBtn.updateColor(currentBbColor, (containerWidth - 50), (containerHeight - 35));
            }
        }
    };

    function setTimer() {
        timerbtn.updateText(timeCounter, currentBbColor)
    };

    function getBgColor() {
        var color = bgColors[(Math.floor(Math.random() * bgColors.length))];
        if (color == currentBbColor) {
            return getBgColor();
        }
        currentBbColor = color;
    };

    function checkPreviousNotes(pnote) {

        for (var i = 0; i < previousNotes.length; i++) {
            if (previousNotes[i].isPlayed(pnote)) {
                pnote.isActive = false;
                return true;
            }
        }
        return false;
    };

    function setNewPosition() {
        timeCounter = timeLimit;
        changePositionAndNote();
        counter = 0;
        setTimer();
    };

    onresize(null);

    function onresize(e) {
        var main_container = document.getElementById('main_container');
        var containerHeight = main_container.clientHeight;
        body = document.getElementById('body');
        screenHeight = window.innerHeight;
        screenWidth = window.innerWidth;
        var ypos = (screenHeight - containerHeight) / 2;
        var xpos = (screenWidth - buttonWidth) / 2;
        main_container.style.top = ypos + 'px';
        main_container.style.width = screenWidth + 'px';
        document.getElementById('options_container').style.top = screenHeight + 'px';
    };

    function playBtnAction() {
        isPaused = !isPaused;
        if (!isPaused) {
            update();
        }
    };

    function showOptionsContainer() {

        var position = 0;

        var main_container = document.getElementById('options_container');
        var containerHeight = main_container.clientHeight;
        console.log(containerHeight);

        if (isShowingKeySelectionContainer) {
            position = screenHeight;
            modeTxt.innerText = currentMode;
        } else {
            position = screenHeight - containerHeight;
        }

        TweenMax.to(document.getElementById('options_container'), 0.25, {
            top: (position + 'px')
        });

        isShowingKeySelectionContainer = !isShowingKeySelectionContainer;
    }

    function onKeySelectionBtn(keyButton) {

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].letter === keyButton.name) {
                notes[i].isActive = keyButton.isActive;
            }
        }

        if (keyButton.name === 'bemol') {
            isBemolAvailable = keyButton.isActive;
        } else if (keyButton.name === 'sharp') {
            isSharpAvailable = keyButton.isActive;
        }

        setNotesAvailable();
    }

    function onModeSelectionBtn(modeButtom) {
        for (var i = 0; i < modeBtns.length; i++) {
            if (modeBtns[i].name === modeButtom.name) {
                modeBtns[i].isActive = true;
                currentMode = modeBtns[i].name;
            } else {
                modeBtns[i].isActive = false;
            }

            modeBtns[i].updateColor(currentBbColor);
        }
    }

    function onCloseBtnAction(modeButtom) {

    }

    function setNotesAvailable() {

        notesAvailable = [];

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].isActive) {
                for (var j = 0; j < notePositions.length; j++) {
                    var note = new Note(keys[i].name);
                    note.position = (j + 1);

                    if (!checkPreviousNotes(note)) {
                        notesAvailable.push(note);
                    }

                    if (isBemolAvailable) {
                        var noteBemol = new Note(keys[i].name);
                        noteBemol.position = (j + 1);
                        noteBemol.noteType = 'b';
                        if (!checkPreviousNotes(noteBemol)) {
                            notesAvailable.push(noteBemol);
                        }
                    }

                    if (isSharpAvailable) {
                        var noteSharp = new Note(keys[i].name);
                        noteSharp.position = (j + 1);
                        noteSharp.noteType = '#';
                        if (!checkPreviousNotes(noteSharp)) {
                            notesAvailable.push(noteSharp);
                        }
                    }
                }
            }
        }
    }

    function checkForNotesAvaialable() {
        for (var i = 0; i < notesAvailable.length; i++) {
            if (notesAvailable[i].isActive) {
                return true;
            }
        }
        return false;
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
    };
}