// Iteration 1: Declare variables required for this game
var game=document.getElementById("game-body");
var timer=document.getElementById("timer").textContent;
var $lives=document.getElementById("lives");
var zombieId = 0;
const images = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
  ];
// Iteration 1.2: Add shotgun sound
const audioShotgun= new Audio("https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav");
game.onclick = () =>{
    audioShotgun.pause();
    audioShotgun.currentTime = 0;
    audioShotgun.play();
}
// Iteration 1.3: Add background sound
const audioBackground = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3");
audioBackground.play();
audioBackground.loop = true;
// Iteration 1.4: Add lives
const maxlives = 4;
var lives = 4;
// Iteration 2: Write a function to make a zombie
function createZombie(){
    var randomimages = images[getRandomInt(0,images.length)];
    game.innerHTML += `<img src="./assets/${randomimages}" class="zombie-image" id="zombie${zombieId}">`;
    let zombie=document.getElementById("zombie" + zombieId);
    console.log(zombie)
    zombie.style.transform = `translateX(${getRandomInt(10, 80)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombie.onclick = () => {
        destroy(zombie);
      };
}
// Iteration 3: Write a function to check if the player missed a zombie
function missedZombie(zombie){
    if(zombie.getBoundingClientRect().top <= 0) {
        lives--;
        return true;
    }
    return false;
    
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroy(zombie){
    zombie.style.display="none"
    zombieId++;
    createZombie();
}
// Iteration 5: Creating timer
var timerId=setInterval(function(){
        timer--;
        document.getElementById("timer").textContent=timer;
        let zombie=document.getElementById("zombie"+zombieId);
        if(missedZombie(zombie)==true){
            destroy(zombie)
        if (lives==0){
            clearInterval(timerId);
            window.location.href="./game-over.html";
            }
        }
        if(timer==0){
            clearInterval(timerId);
            window.location.href="./win.html"
        }
    },1000)
    

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }
