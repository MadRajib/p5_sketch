const legendSketch = (p) => {

    p.setup = function() {
        p.createCanvas(200, 300);
    };

    p.draw = function() {
        p.background(240);
        
        // Symbol details / legend items        
        p.push();   
        p.fill(0);
        p.ellipse(30, 30, 20, 20);
        p.textSize(14);
        p.text("= Black Pawn", 50, 35);
        p.pop();

        p.push();
        p.fill(255);
        p.ellipse(30, 60, 20, 20);
        p.pop();
        p.text("= White Pawn", 50, 65);

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
    };

};

// Attach the legend to its HTML div
new p5(legendSketch, 'legend-canvas');