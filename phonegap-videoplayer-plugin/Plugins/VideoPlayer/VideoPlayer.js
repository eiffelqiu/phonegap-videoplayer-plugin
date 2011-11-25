function VideoPlayer() {
}
;

VideoPlayer.prototype.show = function(message,mode) {
    PhoneGap.exec('VideoPlayerCommand.show', message,mode);
};

PhoneGap.addConstructor(function() {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.videoPlayer = new VideoPlayer();
    return window.plugins.videoPlayer;
});


