function Shotgun() {
    this.sparks = [];

    this.draw = function() {
        // Drawing the shotgun
        push();
        translate(mouseX, mouseY);
        rotate(-PI / 2);
        fill(100);
        rect(-10, -30, 20, 100);
        fill(150);
        ellipse(-10, -30, 30, 10);
        pop();

        // Drawing the sparks
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            const spark = this.sparks[i];
            fill(spark.color);
            ellipse(spark.x, spark.y, spark.size);
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vy += spark.gravity;
            spark.size *= 0.95; // Make the sparks shrink over time
            if (spark.size < 0.5) {
                this.sparks.splice(i, 1); // Remove small sparks
            }
        }
    };

    this.createSparks = function() {
        for (let i = 0; i < 80; i++) { // Increased number of sparks
            const angle = random(-PI / 4, PI / 4); // Wider spread of sparks
            const speed = random(6, 20); // Increased speed of sparks
            const vx = -speed * cos(angle); // Negative velocity for left direction
            const vy = speed * sin(angle);
    
            this.sparks.push({
                x: mouseX,
                y: mouseY,
                vx: vx,
                vy: vy,
                size: random(5, 10),
                color: color(random(200, 255), random(200, 255), 0),
                gravity: 0.1
            });
        }
    };

    this.fire = function(zombies) {
        // Create sparks on firing
        this.createSparks();

        for (let i = zombies.length - 1; i >= 0; i--) {
            let zombie = zombies[i];
            let d = dist(mouseX, mouseY, zombie.x, zombie.y);

            let coneLength = 6 * 37.7952; // Increased cone length
            let coneWidth = 3 * 37.7952; 

            if (d < coneLength) {
                zombie.health -= 50;
                if (zombie.health <= 0) {
                    zombies.splice(i, 1);
                    horde.addZombies(1);
                    killedZombiesCount += 1; // Increase the killed zombies count
                }
            }
        }
    };
}