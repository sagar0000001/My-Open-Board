
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
let cColor = "#FF5733";
let options = document.querySelectorAll(".size-box");

let xi, xf, yi, yf;
let boardLeft = board.getBoundingClientRect().left
let boardTop = board.getBoundingClientRect().top
let drawingMode = true

let sizeboxArr = document.querySelectorAll(".size-box");
let toolSizes = [1, 4, 1, 1] //pencilSize, eraserSize, rectSize, lineSize

let download = document.querySelector("#download");

/* --------------------------------Default set-------------------------------- */
{
    board.width = window.innerWidth
    board.height = window.innerHeight
    // @ts-ignore
    pencil.style.boxShadow = "0px 0px 12px #888888"
    // @ts-ignore
    redDiv.style.border = "2px solid white"
    // @ts-ignore
    redDiv.style.boxShadow = "0px 0px 12px #888888"

    sizeboxArr.forEach(sizebox => {
        // console.log(sizebox);
        // @ts-ignore
        sizebox.querySelector(".size1").style.border = "1px solid white"
        // @ts-ignore
        sizebox.querySelector(".size1").style.boxShadow = "0px 0px 3px orange"
    })

    // board.height = 400
    // board.width = 1000
}

/* -------------------------------- Event Listeners------------------------------------------------ */
{

    board.addEventListener("mousedown", function (e) {
        console.log("Mouse pressed on canvas board");
        mousedown = true;

        tool.strokeStyle = cColor;
        xi = e.clientX - boardLeft
        yi = e.clientY - boardTop
        beginPath({
            x: xi,
            y: yi
        })

        if (cTool == "eraser") {
            tool.globalCompositeOperation = "destination-out"
        }


        // make size box not displayed
        console.log("all size boxes are hide");
        for (let i = 0; i < options.length; i++) {
            // @ts-ignore
            options[i].style.display = "none";
        }

    })

    board.addEventListener("mousemove", function (e) {
        if (drawingMode == false || mousedown == false) { return; }         // drawing mode is for pencil & eraser

        if (cTool == "pencil") {
            drawStroke({
                x: e.clientX - boardLeft,
                y: e.clientY - boardTop,
            })
        }
        else if (cTool == "eraser") { // eraser
            erase(e.clientX - boardLeft, e.clientY - boardTop)
        }

    })
    board.addEventListener("mouseup", function (e) {
        mousedown = false
        tool.globalCompositeOperation = "source-over"
        // console.log("Mouse is released");

        xf = e.clientX /* x on the Window */ - boardLeft
        yf = e.clientY /*y acc to Window*/ - boardTop

        // For Non-drawing-mode tools
        if (cTool == "line") { //draw line
            drawStroke({
                x: xf,
                y: yf
            })
        }
        else if (cTool == "rect") {
            tool.strokeRect(xi, yi, xf - xi, yf - yi) //x direction=> , y direction⇓
            // console.log("Rectangle Tool");
        }

    })



    redDiv.addEventListener("click", function () {
        console.log("Red color selected");
        cColor = "#FF5733";
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
        redDiv.style.boxShadow = "0px 0px 5px #888888"
    })
    greenDiv.addEventListener("click", function () {
        console.log("green color selected");
        cColor = "#42DE15"
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
        greenDiv.style.boxShadow = "0px 0px 5px #888888"
    })
    // @ts-ignore
    blueDiv.addEventListener("click", function (e) {
        console.log("blue color selected");
        cColor = "#0096FF"
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
        blueDiv.style.boxShadow = "0px 0px 5px #888888"
    })


    // Tool Stroke & responsive UI
    // @ts-ignore
    pencil.addEventListener("click", function (e) {
        tool.lineWidth = toolSizes[0] // pencil size , index 0
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
        tool.lineWidth = toolSizes[1] //eraser size, index 1
        drawingMode = true; // like pencil movement

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
        tool.lineWidth = toolSizes[2] // rect size at index 2
        drawingMode = false /* for pencil */
        // console.log("Rectangle tool selected"); //consist of tool and sizebox

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
        tool.lineWidth = toolSizes[3] //line's size at index 3
        drawingMode = false /* for pencil */
        // console.log("Line tool selected");

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

    download.addEventListener("click", function (e) {
        let url = board.toDataURL() // create url for the pixels on canvas
        let a = document.createElement("a")
        a.href = url
        a.download = "drawing.png"
        a.click()
    })

    sizeboxArr.forEach((sizebox, index) => {
        sizebox.addEventListener("click", function (e) {
            let childClasses = ["size1", "size2", "size3", "size4"];
            // @ts-ignore
            let ele_class = e.target.classList[0] // e.target => child element
            if (childClasses.includes(ele_class)) {
                let i = childClasses.indexOf(ele_class);
                toolSizes[index] = i * 2 + 1
                if (index == 1) { //eraser
                    toolSizes[index] = (i + 1) * 4
                }
                tool.lineWidth = toolSizes[index]
                // console.log(index, toolSizes[index]);


                // make other sizedivs styles none
                sizebox.querySelectorAll(".size").forEach(sizeDiv => {
                    // @ts-ignore
                    sizeDiv.style.border = "none"
                    // @ts-ignore
                    sizeDiv.style.boxShadow = "none";
                })

                // @ts-ignore
                sizebox.querySelector(`.size${i + 1}`).style.border = "1px solid white"
                // @ts-ignore
                sizebox.querySelector(`.size${i + 1}`).style.boxShadow = "0px 0px 2px 1px orange"
            }
        })
    });

}



/* --------------------------------------Functions ---------------------------------------------------- */
{
    function beginPath(strokeObj) {
        tool.beginPath()
        tool.moveTo(strokeObj.x, strokeObj.y)
    }

    function drawStroke(strokeObj) {
        tool.lineTo(strokeObj.x, strokeObj.y)
        tool.stroke()
    }

    // eraser's
    function erase(x, y) {
        tool.beginPath();
        tool.moveTo(x, y);
        tool.arc(x, y, toolSizes[1], 0, Math.PI * 2, false);
        tool.fill();
    };

}

/* -------------------Testing------------------------------------------------ */
{
    /* For pencil size-box only */
    /* // let sizebox = document.querySelector(".size-box");
    // sizebox.addEventListener("click", function (e) {
    //     let childClasses = ["size1", "size2", "size3", "size4"];
    //     // @ts-ignore
    //     let ele_class = e.target.classList[0] // e.target => child element

    //     if (childClasses.includes(ele_class)) {
    //         // console.log(ele_class);
    //         let index = childClasses.indexOf(ele_class);

    //     }
    // }) */




}
