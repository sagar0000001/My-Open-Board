
/* --------------------------------variables-------------------------------- */
/* --------------------------------Donot wrap inside brackets --------------------------------*/
let board = document.querySelector("canvas")
let tool = board.getContext("2d") //context for any tool using

// let lineTool = document.querySelector(".fa-arrows-alt-h")
// let rectTool = document.querySelector(".fa-square")
// let ctool /*current tool*/ = "rectTool"
let redDiv = document.querySelector(".red")
let greenDiv = document.querySelector(".green")
let blueDiv = document.querySelector(".blue")
// Tool Size Option & its CSS
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let rect = document.querySelector("#rect");
let line = document.querySelector("#line");
let mousedown = false;
let cTool = "pencil";
let cColor = "lightpink";
let options = document.querySelectorAll(".size-box");

let xi, xf, yi, yf;
let boardTop = board.getBoundingClientRect().top
let drawingMode = true


/* --------------------------------Default set-------------------------------- */
{
    board.width = window.innerWidth
    board.height = window.innerHeight
    // @ts-ignore
    pencil.style.boxShadow = "0px 0px 12px #888888"
    // @ts-ignore
    redDiv.style.border = "2px solid white"
    // @ts-ignore
    redDiv.style.boxShadow = "0px 0px 5px #cbcccc"

    // board.height = 400
    // board.width = 1000
}

/* -------------------------------- Event Listeners------------------------------------------------ */
{
    redDiv.addEventListener("click", function () {
        cColor = "lightpink";
        tool.strokeStyle = cColor

        // @ts-ignore
        blueDiv.style.border = "none"
        // @ts-ignore
        blueDiv.style.boxShadow = "none"
        // @ts-ignore
        greenDiv.style.border = "none"
        // @ts-ignore
        greenDiv.style.boxShadow = "none"

        // @ts-ignore
        redDiv.style.border = "2px solid white"
        // @ts-ignore
        redDiv.style.boxShadow = "0px 0px 5px #cbcccc"
    })
    greenDiv.addEventListener("click", function () {
        cColor = "lightgreen"
        tool.strokeStyle = cColor

        // @ts-ignore
        redDiv.style.border = "none"
        // @ts-ignore
        redDiv.style.boxShadow = "none"
        // @ts-ignore
        blueDiv.style.border = "none"
        // @ts-ignore
        blueDiv.style.boxShadow = "none"

        // @ts-ignore
        greenDiv.style.border = "2px solid white"
        // @ts-ignore
        greenDiv.style.boxShadow = "0px 0px 5px #cbcccc"
    })
    // @ts-ignore
    blueDiv.addEventListener("click", function (e) {
        cColor = "lightblue"
        tool.strokeStyle = cColor

        // @ts-ignore
        redDiv.style.border = "none"
        // @ts-ignore
        redDiv.style.boxShadow = "none"
        // @ts-ignore
        greenDiv.style.border = "none"
        // @ts-ignore
        greenDiv.style.boxShadow = "none"

        // @ts-ignore
        blueDiv.style.border = "2px solid white"
        // @ts-ignore
        blueDiv.style.boxShadow = "0px 0px 5px #cbcccc"
    })



    // tool.fillRect(0, 0, 400, 200)
    //add event listener on body
    // console.log(board.getBoundingClientRect()); //properties of board (width, height, starting x, starging y ,etc..)

    board.addEventListener("mousedown", function (e) {
        mousedown = true;
        // console.log("Mouse was pressed");
        // let xPos = e.clientX
        // let yPos = e.clientY
        // console.log(xPos, yPos)
        xi = e.clientX //x pos on current Window
        yi = e.clientY /*y pos on current Window*/ - boardTop

        tool.strokeStyle = cColor;
        if (cTool == "pencil" || cTool == "eraser" || cTool == "line") {
            if (cTool == "eraser") tool.strokeStyle = "white"

            tool.beginPath()
            tool.moveTo(e.clientX, e.clientY - boardTop)
        }


    })
    let txi = xi
    let tyi = yi

    board.addEventListener("mousemove", function (e) {
        if (drawingMode == false || mousedown == false) { return; }
        // console.log(e.clientX, e.clientY - boardTop);
        tool.lineTo(e.clientX, e.clientY - boardTop)
        tool.stroke()
        // @ts-ignore
        txi = e.clientX
        // @ts-ignore
        tyi = e.clientY - boardTop
    })
    board.addEventListener("mouseup", function (e) {
        // console.log("Mouse was pressed");
        // let xPos = e.clientX
        // let yPos = e.clientY
        // console.log("canvas: ", xPos, yPos)
        // alert("mouse was lifted")
        xf = e.clientX //x on the Window
        yf = e.clientY /*y acc to Window*/ - boardTop
        // drawingMode = false
        mousedown = false

        if (cTool == "rect") {
            tool.strokeRect(xi, yi, xf - xi, yf - yi) //x direction=> , y direction⇓
            console.log("Rectangle Tool");
        }
        else if (cTool == "line") {
            tool.beginPath();
            tool.moveTo(xi, yi)
            tool.lineTo(xf, yf)
            tool.stroke()
            console.log("Line tool implemented");
        }
    })

    // Tool Size Option & its CSS
    // @ts-ignore
    pencil.addEventListener("click", function (e) {
        drawingMode = true;

        // @ts-ignore
        if (cTool == "pencil") options[0].style.display = "flex";
        else {
            for (let i = 0; i < options.length; i++) {
                // @ts-ignore
                options[i].style.display = "none";
            }
            // @ts-ignore
            pencil.style.boxShadow = "none";
            // @ts-ignore
            eraser.style.boxShadow = "none";
            // @ts-ignore
            rect.style.boxShadow = "none";
            // @ts-ignore
            line.style.boxShadow = "none";
            cTool = "pencil";
        }
        // @ts-ignore
        pencil.style.boxShadow = "0px 0px 12px #888888"
    })
    // @ts-ignore
    eraser.addEventListener("click", function (e) {
        drawingMode = true;

        // @ts-ignore
        if (cTool == "eraser") options[1].style.display = "flex";
        else {
            for (let i = 0; i < options.length; i++) {
                // @ts-ignore
                options[i].style.display = "none";
            }
            // @ts-ignore
            pencil.style.boxShadow = "none";
            // @ts-ignore
            eraser.style.boxShadow = "none";
            // @ts-ignore
            rect.style.boxShadow = "none";
            // @ts-ignore
            line.style.boxShadow = "none";
            cTool = "eraser";
        }
        // @ts-ignore
        eraser.style.boxShadow = "0px 0px 12px #888888";
    })
    // @ts-ignore
    rect.addEventListener("click", function (e) {
        drawingMode = false /* for pencil */
        console.log("Rectangle tool selected");

        // @ts-ignore
        if (cTool == "rect") options[2].style.display = "flex";
        else {
            for (let i = 0; i < options.length; i++) {
                // @ts-ignore
                options[i].style.display = "none";
            }
            // @ts-ignore
            pencil.style.boxShadow = "none";
            // @ts-ignore
            eraser.style.boxShadow = "none";
            // @ts-ignore
            rect.style.boxShadow = "none";
            // @ts-ignore
            line.style.boxShadow = "none";
            cTool = "rect";
        }
        // @ts-ignore
        rect.style.boxShadow = "0px 0px 12px #888888"; //rect tool selected
    })
    // @ts-ignore
    line.addEventListener("click", function (e) {
        drawingMode = false /* for pencil */
        console.log("Pencil tool selected");

        // @ts-ignore
        if (cTool == "line") options[3].style.display = "flex";
        else {
            for (let i = 0; i < options.length; i++) {
                // @ts-ignore
                options[i].style.display = "none";
            }
            // @ts-ignore
            pencil.style.boxShadow = "none";
            // @ts-ignore
            eraser.style.boxShadow = "none";
            // @ts-ignore
            rect.style.boxShadow = "none";
            // @ts-ignore
            line.style.boxShadow = "none";
            cTool = "line";
        }
        // @ts-ignore
        line.style.boxShadow = "0px 0px 12px #888888";
    })
}

/* -------------------Testing------------------------------------------------ */
{
    let sizebox = document.querySelector(".size-box");
    sizebox.addEventListener("click", function (e) {
        // @ts-ignore
        console.log(e.target.classList[0]); // e.target => child element
    })
}
