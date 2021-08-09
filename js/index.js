// Game constants and Variables

let inputDir = {x:0, y:0};
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const gameMusic = new Audio('./music/music.mp3');

let snakeArr=[
    {x:10, y:12}
];

let food = {x:6,y:7};
let speed = 4;
let lastPaintTime = 0;
let score = 0;




// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    
    // We reduce the no of frames here to save some computations.  Here we compute after every 0.5 seconds
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
  //  console.log(ctime);
    gameEngine(); 
}

function isCOllision(snakeArr){
    
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y)
            return true;   
    }

    // If you bump into the wall
    if( snakeArr[0].x <= 0 ||  snakeArr[0].x > 17 || snakeArr[0].y <= 0 ||  snakeArr[0].y > 17 ){
        return true;
    }  
   
}

// Funtion to generate Food
function generateFood(a,b){
    food = {x : Math.round(a+(b-a)*Math.random()), y : Math.round((a+(b-a)*Math.random()))};

    // The below logic is defined so that the food is not generated on the snake's body
    for (let i = 1; i < snakeArr.length; i++) {
        if(food.x === snakeArr[i].x && food.y === snakeArr[i].y){
          //  console.log("Food Generated Inside Body"); 
            generateFood(a,b);
        }
    }
}

function gameEngine(){

    // Part:1 Updating the Snake Array and Food

    if(isCOllision(snakeArr)){
        gameOverSound.play();
        gameMusic.pause();
        alert("Game Over, Press any arrow key to play again");
        snakeArr = [
            {x:10, y:12}
        ];
        inputDir = {x:0,y:0};
        gameMusic.play();
        score = 0;
    }

    // If you have eaten the food, regenerate the food and increment the score

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;

        // Updating the High Score
        // if(score>hiscoreval){
        //     hiscoreval = score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        // }

        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a = 2;
        let b = 16; 
        generateFood(a,b);
    }


    // Moving the snake

    for (let i = snakeArr.length-1; i > 0; i--){
        snakeArr[i] = {...snakeArr[i-1]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part:2 Display the snake and the food

    // Display the Snake
    document.querySelector("#board").innerHTML = "";

    document.querySelector("#scoreBox").innerHTML= "Score: " + score;

    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index != 0){
            snakeElement.classList.add('snakeBody');
        }
        snakeElement.classList.add('snakeHead');
        document.querySelector("#board").appendChild(snakeElement);
    })

    // Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    document.querySelector("#board").appendChild(foodElement);
}


// Hi-Score Functionality through storing data into local storage of device.


// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// }
// else if(hiscore != null ){
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = hiscore;
// }


// Main Logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:0};  // Start the Game with snake moving in this specified direction {0,0} means nowhere hence arrow button decides the direction initially
    moveSound.play();
    gameMusic.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
            
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break; 

        default:
            break;
    }
})