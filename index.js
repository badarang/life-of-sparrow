const canvas = document.querySelector(".game__canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 810;
const canvasHeight = 500;

const bird = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    velocity_x: 0,
    velocity_y: 0,
    friction: 0.9,
    gravity: 0.9,
    curBodySprite: "./sprites/body.png",
    head : {
        width: 8,
        height: 8,
        angle: 0,
        sprite: "./sprites/head.png",
    },
    body : {
        width: 20,
        height: 20,
        angle: 0,
        sprites: ["./sprites/body.png", "./sprites/body_fly.png"],
    },
    mode: {
        idle: false,
        molting: false,
        eating: false,
        flying: false,
        walk: false,
    }
}
const modeSize = Object.keys(bird.mode).length;
let curModeNum = null;

const platforms = [];
platformNum = 5;

const foods = [];
const colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
];
maxFoodNum = 15;
curFoodNum = 0;

const createPlatform = () => {
    // 맨 밑 플랫폼
    platforms.push({
        x: 0,
        y: canvasHeight - 10,
        width: canvasWidth,
        height: canvasHeight / 50,
    });
    // 공중 플랫폼
    directions = [[1,1], [-1,1], [-1,-1], [1,-1]];
    for (var i=0; i<platformNum - 1; i++) {
        platforms.push(
            {
                width: canvasWidth / 6,
                height: canvasHeight / 50,
                x: canvasWidth / 2 + (canvasWidth / 4 * directions[i][0]) - canvasWidth / 12,
                y: canvasHeight / 2 + (canvasHeight / 4 * directions[i][1]) - canvasWidth / 50,
                
            }
        );
    }
}

const createFood = () => {
    let randomIndex = Math.floor(colorArray.length * Math.random());
    let platformIndex = Math.floor(Math.random() * platformNum);
    if (curFoodNum < maxFoodNum) {
        let platform = platforms[platformIndex];
        foods.push({
            x: platform.x + platform.width * Math.random(),
            y: platform.y - 10,
            width: 5,
            height: 7,
            colorIndex: randomIndex,
        })
        curFoodNum++;
    }
}

const drawCanvas = () => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

const drawPlatform = () => {
    ctx.fillStyle = "#000000";
    for (var i=0; i<platformNum; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

const drawFood = () => {
    for (var i=0; i<curFoodNum; i++) {
        ctx.fillStyle = colorArray[foods[i].colorIndex];
        ctx.fillRect(foods[i].x, foods[i].y, foods[i].width, foods[i].height);
    }
}

const drawBird = () => {
    const imageScale = 1;
    //Body Draw
    const imgBody = new Image();
    imgBody.src = bird.curBodySprite;
    imgBody.onload = () => {
        ctx.drawImage(imgBody, bird.x, bird.y, bird.body.width * imageScale, bird.body.height * imageScale);
    }
    //Head Draw
    const imgHead = new Image();
    imgHead.src = bird.head.sprite;
    imgHead.onload = () => {
        ctx.drawImage(imgHead, bird.x + 12 * imageScale, bird.y + 3 * imageScale, bird.head.width * imageScale, bird.head.height * imageScale);
    }
}

const resetMode = () => {
    Object.keys(bird.mode).forEach((v) => {
        bird.mode[v] = false; //배열로 접근해야 해당 값의 주소로 접근하기 때문에 값이 바뀜
    })
}

const changeSpriteFlying = () => {
    if (bird.mode.flying) {
        if (bird.curBodySprite == bird.body.sprites[0]) { 
            bird.curBodySprite = bird.body.sprites[1];
        }
        else {
            bird.curBodySprite = bird.body.sprites[0];
        }
    }
}

const main = () => {
    //drawCanvas();
    drawPlatform();
    drawFood();
    drawBird();
    requestAnimationFrame(main);
}

const changeMode = () => {
    let min = 7, max = 15;
    let rand = Math.floor(Math.random() * (max - min + 1) + min); 
    resetMode();
    
    let nextModeNum = Math.floor(Math.random() * modeSize);

    switch(nextModeNum) {
        case 0: {
            bird.mode.idle = true;
        } break;
        case 1: {
            bird.mode.molting = true;
        } break;
        case 2: {
            bird.mode.eating = true;
        } break;
        case 3: {
            bird.mode.flying = true;
        } break;
        case 4: {
            bird.mode.walk = true;
        } break;
        default: break;
    }

    createFood();
    setTimeout(changeMode, rand * 1000);
  }
  

window.onload = () => {
    createPlatform();
    main();
    changeMode();
}

const showMode = () => {
    Object.keys(bird.mode).forEach((v) => {
        console.log(v, bird.mode[v]);
    })
}

