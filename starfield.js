var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var raf;

canvas.width = window.innerWidth;

var Star = function(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    // this.z = Math.random() * canvas.width;

    this.dy = dy;
    this.dx = dy;
    
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
            this.y = (Math.random() * -100) - 100;
        }
        
    }
}

var stars = [];
for (let i = 0; i < 1000; i++)
    stars.push(new Star(/* X */ Math.random() * (canvas.width * (3/2)) - (canvas.width/3),
                        /* Y */ (Math.random() * -300) - 100,
                        /* DX */ 1,
                        /* DY */ Math.random() * 1 + 1,
                        /* RADIUS */ (Math.random() * 3) + 1));

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