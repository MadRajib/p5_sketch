let yOffset = 20;
const gap = 10;

const legendSketch = (p) => {
    const legendItems = [
        { label: "= Black Pawn", fill: 0, stroke: 220, height: 30, draw: () => { p.ellipse(0, 0, 30, 30); } },
        { label: "= White Pawn", fill: 255, stroke: 0, height: 30, draw: () => { p.ellipse(0, 0, 30, 30); } },
        { label: "= White Bishop", fill: 255, stroke: 0, height: 30, draw: () => { p.triangle(0, -15, -15, 15, 15, 15); } },
        { label: "= White Rook", fill: 255, stroke: 0, height: 30, draw: () => { p.rect(-10, -15, 20, 30); } },
        { label: "= White Knight", fill: 255, stroke: 0, height: 30, draw: () => { p.ellipse(0, 0, 30, 30); p.rect(-10, -15, 20, 30); } }
    ];  

    p.setup = function() {
        p.createCanvas(200, 300);
    };

    p.draw = function() {
        p.background(240);
        
        for (const item of legendItems) {
            p.push();
            p.translate(30, yOffset);

            // Draw the piece
            p.fill(item.fill);
            if (item.stroke !== null) p.stroke(item.stroke); else p.noStroke();
            item.draw();

            // Draw text centered vertically relative to shape height
            p.fill(0);
            p.stroke(255);
            p.textAlign(p.LEFT, p.CENTER);
            p.text(item.label, 30, 0);

            p.pop();

            // Advance by shape height + spacing gap
            yOffset +=  item.height + gap;
        }

        p.translate(10, yOffset + 10);
        p.fill(0);
        p.stroke(0);
        p.text("Controls:", 0, 0);

        p.noStroke();
        p.text("To Move the Piece, Select \nthe Piece and then select the\nempty square.", 0, 20);

        p.fill(255, 0, 0);
        p.text("Reload to Reset the Game!", 0, 70);
        p.pop();
        
        p.noLoop();
    };

};

// Attach the legend to its HTML div
new p5(legendSketch, 'legend-canvas');