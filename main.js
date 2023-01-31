song1 = "";
song2 = "";
stat1 = "";
stat2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload() {
    song1 = loadSound("Sia-Unstoppable_Song.mp3");
    song2 = loadSound("Pokemon_Theme_Song.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    stat1 = song1.isPlaying();
    stat2 = song2.isPlaying();
    fill('pink');
    stroke('darkviolet');
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (stat1 == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song - Unstoppable";
        }
    }
    song2.isPlaying();
    if(scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (stat2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song - Pokemon Theme Song";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized !!!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}