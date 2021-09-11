const canvas = document.querySelector(".game__canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 810;
const canvasHeight = 500;

const bird = {
    x: canvas.width / 2,
    y: canvas.height - 20,
    velocity_x: 0,
    velocity_y: 0,
    friction: 0.9,
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

const platforms = [];
platformNum = 4;

const createPlatform = () => {
    // 맨 밑 플랫폼
    platforms.push({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight / 20,
    });
    // 공중 플랫폼
    directions = [[1,1], [-1,1], [-1,-1], [1,-1]];
    for (var i=0; i<platformNum; i++) {
        platforms.push(
            {
                x: canvasWidth / 2 + canvasWidth / 4 * directions[i][0],
                y: canvasHeight / 2 + canvasHeight / 4 * directions[i][1],
                width: canvasWidth / 6,
                height: canvasHeight / 10,
            }
        );
    }
}

const drawCanvas = () => {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

const modeSize = Object.keys(bird.mode).length;
let curModeNum = null;

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
    drawBird();
    requestAnimationFrame(main);
}

const changeMode = () => {
    let min = 5, max = 15;
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

    setTimeout(changeMode, rand * 1000);
  }
  

window.onload = () => {
    main();
    changeMode();
}

const showMode = () => {
    Object.keys(bird.mode).forEach((v) => {
        console.log(v, bird.mode[v]);
    })
}

