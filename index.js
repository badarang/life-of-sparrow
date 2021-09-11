const canvas = document.querySelector(".game__canvas");
const ctx = canvas.getContext("2d");
//ctx.fillStyle = "red";
//ctx.fillRect(10,10,50,50);

const bird = {
    x: canvas.width / 2,
    y: canvas.height / 2,
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

const birdDraw = () => {
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
    birdDraw();
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

