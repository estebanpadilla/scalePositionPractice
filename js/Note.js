var Note = (
	function () {

		function Note(pletter) {
			this.letter = pletter;
			this.position = 0;
			this.noteType = '';
			this.time = 0;
			this.isCompletedBeforeTimeEnds = false;
		}

		Note.prototype.isPlayed = function (pnote) {
			if (pnote.letter === this.letter && pnote.position === this.position && pnote.noteType === this.noteType) {
				return true;
			}
			return false;
		};

		return Note;
	}
)();