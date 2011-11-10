// global application setting
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

    // Step 2: prepare callback function
    var videoplayerCallBack = function(param) { // Callback function should be: pluginname + CallBack
        if (param == 'finish') {
            $('#status').html("finish playing");
            navigator.notification.alert("finish");
        }
    };

    var helper = {
        // Step 3: utility wrap function used by this page
        play:function(movieName, portrait) {
            vp.show(movieName, portrait);
        }
    };

    // Step 4: application logic
    var app = $.sammy(function() {
        this.use(Sammy.Tmpl);

        this.get('#/info', function() {
            var data = {
                getInfo:function() {
                    return " about eiffel qiu"
                }
            };
            $("#someTemplate").tmpl(data).appendTo('#test');
        });

        this.get('#/play1', function() {
            // 'YES' for portrait display video
            helper.play('movie.mp4', 'YES');
        });

        this.get('#/play2', function() {
            // 'NO' for landscape display video
            helper.play('http://easyhtml5video.com/images/happyfit2.mp4', 'NO');
        });
    });

    $(function() {
        app.run('#/');
    });

});