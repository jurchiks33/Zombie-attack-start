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
        for (let i = 0; i < 80; i++) {
            const angle = random(-PI / 4, PI / 4);
            const speed = random(6, 20);
            const vx = -speed * cos(angle);
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
        this.createSparks();

        for (let i = zombies.length - 1; i >= 0; i--) {
            let zombie = zombies[i];
            let d = dist(mouseX, mouseY, zombie.x, zombie.y);
            let coneLength = 6 * 37.7952;
            let coneWidth = 3 * 37.7952; 

            if (d < coneLength) {
                zombie.health -= 50;
                if (zombie.health <= 0) {
                    zombies.splice(i, 1);
                    killedZombiesCount++;
                    if (killedZombiesCount % 10 === 0) {
                        zombiesToSpawn++;
                    }
                    horde.addZombies(1);
                }
            }
        }
    };
}