//shovel constructor
function Shovel() {
	this.draw = function() {
		fill(150);
		rect(mouseX - 5, mouseY - 30, 10, 80);
        fill(200);
        beginShape();
        vertex(mouseX - 15, mouseY - 30);
        vertex(mouseX + 15, mouseY - 30);
        vertex(mouseX + 20, mouseY - 50);
        vertex(mouseX - 20, mouseY - 50);
        endShape(CLOSE);
	}

	this.hitZombies = function(zombies) {
		for (var i = zombies.length - 1; i >= 0; i--) {
			if (zombies[i].isHit(mouseX, mouseY)) {
				zombies[i].health -= 10;
				if (zombies[i].health <= 0) {
					zombies.splice(i, 1);
					horde.addZombies(1); // Add a new zombie when one is killed
				}
				break;
			}
		}
	}
}