var solar = false
var turbine = false
var battery = false
var battery_level = 0
var wind = true
var weather = "sun"

$( document ).ready(function() {
    $(".clickable").click(something_clicked)

    redraw()
})

function something_clicked() {
    let name = $(this).attr('id')

    console.log("Name is "+name)

    if (name == "solar") {
        solar = !solar
    }

    if (name == "battery") {
        battery = !battery
    }

    if (name == "turbine") {
        turbine = !turbine
    }

    if (name == "wind") {
        wind = !wind
    }

    if (name == "weather") {
        if (weather == "sun") {
            weather = "grey_cloud"
        }
        else if (weather == "grey_cloud") {
            weather = "black_cloud"
        }
        else {
            weather = "sun"
        }
    }


    // Sanity check

    // Can't have a battery without either solar or turbine
    if (battery & (!solar & !turbine)) {
        battery=false
    }


    redraw()

}

function redraw() {

    // Draw visible elements

    if (solar) {
        $("#solar").css("opacity",1)
    }
    else {
        $("#solar").css("opacity",0.1)
    }

    if (turbine) {
        $("#turbine").css("opacity",1)
    }
    else {
        $("#turbine").css("opacity",0.1)
    }

    if (battery) {
        $("#battery").css("opacity",1)
    }
    else {
        $("#battery").css("opacity",0.1)
    }

    if (wind) {
        $("#wind").css("opacity",1)
    }
    else {
        $("#wind").css("opacity",0.1)
    }

    $("#weather").attr("src","images/"+weather+".svg")


    // Draw canvas lines
    let canvas = $("#maincanvas")[0].getContext("2d")

    $("#maincanvas")[0].width = window.innerWidth;
    $("#maincanvas")[0].height = window.innerHeight;

    canvas.lineWidth = 40

    if (solar) {
        canvas.beginPath()
        let x1 = $("#solar").position()["left"] + $("#solar").width()
        let y1 = $("#solar").position()["top"] + ($("#solar").height()/2)
        let x2 = $("#museum").position()["left"] + ($("#museum").width()/3)
        let y2 = y1
        let x3 = x2
        let y3 = $("#museum").position()["top"]

        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2,y2)
        canvas.lineTo(x3,y3)
        if (weather == "sun" | weather == "grey_cloud") {
            canvas.strokeStyle = "green"
        }
        else {
            canvas.strokeStyle = "gray"
        }
        canvas.stroke()
    }


}

