// global app setting
var jQT = new $.jQTouch({
    icon:'img/jqtouch.png',
    addGlossToIcon:false,
    startupScreen:'img/jqt_startup.png',
    statusBar:'black'
});

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

    // Step 4: define route action
    var app = $.sammy(function() {

        this.get('#/info', function() {
            navigator.notification.alert("you click info");
        });

        this.get('#/play1', function() {
            play('movie.mp4', 'YES'); // 'YES' for portrait display video
        });

        this.get('#/play2', function() {
            play('http://easyhtml5video.com/images/happyfit2.mp4', 'NO'); // 'NO' for landscape display video
        });
    });

    $(function() {
        app.run('#/');
    });

});