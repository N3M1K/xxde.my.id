const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const START_X = 50;
const START_Y = canvas.height - 150;

const player = {
    x: START_X,
    y: START_Y,
    width: 80,
    height: 80,
    dx: 0,
    dy: 0,
    gravity: 0.8,
    jumpPower: -15,
    isJumping: false,
    image: new Image(),
    state: 'idle',
    frames: {
        idle: 'assets/game/player/adv_idle.gif',
        run: 'assets/game/player/adv_run.gif',
        jump: 'assets/game/player/adv_jump.gif'
    }
};

player.image.src = player.frames[player.state];

const platforms = [
    { x: 50, y: canvas.height - 100, width: 80, height: 10, text: null },
    { x: 300, y: canvas.height - 200, width: 80, height: 10, text: null },
    { x: 200, y: canvas.height - 300, width: 80, height: 10, text: null },
    { x: 20, y: canvas.height - 400, width: 80, height: 10, text: null },
    { x: 250, y: canvas.height - 500, width: 80, height: 10, text: null },
    { x: 400, y: canvas.height - 600, width: 80, height: 10, text: null },
    { x: 200, y: canvas.height - 700, width: 80, height: 10, text: 'Services', tag: '#service-modal' },
    { x: 1100 + 450, y: canvas.height - 100, width: 80, height: 10, text: null },
    { x: 1100 + 250, y: canvas.height - 200, width: 80, height: 10, text: null },
    { x: 1100 + 350, y: canvas.height - 300, width: 80, height: 10, text: null },
    { x: 1100 + 150, y: canvas.height - 400, width: 80, height: 10, text: null },
    { x: 1100 + 300, y: canvas.height - 500, width: 80, height: 10, text: null },
    { x: 1100 + 175, y: canvas.height - 600, width: 80, height: 10, text: null },
    { x: 1100 + 400, y: canvas.height - 700, width: 80, height: 10, text: 'Contact', tag: '#contact-modal' },
    { x: 550, y: canvas.height - 650, width: 80, height: 10, text: null },
    { x: 700, y: canvas.height - 750, width: 80, height: 10, text: null },
    { x: 600, y: canvas.height - 850, width: 80, height: 10, text: 'Projects', tag: '#projects-modal' }
];

const ground = {
    x: 0,
    y: canvas.height - 10,
    width: canvas.width,
    height: 20,
    image: new Image()
};

ground.image.src = 'assets/game/env/ground.png';

function drawPlayer() {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    if (player.dx < 0) {
        ctx.scale(-1, 1);
    }
    ctx.drawImage(player.image, -player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();
}

function respawn() {
        player.x = START_X;
        player.y = START_Y;
        player.dx = 0;
        player.dy = 0;
        player.isJumping = false;
        player.state = 'idle';
        player.image.src = player.frames[player.state];
}

function drawPlatforms() {
    const tile_00 = new Image();
    tile_00.src = 'assets/game/env/tile_00.png';

    const tile_01 = new Image();
    tile_01.src = 'assets/game/env/tile_01.png';

    platforms.forEach((platform, index) => {
        const tile = index % 2 === 0 ? tile_00 : tile_01;
        ctx.drawImage(tile, platform.x, platform.y, platform.width, platform.height);

        if (platform.text) {
            ctx.font = '20px PixelifySans';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(platform.text, platform.x + platform.width / 2, platform.y - 10);
        }
    });
}

function drawGround() {
    ctx.drawImage(ground.image, ground.x, ground.y, ground.width, ground.height);
}

function update() {
    player.dy += player.gravity;

    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    let onPlatform = false;
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height - player.dy <= platform.y
        ) {
            onPlatform = true;
            player.dy = 0;
            player.y = platform.y - player.height;
            player.isJumping = false;

            if (platform.text && player.dy === 0 && player.isJumping === false && player.y + player.height === platform.y) {
                let m_id = document.querySelector(platform.tag)
                let game = document.querySelector("#gameContainer")
                openDialog(m_id);
                game.classList.add("blur");
                m_id.scrollTop = 0;
                respawn();
            }
        }
    });

    if (player.y + player.height > ground.y && player.dy > 0) {
        onPlatform = true;
        player.dy = 0;
        player.y = ground.y - player.height;
        player.isJumping = false;
    }

    if (!onPlatform) {
        player.isJumping = true;
    }

    if (player.isJumping) {
        player.state = 'jump';
    } else if (player.dx !== 0) {
        player.state = 'run';
    } else {
        player.state = 'idle';
    }

    player.image.src = player.frames[player.state];
}

document.addEventListener('keydown', e => {
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        player.dx = -5;
    } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        player.dx = 5;
    } else if ((e.code === 'Space' || e.code === 'KeyW') && !player.isJumping) {
        player.dy = player.jumpPower;
        player.isJumping = true;
    }
});

document.addEventListener('keyup', e => {
    if ((e.code === 'KeyA' || e.code === 'ArrowLeft') && player.dx < 0) {
        player.dx = 0;
    } else if ((e.code === 'KeyD' || e.code === 'ArrowRight') && player.dx > 0) {
        player.dx = 0;
    }
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawPlatforms();
    update();
    drawPlayer();
    requestAnimationFrame(loop);
}

loop();
