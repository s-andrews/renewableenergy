var solar = false
var turbine = false
var battery = false
var battery_level = 0
var wind = true
var weather = "sun"
var spark = new Image()
spark.src = "images/spark.svg"

var renewable_line_percent = 100
var pylon_line_percent = 0
var battery_line_percent = 0

$( document ).ready(function() {
    $(".clickable").click(something_clicked)

    $(window).on("resize",redraw_lines)

    redraw()

    setInterval(update_spark_positions,200)

})

function update_spark_positions () {
    if ((solar & (weather == "sun" | weather == "grey_cloud")) | (turbine & wind)) {
        renewable_line_percent += 5
        if (renewable_line_percent > 100) {
            renewable_line_percent -= 100
        }
    }


    redraw_lines()
}


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


    redraw_lines()
}

function redraw_lines() {

    // Draw canvas lines
    let canvas = $("#maincanvas")[0].getContext("2d")

    $("#maincanvas")[0].width = window.innerWidth;
    $("#maincanvas")[0].height = window.innerHeight;

    canvas.lineWidth = 60

    if (solar) {
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
            canvas.stroke()

            // We also need to draw a spark on the line
            let total_length = (x2-x1)+(y3-y2)
            let distance_on_line = Math.floor((total_length/100)*renewable_line_percent)

            let solar_x = 0
            let solar_y = 0
            if (distance_on_line < (x2-x1)) {
                solar_x = x1+distance_on_line
                solar_y = y1
            }
            else {
                solar_x = x2
                solar_y = y2+(distance_on_line - (x2-x1))
            }
            solar_x -= spark.width/2
            solar_y -= spark.height/2
            canvas.drawImage(spark,solar_x,solar_y)

        }
        else {
            canvas.strokeStyle = "gray"
            canvas.stroke()
        }
    }

    if (turbine) {
        let x1 = $("#turbine").position()["left"]
        let y1 = $("#solar").position()["top"] + ($("#solar").height()/2)
        let x2 = $("#museum").position()["left"] + 2*($("#museum").width()/3)
        let y2 = y1
        let x3 = x2
        let y3 = $("#museum").position()["top"]

        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2,y2)
        canvas.lineTo(x3,y3)
        if (wind) {
            canvas.strokeStyle = "green"
            canvas.stroke()

            // We also need to draw a spark on the line
            let total_length = (x1-x2)+(y3-y2)
            let distance_on_line = Math.floor((total_length/100)*renewable_line_percent)

            let turbine_x = 0
            let turbine_y = 0
            if (distance_on_line < (x1-x2)) {
                turbine_x = x1-distance_on_line
                turbine_y = y1
            }
            else {
                turbine_x = x2
                turbine_y = y1+(distance_on_line - (x1-x2))
            }
            turbine_x -= spark.width/2
            turbine_y -= spark.height/2
            canvas.drawImage(spark,turbine_x,turbine_y)
        }
        else {
            canvas.strokeStyle = "gray"
            canvas.stroke()
        }

    }

    if (battery) {
        let x1 = $("#battery").position()["left"]
        let y1 = $("#battery").position()["top"] + ($("#battery").height()/2)
        let x2 = $("#museum").position()["left"] + ($("#museum").width())
        let y2 = y1

        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2,y2)
        canvas.strokeStyle = "green"
        canvas.stroke()

    }

    if (true) { // Pylon
        let x1 = $("#pylon").position()["left"] + $("#pylon").width()
        let y1 = $("#battery").position()["top"] + ($("#battery").height()/2)
        let x2 = $("#museum").position()["left"] 
        let y2 = y1

        canvas.beginPath()
        canvas.moveTo(x1, y1)
        canvas.lineTo(x2,y2)
        canvas.strokeStyle = "green"
        canvas.stroke()

    }


}

