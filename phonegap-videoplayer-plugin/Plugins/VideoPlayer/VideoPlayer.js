function VideoPlayer() {
}
;

VideoPlayer.prototype.show = function(message,mode) {
    PhoneGap.exec('VideoPlayerCommand.show', message,mode);
};

VideoPlayer.install = function() {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.videoPlayer = new VideoPlayer();
    return window.plugins.videoPlayer;
};

PhoneGap.addConstructor(VideoPlayer.install);

