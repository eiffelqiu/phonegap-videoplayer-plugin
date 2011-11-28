// video plugin definition
var vp;

// Step 1:  initialize plugins
$(document).bind("deviceready", function() {
    vp = window.plugins.videoPlayer;
});


// Step 2: prepare callback function for videoplugin
var videoplayerCallBack = function(param) { // callback function should be: pluginname + CallBack
    if (param == 'finish') {
        $('#status').html("finish playing");
        navigator.notification.alert("finish");
    }
};

// initialize jo
jo.load();

App = {
    load:function() {
        var screen, stack, card;

        // create our UI
        screen = new joScreen(
            stack = new joStack().push(
                card = new joCard([
                    new joTitle("Video"),
                    new joCaption("Video List"),
                    new joDivider(),
                    new joButton("Video 1").selectEvent.subscribe(function() {
                        //navigator.notification.alert("finish");
                        vp.play('movie.mp4', 'YES');
                    }),
                    new joButton("Video 2").selectEvent.subscribe(function() {
                        vp.play('http://easyhtml5video.com/images/happyfit2.mp4', 'NO');
                    })
                ])
            )
        );
    }
};



