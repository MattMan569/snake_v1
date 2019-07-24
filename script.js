'use strict';

var canv; // Canvas
var ctx; // Graphics context

var xv, yv; // X and Y velocities
var px, py; // Player X and Y coords
var gs; // Grid size
var tc; // Tile count
var ax, ay; // Apple coords, goal object
var trail = []; // The snake
var tailLength = 5; // How long the tail should be

xv = yv = 0;
px = py = 10;
gs = tc = 20;
ax = ay = 15;

window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");

    document.addEventListener("keydown", keyPressed);

    setInterval(game, 1000/15); // Called 15 times per second
};

function game () {
    // Move the player
    px += xv;
    py += yv;

    // Wrap X and Y areas of the canvas
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }

    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    // Draw snake
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

        // Game over : restart
        if (trail[i].x == px && trail[i].y == py) {
            tailLength = 5;
        }
    }

    // Push new snake segments
    trail.push({
        x: px,
        y: py
    });

    // Remove excess snake segments
    while (trail.length > tailLength) {
        trail.shift();
    }

    // Apple collected
    if (ax == px && ay == py) {
        tailLength++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    // Draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPressed (event) {
    switch (event.keyCode) {
        case 37: // Left
            if (xv === 1) return;
            xv = -1;
            yv = 0;
            break;
        case 38: // Up
            if (yv === 1) return;
            xv = 0;
            yv = -1;
            break;
        case 39: // Right
            if (xv === -1) return;
            xv = 1;
            yv = 0;
            break;
        case 40: // Down
            if (yv === -1) return;
            xv = 0;
            yv = 1;
            break;
    }
}
