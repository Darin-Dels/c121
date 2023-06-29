Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 Version : ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3wVmVKt3f/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Is Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        rgn = results[0].label;
        speak();
        if(results[0].label == "victory")
        {
            document.getElementById("gesture_emoji").innerHTML = "&#9996;";
        }

        if(results[0].label == "best")
        {
            document.getElementById("gesture_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "amazing")
        {
            document.getElementById("gesture_emoji").innerHTML = "&#128076;";
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Your Gesture is " + rgn;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}