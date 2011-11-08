function VideoPlayer()
{
};

VideoPlayer.prototype.show = function(message)
{
    PhoneGap.exec('VideoPlayerCommand.show', message);
};

VideoPlayer.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};	
    }

    window.plugins.videoPlayer = new VideoPlayer();
    return window.plugins.videoPlayer;
};

PhoneGap.addConstructor(VideoPlayer.install);

