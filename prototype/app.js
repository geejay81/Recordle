function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toUpperCase().includes(val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            //b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            //b.innerHTML += arr[i].substr(val.length);
            b.innerHTML = arr[i];
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].replace("'","") + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });

            a.appendChild(b);
          }

          if (a.childElementCount == 5) break;
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", (e) => {
      closeAllLists(e.target);
  });
  }

(() => {

    const getTodaysPuzzleNumber = () => {
        // TODO: make this fetch a number based on the current date.
        return Math.floor(Math.random() * 4) + 1;
    }

    const initialiseGame = () => {
        const puzzleNumber = getTodaysPuzzleNumber();
        const levels = [40, 30, 20, 15, 10, 5, 1];
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
            lostHeader.classList.add("title");
            lostHeader.innerHTML ="Better luck next time!";
            const lostText = document.createElement("p");
            lostText.innerHTML = "The correct answer was " + puzzle["albumTitle"] + " by " + puzzle["artist"] + ".";
            puzzleControls.innerHTML = "";
            puzzleControls.appendChild(lostHeader);
            puzzleControls.appendChild(lostText);
        }

        const showFinalScreen = () => {
            level = level == levels.length;
            renderNextImage();
            const wonHeader = document.createElement("h3");
            wonHeader.classList.add("title");
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

        const getAutocompleteSuggestions = () => {
            const result = [];

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
                        .map(album => album["artist"] + " - " + album["albumTitle"])
                        .sort();
                    for (let i = 0; i < matches.length; i++) {
                        result.push(matches[i]);
                    }

                    autocomplete(guess, result);
                })
                .catch(error => console.log(error));
        }
    
        img1.onload = () => {
            resetPuzzleElements();
            getPuzzle();
        };

        suggestionsList.onclick = (event) => {
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
                if (level == levels.length) showLostGame();
            }
        });

        getAutocompleteSuggestions();

        img1.src = "albums/" + puzzleNumber + ".jpg"
    }
    
    initialiseGame();
})();