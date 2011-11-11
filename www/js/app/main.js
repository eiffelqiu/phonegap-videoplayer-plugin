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

    var helper = {
        // Step 3: utility wrap function used by this page

        // play video helper function
        play:function(movie, portrait) {
            vp.show(movie, portrait);
        },

        // info helper function
        info:function() {
            var data = {
                getInfo:function() {
                    return "eiffel qiu"
                }
            };
            $("#info").html("").append($("#info-template").tmpl(data));
        }
    };

    // Step 4: application logic
    var app = $.sammy(function() {
        this.use(Sammy.Tmpl);

        this.get('#/info', function() {
            helper.info();
        });

        this.get('#/play1', function() {
            helper.play('movie.mp4', 'YES'); // 'YES' for portrait video
        });

        this.get('#/play2', function() {
            helper.play('http://easyhtml5video.com/images/happyfit2.mp4', 'NO'); // 'NO' for landscape video
        });
    });

    $(function() {
        app.run('#/');
    });

});