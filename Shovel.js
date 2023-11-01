//shovel constructor
function Shovel() {
	this.draw = function() {
		fill(150);
		rect(mouseX - 10, mouseY - 30, 20, 60);
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