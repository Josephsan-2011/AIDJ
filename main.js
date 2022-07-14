 song = ""
 leftWristX = 0
 leftWristY = 0
 rightWristX = 0
 rightWristY = 0



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
     if (rightWristY>0 && rightWristY<=100) {
        document.getElementById("speed").innerHTML = "Speed =0.5x"
        song.rate(0.5)
        
     }
     if (rightWristY>100 && rightWristY<=200) {
        document.getElementById("speed").innerHTML = "Speed =1.0x" 
        song.rate(1.0)
        
     }
     if (rightWristY>200 && rightWristY<=300) {
        document.getElementById("speed").innerHTML = "Speed =1.5x" 
        song.rate(1.5)
        
     }
     if (rightWristY>300 && rightWristY<=400) {
        document.getElementById("speed").innerHTML = "Speed =2.0x" 
        song.rate(2.0)
        
     }
     if (rightWristY>400 && rightWristY<=500) {
        document.getElementById("speed").innerHTML = "Speed =2.5x" 
        song.rate(2.5)
        
     }
     if (scoreLeftWrist > 0.2) {
         circle(leftWristX, leftWristY, 25)
         m1 = Number(leftWristY)
         remove_decmils = floor(m1)
         volume = remove_decmils / 500
         document.getElementById("volume").innerHTML = "Volume =" + volume
         song.setVolume(volume)
     }
 }

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
         scoreLeftWrist = results[0].pose.keypoints[9].score
         console.log(scoreLeftWrist)
         leftWristX = results[0].pose.leftWrist.x
         leftWristY = results[0].pose.leftWrist.y
         rightWristX = results[0].pose.rightWrist.x
         rightWristY = results[0].pose.rightWrist.y
         console.log(leftWristX, leftWristY)
         console.log(rightWristX, rightWristY)
     }
 }