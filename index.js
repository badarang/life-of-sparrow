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

const birdDraw = () => {
    const imageScale = 4;
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

setInterval(changeSpriteFlying, 60);
setInterval(birdDraw, 30);