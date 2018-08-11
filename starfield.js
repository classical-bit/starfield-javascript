var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var raf;

canvas.width = window.innerWidth;

var Star = function(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;

    this.dy = Math.random() * 5;
    this.dx = Math.random() * 1;
    
    this.radius = (Math.random() * 10) +3;
    this.color = '#EEE222';

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.fillStyle= this.color;
        context.fill();
    }
    this.update = function(){
        this.y += this.dy;
        // this.x += this.dx;
    }
}

var stars = [];
for (let i = 0; i < 100; i++)
    stars.push(new Star());

var starfield = function(){

    context.clearRect(0, 0, canvas.width, canvas.height);
    for(const s of stars){
        s.update();
        s.draw()
    }

    raf = window.requestAnimationFrame(starfield);
}

var animate = function(){
    starfield();
}

animate();
var isRunning = true;

canvas.addEventListener('click', function(){
    if(isRunning){
        cancelAnimationFrame(raf);
        isRunning = false;
    }else{
        animate();
        isRunning = true;
    }
});