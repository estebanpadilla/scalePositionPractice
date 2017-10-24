var Note = (
	function () {

		function Note(pletter) {
			this.letter = pletter;
			this.position = 0;
			this.noteType = '';
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