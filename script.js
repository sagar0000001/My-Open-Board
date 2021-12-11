
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
let boardLeft = board.getBoundingClientRect().left
let boardTop = board.getBoundingClientRect().top
let drawingMode = true

let sizeboxArr = document.querySelectorAll(".size-box");
let toolSizes = [1, 4, 1, 1] //pencilSize, eraserSize, rectSize, lineSize



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
        console.log("Red color selected");
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
        console.log("green color selected");
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
        console.log("blue color selected");
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


    board.addEventListener("mousedown", function (e) {
        console.log("Mouse pressed on canvas board");
        mousedown = true;
        // let xPos = e.clientX
        // let yPos = e.clientY
        // console.log(xPos, yPos)
        xi = e.clientX /* x pos on current Window */ - boardLeft
        yi = e.clientY /*y pos on current Window*/ - boardTop

        // tool property & begin path
        tool.strokeStyle = cColor;
        if (cTool == "pencil" || cTool == "eraser" || cTool == "line") {
            if (cTool == "eraser") tool.strokeStyle = "white"

            tool.beginPath()
            tool.moveTo(e.clientX, e.clientY - boardTop)
        }

        // make size box not displayed
        console.log("all size boxes are hide");
        for (let i = 0; i < options.length; i++) {
            // @ts-ignore
            options[i].style.display = "none";
        }

    })

    board.addEventListener("mousemove", function (e) {
        if (drawingMode == false || mousedown == false) { return; }
        console.log(e.clientX, e.clientY - boardTop);
        tool.lineTo(e.clientX - boardLeft, e.clientY - boardTop)
        tool.stroke()

        // txi = e.clientX    //lineTo karne se tool move bhi ho jata hai isliye previous x,y positions nikalne ki jarurat nhi hue
        // tyi = e.clientY - boardTop
    })
    board.addEventListener("mouseup", function (e) {
        console.log("Mouse is released");
        // let xPos = e.clientX
        // let yPos = e.clientY
        // console.log("canvas: ", xPos, yPos)
        // alert("mouse was lifted")
        xf = e.clientX /* x on the Window */ - boardLeft
        yf = e.clientY /*y acc to Window*/ - boardTop
        // drawingMode = false
        mousedown = false

        if (cTool == "rect") {
            tool.strokeRect(xi, yi, xf - xi, yf - yi) //x direction=> , y direction⇓
            // console.log("Rectangle Tool");
        }
        else if (cTool == "line") {
            tool.beginPath();
            tool.moveTo(xi, yi)
            tool.lineTo(xf, yf)
            tool.stroke()
            // console.log("Line tool implemented");
        }
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
                console.log(index, toolSizes[index]);
                tool.lineWidth = toolSizes[index]
            }
        })
    });

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
