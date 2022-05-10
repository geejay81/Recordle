(() => {

    const getTodaysPuzzleNumber = () => {
        // TODO: make this fetch a number based on the current date.
        return Math.floor(Math.random() * 4) + 1;
    }

    const initialiseGame = () => {
        const puzzleNumber = getTodaysPuzzleNumber();
        const levels = [40, 30, 20, 10, 5, 1];
        const submitButton = document.getElementById("btnSubmit");
        const levelTitle = document.getElementById("puzzle-level-title");
        const previousGuesses = document.getElementById("previous-guesses");
        const puzzleControls = document.getElementById("puzzle-controls");
        const guess = document.getElementById("guess");
        const suggestionsList = document.getElementById("suggestionsList");
        const c = document.createElement("canvas");
        const ctx = c.getContext('2d');
        const img1 = new Image();
        let answer = "";
        let puzzle = {};
        let level = 0;

        const resetPuzzleElements = () => {
            previousGuesses.innerHTML = "";
            guess.value = "";
        }
    
        const renderNextImage = () => {
            
            const w = img1.width;
            const h = img1.height;
    
            c.width = w;
            c.height = h;
            ctx.drawImage(img1, 0, 0);
    
            var pixelArr = ctx.getImageData(0, 0, w, h).data;
            const sample_size = levels[level];
    
            for (let y = 0; y < h; y += sample_size) {
                for (let x = 0; x < w; x += sample_size) {
                let p = (x + (y*w)) * 4;
                ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                ctx.fillRect(x, y, sample_size, sample_size);
                }
            }
    
            let img2 = new Image();
            img2.src = c.toDataURL("image/jpeg");
            img2.width = 300;
            
            document.getElementById("puzzle-image")?.remove();
            img2.id = "puzzle-image";
            document.getElementById("puzzle-box").appendChild(img2);
            level++;
            levelTitle.innerHTML = "Level " + level;
            guess.focus();
        }

        const logGuess = () => {
            let nextGuess = document.createElement("li");
            nextGuess.innerHTML = guess.value;
            previousGuesses.appendChild(nextGuess);
            guess.value = "";
        }

        const showLostGame = () => {
            const lostHeader = document.createElement("h3");
            lostHeader.innerHTML ="Better luck next time!";
            const lostText = document.createElement("p");
            lostText.innerHTML = "The correct answer was " + puzzle["albumTitle"] + " by " + puzzle["artist"] + ".";
            puzzleControls.innerHTML = "";
            puzzleControls.appendChild(lostHeader);
            puzzleControls.appendChild(lostText);
        }

        const showFinalScreen = () => {
            const wonHeader = document.createElement("h3");
            wonHeader.innerHTML = "You did it!";
            const wonText = document.createElement("p");
            wonText.innerHTML = "You knew it was " + puzzle["albumTitle"] + " by " + puzzle["artist"] + " at level " + level + ".";
            puzzleControls.innerHTML = "";
            puzzleControls.appendChild(wonHeader);
            puzzleControls.appendChild(wonText);
        }

        const getPuzzle = () => {
            fetch("data.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(json => {
                    const puzzleSourceData = json
                    puzzle = puzzleSourceData.filter(album => album["id"] === puzzleNumber)[0] || null;
                    answer = puzzle["artist"] + " - " + puzzle["albumTitle"];
                    renderNextImage();
                })
                .catch(error => console.log(error));
        }

        const getAutocompleteSuggestions = (query) => {
            suggestionsList.innerHTML = "";
            if (query.length == 0) return;

            fetch("data.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(json => {
                    const puzzleSourceData = json
                    let matches = puzzleSourceData
                        .filter(album => (album["artist"] + " - " + album["albumTitle"]).toLowerCase().includes(query.toLowerCase()))
                        .map(album => album["artist"] + " - " + album["albumTitle"])
                        .sort()
                        .slice(0,5);
                    suggestionsList.innerHTML = "";
                    suggestionsList.style.display = "block";
                    for (let i = 0; i < matches.length; i++) {
                        suggestionsList.innerHTML += "<li>" + matches[i] + "</li>";
                    }
                })
                .catch(error => console.log(error));
        }
    
        img1.onload = function () {
            resetPuzzleElements();
            getPuzzle();
        };

        suggestionsList.onclick = function (event) {
            const setValue = event.target.innerText;
            guess.value = setValue;
            this.innerHTML = "";
          };
    
        submitButton.addEventListener("click", () => {
            if (guess.value.toLowerCase() === answer.toLowerCase()) {
                showFinalScreen();
            } else {
                logGuess();
                renderNextImage();
                if (level > levels.length) showLostGame();
            }
        });

        guess.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                submitButton.click();
            } else {
                getAutocompleteSuggestions(guess.value);
            }
        });
    
        img1.src = "albums/" + puzzleNumber + ".jpg"
    }
    
    initialiseGame();
})();