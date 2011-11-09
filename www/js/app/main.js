// global app setting
var jQT = new $.jQTouch({
    icon:'img/jqtouch.png',
    addGlossToIcon:false,
    startupScreen:'img/jqt_startup.png',
    statusBar:'black'
});

// app customize code
$(function() {

    // video plugin definition
    var vp;

    // Step 1:  initialize plugin
    $(document).bind("deviceready", function() {
        vp = window.plugins.videoPlayer;
    });

    // Step 2: prepare Callback function
    var videoplayerCallBack = function(param) { // Callback function should be: pluginname + CallBack
        if (param == 'finish') {
            $('#status').html("finish playing");
            navigator.notification.alert("finish");
        }
    };

    // Step 3: utility wrap function use by this page
    var play = function(movieName, portrait) {
        vp.show(movieName, portrait);
    };

    // Step 4: binding utilty function to html element
    $('#play1').bind("click", function(event) {
        play('movie.mp4', 'YES');
    });
    $('#play2').bind("click", function(event) {
        play('http://easyhtml5video.com/images/happyfit2.mp4', 'YES');
    });
});