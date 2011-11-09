var vp; // video plugin definition

// Step 1:  initialize plugin 
function onDeviceReady() {
    vp = window.plugins.videoPlayer;
}

// Step 2: prepare Callback function
function videoplayerCallBack(param) { // Callback function should be: pluginname + CallBack
    if (param == 'finish') {
        $('#status').html("finish playing");
        navigator.notification.alert("finish");
    }
}

// Step 3: utility wrap function use by this page
function showVideo(movieName) {
    vp.show(movieName);
}

var jQT = new $.jQTouch({
    icon:'img/jqtouch.png',
    addGlossToIcon:false,
    startupScreen:'img/jqt_startup.png',
    statusBar:'black'
});

$(function() {
	document.addEventListener("deviceready", onDeviceReady, false);

    // Step 4: binding utilty function to html element
    $('#play1').click(function($) {
        showVideo('movie.mp4');
    });
    $('#play2').click(function($) {
        showVideo('http://easyhtml5video.com/images/happyfit2.mp4');
    });
});