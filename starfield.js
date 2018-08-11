var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var raf;

canvas.width = window.innerWidth;

var Star = function(x, y, dy, dx, radius){
    this.x = x;
    this.y = y;
    // this.z = Math.random() * canvas.width;

    this.dy = dy;
    this.dx = dy;
    
    this.radius = radius;
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
        if(this.y > canvas.height){
            this.y = (Math.random() * -100) - 100;
        }
        // this.x += this.dx;
    }
}

var stars = [];
for (let i = 0; i < 100; i++)
    stars.push(new Star(Math.random() * canvas.width,
                        (Math.random() * -100) - 200,
                        Math.random() * 5,
                        Math.random() * 1,
                        (Math.random() * 10) + 3));

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