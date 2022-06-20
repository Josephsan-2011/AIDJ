 song = ""
 leftWristX = 0
 leftWristY = 0
 rightWristX = 0
 leftWristY = 0



 function preload() {
     song = loadSound("music.mp3")
 }

 function setup() {
     canvas = createCanvas(500, 500)
     canvas.center()
     video = createCapture(VIDEO)
     video.hide()
     posenet = ml5.poseNet(video, model_loaded)
     posenet.on("pose", got_poses)
 }
 function draw() {
    image(video, 0, 0, 500, 500)

    fill("blue")
    stroke("blue")
    if (scoreLeftWrist>0.2) {
    circle(leftWristX, leftWristY, 25)
    m1 = Number(leftWristY)
    remove_decmils = floor(m1)
    volume = remove_decmils / 500
    document.getElementById("volume").innerHTML = "Volume =" + volume
    song.setVolume(volume)
}}
 function play() {
     song.play()
     song.setVolume(0.5)
     song.rate(1.5)
 }

 function model_loaded() {
     console.log("POSENET IS INITIALIZED")
 }

 function got_poses(results) {
     if (results.length > 0) {
         console.log(results)
         scoreLeftWrist = reults[0].pose.keypoints[9].score
         console.log(scoreLeftWrist)
         leftWristX = results[0].pose.leftWrist.x
         leftWristY = results[0].pose.leftWrist.y
         rightWristX = results[0].pose.rightWrist.x
         rightWristY = results[0].pose.rightWrist.y
         console.log(leftWristX, leftWristY)
         console.log(rightWristX, leftWristY)
     }
 }