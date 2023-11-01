function Shotgun() {
    this.draw = function() {
        push();
        translate(mouseX, mouseY);
        let angle = atan2(mouseY - height / 2, mouseX - width / 2);
        rotate(angle);
        fill(100);
        rect(-10, -30, 20, 100);
        fill(150);
        ellipse(0, -30, 30, 10);
        pop();
    }

    this.fire = function(zombies) {
        for (let i = zombies.length - 1; i >= 0; i--) {
            let zombie = zombies[i];
            let d = dist(mouseX, mouseY, zombie.x, zombie.y);

            let coneLength = 4 * 37.7952; // 4 cm to pixels
            let coneWidth = 3 * 37.7952; // 3 cm to pixels

            if (d < coneLength) {
                let angle = atan2(zombie.y - mouseY, zombie.x - mouseX) - atan2(mouseY - height / 2, mouseX - width / 2);
                if (abs(angle) < PI / 6) {
                    zombie.health -= 50;
                    if (zombie.health <= 0) {
                        zombies.splice(i, 1);
                        horde.addZombies(1);
                    }
                }
            }
        }
    }
}