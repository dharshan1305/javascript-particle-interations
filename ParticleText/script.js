const canvas = document.getElementById('canvas0');
//create built in canvas object that contains 2d methods
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray =[];
let adjustX = 10;
let adjustY = 10;
context.lineWidth = 3;

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
context.font = "25px Verdana";
context.fillText("AIZEN", 0, 30);

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
        this.density = (Math.random() * 8) + 2;
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
    let moveDX = dx / distance;
    let moveDY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = moveDX * force * this.density;
    let directionY = moveDY * force * this.density;
    if (distance < mouse.radius){
        this.x -= directionX;
        this.y -= directionY;

    }else {
        if (this.x !== this.baseX){
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
        }
        if (this.y !== this.baseY){
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
        }

    }
}
}

function init(){
    particleArray = [];
    for (let y = 0, y2 = data.height; y < y2; y++){
        for (x = 0, x2 = data.width; x < x2; x++){
            if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128){
                let posX = x + adjustX;
                let posY = y + adjustY;
                particleArray.push(new Particle(posX * 10, posY * 10));
            }
        }
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
    connect();
    requestAnimationFrame(animate);
}

animate();

function connect(){
    let opacityVal = 1;
    for (let a = 0; a < particleArray.length;a++){
        for(let b = a; b < particleArray.length;b++){
            //let dx = mouse.x - this.x;
            //let dy = mouse.y - this.y ;
            //let distance = Math.hypot(dx, dy);
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.hypot(dx, dy);
            opacityVal = 1 - (distance/50);
                 context.strokeStyle='rgba(255, 255,255,'+            opacityVal +')';

            if (distance < 50){
                context.lineWidth=2;
                context.beginPath();
                context.moveTo(particleArray[a].x, particleArray[a].y);
                context.lineTo(particleArray[b].x, particleArray[b].y);
                context.stroke();
            }
        }
    }
}

















