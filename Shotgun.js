function Shotgun() {
    this.sparks = [];

    this.draw = function() {
        push();
        translate(mouseX, mouseY);
        rotate(-PI / 2);
        fill(100);
        rect(-10, -30, 20, 100);
        fill(150);
        ellipse(-10, -30, 30, 10);
        pop();

        // Draw the sparks
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            let spark = this.sparks[i];
            fill(spark.color);
            ellipse(spark.x, spark.y, spark.size);
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vy += spark.gravity;
            spark.size *= 0.95;
            if (spark.size < 0.5) {
                this.sparks.splice(i, 1);
            }
        }
    }

    this.fire = function(zombies) {
        for (let i = zombies.length - 1; i >= 0; i--) {
            let zombie = zombies[i];
            let d = dist(mouseX, mouseY, zombie.x, zombie.y);

            let coneLength = 4 * 37.7952; // 4 cm to pixels
            let coneWidth = 3 * 37.7952;  // 3 cm to pixels

            if (d < coneLength) {
                let angle = atan2(zombie.y - mouseY, zombie.x - mouseX);
                for (let j = 0; j < 10; j++) {
                    this.sparks.push({
                        x: mouseX,
                        y: mouseY,
                        vx: coneLength * cos(angle) * random(0.8, 1.2),
                        vy: coneWidth * sin(angle) * random(0.8, 1.2),
                        size: random(5, 10),
                        color: color(255, 0, 0, 150),
                        gravity: 0.1
                    });
                }

                zombie.health -= 50;
                if (zombie.health <= 0) {
                    zombies.splice(i, 1);
                    horde.addZombies(1);
                }
            }
        }
    }
}