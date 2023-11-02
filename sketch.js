/*
Hack it: Zombie Attack

The program creates a horde of zombies that cross the canvas. Read the code
and make the following enhancements

1. Split the code up into muliple files one for each constructor
2. Give each zombie a health property
3. Add a shovel! When the zombie is clicked on the head their health decreases
	* Add a 'clicked' method to the zombie to check if x and y coordinates, taken as arguments
	 are over the zombies head (you can use the dist function) and decrease health
	* In the horde constructor create a new method to check each zombies clicked method
	* also remove from the array any zombies whoes health is below 0.
	* call the method in horde from mousePressed();
4. When a zombie is killed make sure a new zombie is added to the horde.
5. Extension: Make it a game where the idea is to keep the zombies from the right of the screen
for as long as possible.
*/

//variable to store the zombie horde
var horde;
var shovel;
var shotgun;
var currentWeapon;
var weapons = {};

function setup() {
    createCanvas(800, 600);

    // create a new horde and add zombies
    horde = new Horde();
    horde.addZombies(7);
    shovel = new Shovel();
    shotgun = new Shotgun();

    weapons.shovel = shovel;
    weapons.shotgun = shotgun;

    currentWeapon = shovel;
}

function draw() {
    background(77, 112, 107);
    horde.drawZombies();
    currentWeapon.draw();

    fill(255);
    rect(10, 50, 50, 50);
    rect(10, 120, 50, 50);

    if (currentWeapon === shovel) {
        fill(0, 255, 0);
        rect(10, 50, 50, 50);
    } else if (currentWeapon === shotgun) {
        fill(0, 255, 0);
        rect(10, 120, 50, 50);
    }
}

function mousePressed() {
    if (mouseX > 10 && mouseX < 60 && mouseY > 50 && mouseY < 100) {
        currentWeapon = shovel;
    } else if (mouseX > 10 && mouseX < 60 && mouseY > 120 && mouseY < 170) {
        currentWeapon = shotgun;
    } else {
        if (currentWeapon === shovel) {
            shovel.hitZombies(horde.zombies);
        } else if (currentWeapon === shotgun) {
            shotgun.fire(horde.zombies);
        }
    }
}




