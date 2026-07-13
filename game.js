const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let snake;
let food;
let dx;
let dy;
let score;
let name="玩家";

let size=20;

function startGame(){

name=document.getElementById("name").value || "匿名玩家";

snake=[
{x:200,y:200}
];

food=randomFood();

dx=size;
dy=0;

score=0;

gameLoop();

}


function randomFood(){

return{
x:Math.floor(Math.random()*20)*size,
y:Math.floor(Math.random()*20)*size
};

}


document.addEventListener("keydown",e=>{

if(e.key==="ArrowUp" && dy===0){
dx=0;dy=-size;
}

if(e.key==="ArrowDown" && dy===0){
dx=0;dy=size;
}

if(e.key==="ArrowLeft" && dx===0){
dx=-size;dy=0;
}

if(e.key==="ArrowRight" && dx===0){
dx=size;dy=0;
}

});



function gameLoop(){

setTimeout(()=>{

update();
draw();

if(snake){
gameLoop();
}

},100);

}



function update(){

let head={
x:snake[0].x+dx,
y:snake[0].y+dy
};


if(
head.x<0||
head.y<0||
head.x>=400||
head.y>=400||
snake.some(p=>p.x===head.x&&p.y===head.y)
){

saveScore();
snake=null;
alert("游戏结束 分数:"+score);
return;

}


snake.unshift(head);


if(head.x===food.x&&head.y===food.y){

score++;
food=randomFood();

}else{

snake.pop();

}

}



function draw(){

ctx.clearRect(0,0,400,400);


ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,size,size);


ctx.fillStyle="lime";

snake.forEach(p=>{
ctx.fillRect(p.x,p.y,size,size);
});


ctx.fillStyle="white";
ctx.fillText(
"分数:"+score,
10,
20
);

}



function saveScore(){

let ranks=
JSON.parse(localStorage.getItem("rank"))||[];

ranks.push({
name:name,
score:score
});


ranks.sort((a,b)=>b.score-a.score);

ranks=ranks.slice(0,10);

localStorage.setItem(
"rank",
JSON.stringify(ranks)
);


showRank();

}



function showRank(){

let list=document.getElementById("rank");

list.innerHTML="";


let ranks=
JSON.parse(localStorage.getItem("rank"))||[];


ranks.forEach(r=>{

let li=document.createElement("li");

li.innerHTML=
r.name+" - "+r.score;

list.appendChild(li);

});

}


showRank();