(() => {

    const initialiseGame = (puzzleNumber) => {
        const levels = [40, 30, 20, 10, 5, 1];
        const submitButton = document.getElementById("btnSubmit");
        const levelTitle = document.getElementById("puzzle-level-title");
        const c = document.createElement("canvas");
        const ctx = c.getContext('2d');
        const img1 = new Image();
        let level = 0;
    
        const renderImage = function () {
            
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
        }
    
        img1.onload = function () {
            renderImage();
        };
    
        submitButton.addEventListener("click", () => {
            renderImage()
            if (level === levels.length) submitButton.disabled = true;
        });
    
        img1.src = "albums/" + puzzleNumber + ".jpg"
    }

    const getTodaysPuzzleNumber = () => {
        // TODO: make this fetch a number based on the current date.
        return Math.floor(Math.random() * 4) + 1;
    }
    
    initialiseGame(getTodaysPuzzleNumber());
})();