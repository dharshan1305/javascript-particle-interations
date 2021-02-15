const canvas = document.getElementById('canvas0');
//create built in canvas object that contains 2d methods
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray =[];

//mouse interactions
const mouse = {
    x: null,
    y: null,
    radius: 150
}

//event listener

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y);
});

context.fillStyle = "white";
context.font = "30px Verdana";
context.fillText("S", 0, 40);

//scan canvas and analyze pixels, filter pixels to find text
//saving x and y coordinates
//getImageData stores x, y and color to a data array
//4 parameters x and y val (where to start) and the area we scan(100x100)

const data = context.getImageData(0, 0, 100, 100);

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        context.fillStyle = "blue";
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
//calculate distance from mouse to particle

update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y ;
    let distance = Math.hypot(dx, dy);
    if (distance < 100){
        this.size = 30;
    }else {
        this.size=3;
    }
}
}

function init(){
    particleArray = [];
    for (let i = 0; i < 10 ; i++){
        let x = Math.random()* 500;
        let y = Math.random()* 500;
        particleArray.push(new Particle(x, y));
    }

}
init();
console.log(particleArray);

//handle animation loop
function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();


















