const canvas = document.querySelector(".game__canvas");
const ctx = canvas.getContext("2d");

const bird = {
    x: canvas.width / 2,
    y: 300,

    head : {
        width: 8,
        height: 8,
        angle: 0,
    },
    body : {
        width: 20,
        height: 20,
        angle: 0,
        sprites: ["/sprites/body", "/sprites/body_fly"],
    },
    mode: {
        
    }
}

