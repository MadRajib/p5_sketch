const legendSketch = (p) => {

    p.setup = function() {
        p.createCanvas(200, 300);
    };

    p.draw = function() {
        p.background(240);
        
        p.push();
        p.fill(0);
        p.stroke(220);
        p.ellipse(30, 30, 30, 30);
        p.rect(20, 15, 20, 30);
        p.pop();
        p.text("= Black Knight", 50, 35);

        p.push();
        p.fill(255);
        p.triangle(30, 80, 40, 105, 20, 105);
        p.pop();
        p.text("= White Bishop", 50, 95);
        

        p.push();
        p.fill(255);
        p.rect(20, 120, 20, 30);
        p.pop();
        p.text("= White Rook", 50, 140);

        p.push();
        p.fill(255);
        p.ellipse(30, 180, 30, 30);
        p.rect(20, 165, 20, 30);
        p.pop();
        p.text("= White Knight", 50, 182);

        p.text("Controls:", 10, 220);
        p.text("To Move the Piece, Select \nthe Peice and then select the\nempty square.", 10, 240);
        p.fill(255, 0, 0);
        p.text("Reload to Reset the Game!", 10, 296);

        p.noLoop();
    };

};

// Attach the legend to its HTML div
new p5(legendSketch, 'legend-canvas');