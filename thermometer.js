var thermometer = new Thermometer();

thermometer.paint(50, 5, 'black', 'red');

function Thermometer() {
    var canvas = document.getElementById('thermoCanvas');
    var ctx = canvas.getContext('2d');

    // overall parameters
    var ratio = 0.75;
    var wallWidth = 5;
    var wallColor = 'black';
    var fillColor = 'red';

    Thermometer.prototype.paint = function(percentage,
                                           wallWidth,
                                           wallColor,
                                           fillColor) {
        if(percentage) {
            this.ratio = percentage / 100;
        }

        if(wallWidth) {
            this.wallWidth = wallWidth;
        }

        if(wallColor) {
            this.wallColor = wallColor;
        }

        if(fillColor) {
            this.fillColor = fillColor;
        }

        // bulb parameters
        var radius = (canvas.width / 2) - (wallWidth / 2);
        var x = canvas.width / 2;
        var y = canvas.height - (radius + wallWidth);
        var endAngle = 1.3 * Math.PI;
        var startAngle = 1.7 * Math.PI;
        var counterClockwise = false;

        // tube parameters
        var tubeHeightFromTop = 0;

        // compute where the walls meet the bulb
        var rightSideStartX = x + radius * Math.cos(startAngle);
        var rightSideStartY = y + radius * Math.sin(startAngle);
        var leftSideStartX = x + radius * Math.cos(endAngle);
        var leftSideStartY = y + radius * Math.sin(endAngle);
        var tubeWidth = rightSideStartX - leftSideStartX;

        ctx.strokeStyle = wallColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = wallWidth;

        // draw bulb
        ctx.save();

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // fill percentage
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = fillColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = wallWidth;

        var tubeHeight = leftSideStartY - tubeHeightFromTop;
        var fillHeight = tubeHeight * this.ratio;

        ctx.rect(leftSideStartX, leftSideStartY - fillHeight, tubeWidth, fillHeight);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // draw sides
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(rightSideStartX+2, rightSideStartY+4);
        ctx.lineTo(rightSideStartX, tubeHeightFromTop);

        ctx.moveTo(leftSideStartX-2, leftSideStartY+4);
        ctx.lineTo(leftSideStartX, tubeHeightFromTop);
        ctx.stroke();

        ctx.restore();
    };
}
