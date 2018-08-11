var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var raf;


canvas.width = window.innerWidth;

var Star = function(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;

    this.dy = dy;
    this.dx = dx;

    this.radius = radius * (dy/2);
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
        this.x += this.dx;

        if (this.y > canvas.height || this.x > canvas.width){
            this.x = Math.random() * canvas.width;
            this.y = (Math.random() * -500) - 50;
            this.radius = Math.random() * 5 + 1;
        }
        
    }
}

var stars = [];
for (let i = 0; i < 500; i++)
    stars.push(new Star(/* X */ Math.random() * canvas.width,
                        /* Y */ (Math.random() * -500) - 50,
                        /* DX */ 0,
                        /* DY */ Math.random() * 0.5 + 1,
                        /* RADIUS */ (Math.random() * 5) + 1));

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