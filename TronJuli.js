let player1 = null;
let player2 = null;
let view = "menu";
let s = 5;
let die = false;
let backgroundOnce = true;
let players = new Array();
let trail = null;
let trail1 = new Array();
let trail2 = new Array();
let posX = null;
let posY = null;
let time = 0;
let timerOnce = true;
let timer_loop = null;
let colour_player = "0, 0, 0";
let winner = null;
let colour_Text = null;
let options_menu = "colour";
let colour_select_person = "player1";
let farben = new Array();
let c1 = null;
let c2 = null;
let colour_number_global = null;
let get_time1 = null;
let get_time2 = null;
let player1colour_Text_reset = "BLAU";
let player2colour_Text_reset = "ROT";
let clickOption_change = false;
let cur_activ = true;
let all_powerups = new Set();
let draw_powerup_once = true;
let powerup_timer = 10000;
let draw_powerup_all = true;
let array_powerup = new Array();
let array_powerup_fill = new Array()
let array_name_colour = new Array()
let boarder_xRight = 1000;
let boarder_xLeft = 0;
let boarder_yUp = 0;
let boarder_yDown = 1000;
let line_stop_low = 0;
let line_stop_high = 1000;
let ms = 100;
let trigger_clear = null;
let spieler1_noColission = false;
let spieler2_noColission = false;
let slider_pos_player = 450;
let slider_pos_powerup = 450;
let release_slider_player = true;
let release_slider_powerup = true;
let slider_player_lock = false;
let slider_powerup_lock = false;
let colour_fav_p1X = 200;
let colour_fav_p1Y = 800;
let colour_fav_p2X = 200;
let colour_fav_p2Y = 400;
let normal_s = 5;
let colission_bool = false;
let collision_exc = 0;


class spieler {
    constructor(name, posX, posY, direction, trail, colour_Text) {

        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        this.alive = true;
        this.s = s;
        this.die = die; 
        this.trail = trail;
        this.colour_Text = colour_Text;
        this.trail.push(posX, posY);
        this.trail.push(posX, posY - 5);
    }

    figurBewegung() {
        if (this.direction == "up") {
            this.posY -= this.s;
        }
        if (this.direction == "down") {
            this.posY += this.s;
        }    
        if (this.direction == "left") {
            this.posX -= this.s;
        }    
        if (this.direction == "right") {
            this.posX += this.s;
        }  
    }

    dieCheck() {
        if (this.posX < boarder_xLeft + 5 || this.posX > boarder_xRight - 5 || this.posY < boarder_yUp + 5|| this.posY > boarder_yDown - 5) {

            if (this.name == "Spieler 1") {
                if (spieler1_noColission == false) {
                    winner = player2.colour_Text;
                    this.diefu();
                }
            }
            else if (spieler2_noColission == false) {
                winner = player1.colour_Text;
                this.diefu();
            }
        }
        for(var j = 0; j < players.length; j++) { 
            for(var i = 0; i < players[j].trail.length - (collision_exc * 2); i++) {
                let dist = euclideanDistance(players[j].trail[i].posX, players[j].trail[i].posY, this.posX, this.posY);
                if (dist < 5 ) {
                    if (this.name == "Spieler 1" ) {
                        if (spieler1_noColission == false) {
                            winner = player2.colour_Text;
                            this.diefu();
                        }
                    }
                    else if (spieler2_noColission == false) {
                        winner = player1.colour_Text;
                        this.diefu();
                    }
                }
            }
        }
    }

    diefu() {
        this.s = 0;
        this.die = true;
        this.x = 1100;
    }

    drawPlayer() {
        this.trail.push(new koordianten(this.posX, this.posY));

        this.figurBewegung()
        if (this.name == "Spieler 1") {
            fill(color(c1));
        }
        else {
            fill(color(c2));
        }

        noStroke()

        for(i = 0; i < this.trail.length; i++) {
            circle(this.trail[i].posX, this.trail[i].posY,10);
        }
    }

    checkColissionPowerup() {
        for(i = 0; i < array_powerup.length; i++) {
            let dist = euclideanDistance(array_powerup[i].posX, array_powerup[i].posY, this.posX, this.posY)
            if (dist < 12.5) {
                fill(0)
                noStroke()
                circle(array_powerup[i].posX, array_powerup[i].posY, 25)
                //console.log("array: ", array_name_colour)
                //console.log("i:", i)
                console.log("Farbe i:", array_name_colour[i])
                if (array_name_colour[i] == "gelb") {
                    powerupSpeed();
                }
                else if (array_name_colour[i] == "rot") {
                    ms = 100;
                    powerupBoarder();
                }
                else {
                    trigger_clear = this.name;
                    powerupClear();
                }
                array_powerup_fill.splice(i, 1);
                array_powerup.splice(i, 1);
                array_name_colour.splice(i, 1);
                gitter();
            }
        } 
    }
}


class option_box {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4, name, text) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;
        this.name = name;
        this.text = text;

    }

    drawBox() {
        fill(0, 0, 0);

        if (this.name == options_menu) {
            stroke(255, 255, 255);
        }
        else {
            stroke('rgba(255,255,255,0.5)');
        }

        quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
        textSize(50)
        text(this.text, this.x1 + (325 / 2), 100);
    }

}

class powerUps {
    constructor(name, activ, optionX, optionY, optionText) {
        this.name = name;
        this.activ = activ;
        this.optionX = optionX;
        this.optionY = optionY;
        this.optionText = optionText;
    }

    drawOption() {
        if (this.activ == true) {
            stroke(0, 255, 0);
        }
        else {
            stroke(255, 0, 0);
        }
        fill(0);
        rect(this.optionX, this.optionY, 400, 100);
        fill(255);
        text(this.optionText, this.optionX, this.optionY + 20);
        stroke(255, 0, 0)
    }

    clickOption() {
        if (mouseX > this.optionX - 200 && mouseX < this.optionX + 200 && mouseY > this.optionY - 50 && mouseY < this.optionY + 50) {
            if (mouseIsPressed) {
                if (cur_activ == true) {
                    this.activ = !this.activ;
                    cur_activ = false;
                }
            }
        }
    }

    draw() {
        if (this.name == "speed") {
            array_powerup_fill.push(color(255, 255, 0));
            array_name_colour.push("gelb");
        }
        else if (this.name == "clear") {
            array_powerup_fill.push(color(150, 150, 150));
            array_name_colour.push("grau")
        }
        else {
            array_powerup_fill.push(color(255, 0, 0));
            array_name_colour.push("rot")
        }

        let random_x = random(10, 990);
        let random_y = random(10, 990);

        array_powerup.push(new koordianten(random_x, random_y));

        for (i = 0; i < array_powerup.length - 1; i++) {
            fill(array_powerup_fill[i])
            circle(array_powerup[i].posX, array_powerup[i].posY, 25);
        }
    }

    checkSet() {
        if (this.activ == true) {
            all_powerups.add(this.name)
        }
        else {
            all_powerups.delete(this.name)
        }
    }

}

///////////////////////////////////////////////////////////////////////////////////////
function mouseReleased() {
    cur_activ = true;
    release_slider_player = true;
    release_slider_powerup = true;
    slider_player_lock = false;
    slider_powerup_lock = false;
}



function setup() {
    createCanvas(1000, 1000);
    background(0);
    rectMode(CENTER);
    textFont('Bold');
    frameRate(10000000000000000000);
    player1 = new spieler("Spieler 1", 800, 700, "up", trail1, "BLAU");
    player2 = new spieler("Spieler 2", 200, 700, "up", trail2, "ROT");
    players.push(player1);
    players.push(player2);

    colour_box = new option_box(50, 120, 75, 45, 375, 45, 350, 120, "colour", "COLOUR");
    game_box = new option_box(350, 120, 375, 45, 675, 45, 650, 120, "game", "GAME");
    extras_box = new option_box(650, 120, 675, 45, 975, 45, 950, 120, "extras", "EXTRAS");

    speed_powerup = new powerUps("speed", false, 300, 250, "SPEED POWERUP");
    clear_powerup = new powerUps("clear", false, 300, 450, "CLEAR POWERUP");
    boarder_powerup = new powerUps("boarder", false, 300, 650, "BOARDER POWERUP");
    
    farben.push(color(255, 0, 0), color(255, 165, 0), color(252, 236, 64), color(255, 255, 0), color(124, 252, 0), color(0, 205, 0), color(64, 224, 208), color(0, 255, 255), color(0, 0, 255), color(127, 0, 255), color(180, 82, 205), color(255, 0, 255));

    c1 = farben[8];
    c2 = farben[0];

    loop_halfsecond();

}

function draw() {
    clickOption_change = false;
    if (view == "menu") {
        menu();
    }
    if (view == "singleplayer") {
        singleplayer();
    }
    if (view == "multiplayer") {
        multiplayer();
    }
    if (view == "options") {
        options();
    }
}


function loop_halfsecond() {
    //console.log("mouseX: ", mouseX, "mouseY: ", mouseY);
    setTimeout(loop_halfsecond, 500);
}

function euclideanDistance(x1, y1, x2, y2) {
    return Math.pow(Math.pow (x1 - x2, 2) + Math.pow(y1 - y2 , 2) , 0.5);
}

function gitter() {
    stroke(100);
    strokeWeight(1);
    for(i = 0; i < 20; i++) {
        line(i*50,0,i*50,1000);
    }
        
    for(i = 0; i < 20; i++) {
        line(0,i*50,1000,i*50);
    }
        
        noStroke();
    }

function keyboardInput() {
    if (keyIsDown(UP_ARROW) && player1.direction != "up") {
        player1.direction = "up";
    }
    if (keyIsDown(DOWN_ARROW) && player1.direction != "down") {
        player1.direction = "down";
    }
    if (keyIsDown(LEFT_ARROW) && player1.direction != "left") {
        player1.direction = "left";
    }
    if (keyIsDown(RIGHT_ARROW) && player1.direction != "right") {
        player1.direction = "right";
    }

    if (keyIsDown(87) && player2.direction != "up") {
        player2.direction = "up";
    }
    if (keyIsDown(83) && player2.direction != "down") {
        player2.direction = "down";
    }
    if (keyIsDown(65) && player2.direction != "left") {
        player2.direction = "left"
    }
    if (keyIsDown(68) && player2.direction != "right") {
        player2.direction = "right";
    }
}

function koordianten(posX,posY) {
    this.posX = posX;
    this.posY = posY;
}

function timer(){
    if (view == "singleplayer" && !player1.die) {
        time++;
    }
    timer_loop = setTimeout(timer, 1000);
}

function reset() {
    player1 = null;
    player2 = null;
    die = false;
    backgroundOnce = true;
    players = new Array();
    trail = null;
    trail1 = new Array();
    trail2 = new Array();
    posX = null;
    posY = null;
    time = 0;
    timerOnce = true;
    clearTimeout(timer_loop);
    colission_bool = false;

    player1 = new spieler("Spieler 1", 800, 700, "up", trail1, player1colour_Text_reset);
    player2 = new spieler("Spieler 2", 200, 700, "up", trail2, player2colour_Text_reset);
    players.push(player1);
    players.push(player2);

    draw_powerup_once = true;
    array_powerup = new Array();
    array_powerup_fill = new Array();
    array_name_colour = new Array();

    boarder_xRight = 1000;
    boarder_xLeft = 0;
    boarder_yUp = 0;
    boarder_yDown = 1000;
    line_stop_low = 0;
    line_stop_high = 1000;

}

function game_Background() {
    if (backgroundOnce) {
        background(0);
        gitter();
        backgroundOnce = false;
    }
}

function game_Timer() {
    if (timerOnce) {
        setTimeout(timer, 1000);
        timerOnce = false; 
    }
}

function getColour (p) {
    if (p.name == "Spieler 2") {
        fill(c2);
    }
    else {
        fill(c1);
    }
}

function boxCheck() {

    for (let i = 120, j = 50, k = 350; i >= 45 && j <= k && j < 375; i--, j += 1/3, k += 1/3) {
        if (mouseX < k && mouseX > j) {
            if (round(mouseY) == i) {
                if (mouseIsPressed) {
                    options_menu = "colour";
                }
            }
        }
    }

    for (let i = 120, j = 350, k = 650; i >= 45 && j <= k && j < 675; i--, j += 1/3, k += 1/3) {
        if (mouseX < k && mouseX > j) {
            if (round(mouseY) == i) {
                if (mouseIsPressed) {
                    options_menu = "game";
                }
            }
        }
    }

    for (let i = 120, j = 650, k = 950; i >= 45 && j <= k && j < 975; i--, j += 1/3, k += 1/3) {
        if (mouseX < k && mouseX > j) {
            if (round(mouseY) == i) {
                if (mouseIsPressed) {
                    options_menu = "extras";
                }
            }
        }
    }
}

function powerupDrawRandom() {
    if (draw_powerup_all) {
        let rNumber = round(random(0, (all_powerups.size - 1)));
        let rArray = Array.from(all_powerups)
        let rCase = rArray[rNumber]
        if (rCase == "speed") {
            speed_powerup.draw()
        }
        else if (rCase == "clear") {
            clear_powerup.draw()
        }
        else if (rCase == "boarder") {
            boarder_powerup.draw()
        }

        setTimeout(powerupDrawRandom, powerup_timer);
    }
}

function drawOptionsQuit() {
    if (mouseX > 840 && mouseX < 980 && mouseY > 900 && mouseY < 980) {
        stroke(255, 255, 255);
        if (mouseIsPressed) {
            if (cur_activ == true) {
                this.activ = !this.activ;
                cur_activ = false;
                view = "menu";
            }
        }
    }
    else {
        stroke('rgba(255,255,255,0.5)');
    }
    rect(910, 940, 140, 80, 5);
    textSize(40);
    text("QUIT", 910, 950);
}

function drawBoarder() {
    stroke(255, 0, 0)

    line(boarder_xRight, 0, boarder_xRight, 1000);
    line(boarder_xLeft, 0, boarder_xLeft, 1000);
    line(0, boarder_yUp, 1000, boarder_yUp);
    line(0, boarder_yDown, 1000, boarder_yDown);
}

function standart_s() {
    if (player1.s > normal_s) {
        player1.s -= 5;
        player2.s -= 5;
    }
}

function noColissionStop() {
    spieler1_noColission = false;
    spieler2_noColission = false;
}

function powerupSpeed() {
    player1.s += 3;
    player2.s += 3;
    setTimeout(standart_s, 6000);
}
function powerupClear() {
    if (trigger_clear == "Spieler 1") {
        spieler1_noColission = true
    }
    else {
        spieler2_noColission = true
    }
    setTimeout(noColissionStop, 3000);
}
function powerupBoarder() {
    if (ms > 0, ms--) {
        boarder_xRight -= 1;
        boarder_xLeft += 1;
        boarder_yUp += 1;
        boarder_yDown -= 1;
        line_stop_low += 1;
        line_stop_high -= 1;
        drawBoarder()
        setTimeout(powerupBoarder, 200)
    }
}

function optionsColour() {
    textSize(50);
    if (colour_select_person == "player1") {
        stroke(255, 255, 255);
        rect(300, 250, 400, 100);
        text("PLAYER 1", 300, 270); 
        stroke("rgba(255,  255, 255, 0.5)");
        rect(700, 250, 400, 100);
        text("PLAYER 2", 700, 270); 
    }
    else {
        stroke("rgba(255,  255, 255, 0.5)");
        rect(300, 250, 400, 100);
        text("PLAYER 1", 300, 270); 
        stroke (255, 255, 255);
        rect(700, 250, 400, 100);
        text("PLAYER 2", 700, 270); 
    }
    if (mouseX > 100 && mouseX < 500 && mouseY < 300 && mouseY > 200) {
        if (mouseIsPressed) {
            if (cur_activ == true) {
                this.activ = !this.activ;
                cur_activ = false;
                colour_select_person = "player1";
            }
        }
    }    
    if (mouseX > 500 && mouseX < 900 && mouseY < 300 && mouseY > 200) {
        if (mouseIsPressed) {
            if (cur_activ == true) {
                this.activ = !this.activ;
                cur_activ = false;
                colour_select_person = "player2";
            }
        }
    }
    stroke('rgba(255,255,255,0.5)');
    let colour_change = 0;
    for (let j = 400; j <= 800; j += 200) {
        for (let i = 200; i <= 800; i += 200) {
            fill(farben[colour_change]);
            rect(i, j, 100, 100);
            colour_change++;
        }
    }

    stroke(255);
    strokeWeight(6)
    noFill()
    if (colour_select_person == "player1") {
        rect(colour_fav_p1X, colour_fav_p1Y, 100, 100)
    }
    else {
        rect(colour_fav_p2X, colour_fav_p2Y, 100, 100)
    }
    strokeWeight(2)

    if (mouseIsPressed) {
        if (cur_activ == true) {
            this.activ = !this.activ;
            cur_activ = false;
            let colour_number = 0;
            for (i = 350; i <= 750; i += 200) {
                for (j = 150; j <= 750; j+= 200, colour_number++) {
                    if (mouseY > i && mouseY < i + 100 && mouseX > j && mouseX < j+100) {
                        colour_number_global = colour_number;
                        fill(255, 255, 255);
                        stroke(255);
                        strokeWeight(4);
                        rect(j + 50, i + 50, 100, 100);
                        strokeWeight(2);
                        if (colour_select_person == "player1") {
                            c1 = farben[colour_number];
                            colour_fav_p1X = j + 50;
                            colour_fav_p1Y = i + 50;
                        }
                        else {
                            c2 = farben[colour_number];
                            colour_fav_p2X = j + 50;
                            colour_fav_p2Y = i + 50;
                        }
                    }
                }
            }
        }
    }

    switch(colour_number_global) {
        case 0:
            if (colour_select_person == "player1") {
                player1.colour_Text = "ROT";
                player1colour_Text_reset = "ROT";
            } 
            else {
                player2.colour_Text = "ROT";
                player2colour_Text_reset = "ROT";
            }
            break;
        case 1:
            if (colour_select_person == "player1") {
                player1.colour_Text = "ORANGE";
                player1colour_Text_reset = "ORANGE";
            } 
            else {
                player2.colour_Text = "ORANGE";
                player2colour_Text_reset = "ORANGE";
            }
            break;
        case 2:
            if (colour_select_person == "player1") {
                player1.colour_Text = "DOTTER";
                player1colour_Text_reset = "DOTTER";
            } 
            else {
                player2.colour_Text = "DOTTER";
                player2colour_Text_reset = "DOTTER";
            }
            break;
        case 3:
            if (colour_select_person == "player1") {
                player1.colour_Text = "GELB";
                player1colour_Text_reset = "GELB";
            } 
            else {
                player2.colour_Text = "GELB";
                player2colour_Text_reset = "GELB";
            }
            break;
        case 4:
            if (colour_select_person == "player1") {
                player1.colour_Text = "LIND";
                player1colour_Text_reset = "LIND";
            } 
            else {
                player2.colour_Text = "LIND";
                player2colour_Text_reset = "LIND";
            }
            break;
        case 5:
            if (colour_select_person == "player1") {
                player1.colour_Text = "GRUEN";
                player1colour_Text_reset = "GRUEN";
            } 
            else {
                player2.colour_Text = "GRUEN";
                player2colour_Text_reset = "GRUEN";
            }
            break;
        case 6:
            if (colour_select_person == "player1") {
                player1.colour_Text = "TUERKIS";
                player1colour_Text_reset = "TUERKIS";
            } 
            else {
                player2.colour_Text = "TUERKIS";
                player2colour_Text_reset = "TUERKIS";
            }
            break;
        case 7:
            if (colour_select_person == "player1") {
                player1.colour_Text = "CYAN";
                player1colour_Text_reset = "CYAN";
            } 
            else {
                player2.colour_Text = "CYAN";
                player2colour_Text_reset = "CYAN";
            }
            break;
        case 8:
            if (colour_select_person == "player1") {
                player1.colour_Text = "BLAU";
                player1colour_Text_reset = "BLAU";
            } 
            else {
                player2.colour_Text = "BLAU";
                player2colour_Text_reset = "BLAU";
            }
            break;
        case 9:
            if (colour_select_person == "player1") {
                player1.colour_Text = "VIOLETT";
                player1colour_Text_reset = "VIOLETT";
            } 
            else {
                player2.colour_Text = "VIOLETT";
                player2colour_Text_reset = "VIOLETT";
            }
            break;
        case 10:
            if (colour_select_person == "player1") {
                player1.colour_Text = "LILA";
                player1colour_Text_reset = "LILA";
            } 
            else {
                player2.colour_Text = "LILA";
                player2colour_Text_reset = "LILA";
            }
            break;
        case 11:
            if (colour_select_person == "player1") {
                player1.colour_Text = "MAGENTA";
                player1colour_Text_reset = "MAGENTA";
            } 
            else {
                player2.colour_Text = "MAGENTA";
                player2colour_Text_reset = "MAGENTA";
            }
            break;
    }

}

function optionsGame() {
    speed_powerup.drawOption();
    clear_powerup.drawOption();
    boarder_powerup.drawOption();

    speed_powerup.clickOption();
    clear_powerup.clickOption();
    boarder_powerup.clickOption();

    speed_powerup.checkSet();
    clear_powerup.checkSet();
    boarder_powerup.checkSet();
    
    fill(0)
    rect(750, 450, 50, 500)
    rect(880, 450, 50, 500)

    fill(255)
    stroke(255, 0, 0)
    strokeWeight(3)
    if (mouseX > 725 && mouseX < 775 && mouseY < 700 && mouseY > 200 && !slider_player_lock) {
        text("POWERUP SPEED", 820, 790)
    }
    if (mouseX > 855 && mouseX < 905 && mouseY < 700 && mouseY > 200 && !slider_powerup_lock) {
        text("PLAYER SPEED", 820, 790)
    }

    fill("rgba(255, 255, 255, 0.5)");
    if (!slider_player_lock && mouseX > 725 && mouseX < 775 && mouseY > slider_pos_powerup - 25 && mouseY < slider_pos_powerup + 25 && mouseIsPressed) {
        release_slider_powerup = false;
        fill(210);
    }

    rect(750, slider_pos_powerup, 50, 50);

    if (release_slider_powerup == false && !slider_player_lock) {
        slider_powerup_lock = true;
        slider_pos_powerup = mouseY;

        if (slider_pos_powerup <= 225) {
            slider_pos_powerup = 225;
        }
        if (slider_pos_powerup >= 675) {
            slider_pos_powerup = 675;
        }

        fill(255);
        stroke(255, 0, 0);
        strokeWeight(3);
        text("POWERUP SPEED", 820, 790);
    }

    fill("rgba(255, 255, 255, 0.5)");
    if (!slider_powerup_lock && mouseX > 855 && mouseX < 905 && mouseY > slider_pos_player - 25 && mouseY < slider_pos_player + 25 && mouseIsPressed) {
        release_slider_player = false;
        fill(210);
    }

    rect(880, slider_pos_player, 50, 50);
    if (release_slider_player == false && !slider_powerup_lock) {
        slider_player_lock = true;
        slider_pos_player = mouseY;

        if (slider_pos_player <= 225) {
            slider_pos_player = 225;
        }
        if (slider_pos_player >= 675) {
            slider_pos_player = 675;
        }

        fill(255);
        stroke(255, 0, 0);
        strokeWeight(3);
        text("PLAYER SPEED", 820, 790);
    }

    player1.s = 5 - (slider_pos_player - 450) / 50;
    player2.s = 5 - (slider_pos_player - 450) / 50;
    s = 5 - (slider_pos_player - 450) / 50;

    normal_s = s;

    collision_exc = ceil(5 / s);

    powerup_timer = 10000 + (slider_pos_powerup - 450) * 30;

    fill(255);
    strokeWeight(2);
    textSize(20);
    text(powerup_timer / 1000 + " Sekunden", 750, 730)
    text(s.toFixed(2) + " Pixel", 880, 730)
    
}


function optionsExtras() {

}


/////////////////////////////////////////////////////////////////////////////////


///MENU///

function menu() {
    background(0);
    textSize(100);
    fill(255);
    textAlign(CENTER);
    stroke(255, 0, 0);
    text("LIGHTRUNNER", 500, 250);

    strokeWeight(4);
    stroke(255, 0, 0);
    line(146, 257, 858, 257);

    fill(0,150);
    rect(500, 500, 500, 100, 30);
    
    rect(500, 650, 500, 100, 30);
    
    rect(500, 800, 500, 100, 30);
    
    noStroke();
    textSize(60);
    fill(255);
    text("SINGLEPLAYER", 500, 520);
    text("MULTIPLAYER", 500, 670);
    text("OPTIONS", 500, 820);

    textSize(28);
    text("DER SINGLEPLAYER HIGHSCORE LIEGT BEI " + localStorage.getItem("time") + " SEKUNDEN", 500, 950);
    strokeWeight(5);
    stroke(255, 0, 0);
    line(70, 960, 930, 960);
    textSize(60);
    strokeWeight(2);
    stroke(0, 0, 0);

    if (mouseIsPressed) {
        if (cur_activ == true) {
            this.activ = !this.activ;
            cur_activ = false;

            if(mouseX > 250 && mouseX < 750 && mouseY > 450 && mouseY < 550) {
                player1.posX = 500;
                player1.posY = 700;
                view = "singleplayer";
                draw_powerup_all = true;
            }
            if(mouseX > 250 && mouseX < 750 && mouseY > 600 && mouseY < 700) {
                view = "multiplayer";
                draw_powerup_all = true;
            }
            if(mouseX > 250 && mouseX < 750 && mouseY > 750 && mouseY < 850) {
                view = "options";
            }
        }
    }
}

///SINGLEPLAYER///

function singleplayer() {
    if (!player1.die) {
        game_Timer();
        game_Background();
        drawBoarder()
        player1.drawPlayer();
        player1.dieCheck();
        keyboardInput();
        player1.checkColissionPowerup();
        player2.checkColissionPowerup();
        if (draw_powerup_once == true) {
            powerupDrawRandom();
            draw_powerup_once = false;
        }
    }

    else {
        clearTimeout(powerupBoarder);
        ms = 0;
        let old_time = localStorage.getItem("time");
        if (old_time == null || old_time < time) { 
            localStorage.setItem("time", time);
        }
        

        draw_powerup_all = false;
        background(0);
        textSize(100);
        fill(255);
        textAlign(CENTER);
        stroke(255, 0, 0);
        text("GAME OVER", 500, 250);
        textSize(40);
        text("DU HAST " + time + " SEKUNDEN UEBERLEBT", 500, 400);

        strokeWeight(4);
        stroke(255, 0, 0);
    
        fill(0,150);
        rect(500, 600, 500, 100, 30);
        
        rect(500, 750, 500, 100, 30);
        
        noStroke();
        textSize(60);
        fill(255);
        text("MENU", 500, 620);
        text("PLAY AGAIN", 500, 770);

        if (mouseIsPressed) {
            if (cur_activ == true) {
                this.activ = !this.activ;
                cur_activ = false;
            
                if(mouseX > 250 && mouseX < 750 && mouseY > 550 && mouseY < 650) {
                    background(0);
                    reset();
                    view = "menu";
                }
                if(mouseX > 250 && mouseX < 750 && mouseY > 700 && mouseY < 800) {
                    draw_powerup_once = true;
                    draw_powerup_all = true;
                    background(0);
                    reset();
                }
            }
        }
    }
}

///MULTIPLAYER///

function multiplayer() {
    if (!player1.die && !player2.die) {
        game_Background();
        drawBoarder()
        
        player1.drawPlayer();
        player2.drawPlayer();

        player1.dieCheck();
        player2.dieCheck();
        
        keyboardInput();

        player1.checkColissionPowerup();
        player2.checkColissionPowerup();

        if (draw_powerup_once == true) { 
            powerupDrawRandom();
            draw_powerup_once = false; 
        }

    }
    else {
        clearTimeout(powerupBoarder);
        ms = 0
        draw_powerup_all = false;
        background(0);
        textSize(70);
        fill(255);
        textAlign(CENTER);
        stroke(255, 0, 0);
        text(winner + " HAT GEWONNEN", 500, 250);
        
        strokeWeight(4);
        stroke(255, 0, 0);
    
        fill(0,150);
        rect(500, 600, 500, 100, 30);
        
        rect(500, 750, 500, 100, 30);
        
        noStroke();
        textSize(60);
        fill(255);
        text("MENU", 500, 620);
        text("PLAY AGAIN", 500, 770);

        if (mouseIsPressed) {
            if (cur_activ == true) {
                this.activ = !this.activ;
                cur_activ = false;
            
                if(mouseX > 250 && mouseX < 750 && mouseY > 550 && mouseY < 650) {
                    background(0);
                    reset();
                    view = "menu";
                }
                if(mouseX > 250 && mouseX < 750 && mouseY > 700 && mouseY < 800) {
                    player1.posX = 500;
                    player1.posY = 700;
                    draw_powerup_all = true;
                    draw_powerup_once = true;
                    background(0);
                    reset();
                }
            }
        }
    }
}

///OPTIONS///


function options() {
    background(0);
    stroke(255);
    line(50, 119, 950, 121);

    colour_box.drawBox();
    game_box.drawBox();
    extras_box.drawBox();
    drawOptionsQuit();
    boxCheck();


    if (options_menu == "colour") {
        optionsColour();
    }

    if (options_menu == "game") {
        optionsGame();
    }

    if (options_menu == "extras") {
        optionsExtras();
    }
}


/*
 move(angle)
  {
    var a=this.array[this.array.length-2];
    var b=this.array[this.array.length-1];
    var vectorx=(b[0]-a[0])
    var vectory=(b[1]-a[1])
    //we take the vector of the previous moove

    // we apply a rotation matrix
    var x=vectorx*Math.cos(angle)-vectory*Math.sin(angle)
    var y=vectorx*Math.sin(angle)+vectory*Math.cos(angle)

    // and add this new vector to the last coord
    var new_x=b[0]+x
    var new_y=b[1]+y

    // print("distance",((new_x-b[0])**2+(new_y-b[1])**2)**0.5)
    this.array.push([new_x,new_y]);
  }
  

!------------------------------------------------------------------------------
VARIABLEN KORRIGIERT

   move(angle) {
      let a=this.trail[this.trail.length-2];
      let b=this.trail[this.trail.length-1];
      let vectorx=(b[0]-a[0])
      let vectory=(b[1]-a[1])

      let x=vectorx*Math.cos(angle)-vectory*Math.sin(angle)
      let y=vectorx*Math.sin(angle)+vectory*Math.cos(angle)
  
      let posX=b[0]+x
      let posY=b[1]+y
  
      this.trail.push([posX,posY]);
    }
!---------------------------------------------------------------------------------


TODO: MIT PAPA DIE RICHTIGEN KURVEN MACHEN

*/
