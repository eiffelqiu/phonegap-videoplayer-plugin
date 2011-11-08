//
//  ActivityIndicatorCommand.m
//  HelloPhoneGap
//
//  Created by Hiedi Utley on 4/8/11.
//  Copyright 2011 Chariot Solutions, LLC. All rights reserved.
//

#import "VideoPlayerCommand.h"
#import "MediaPlayer/MPMoviePlayerController.h"

#ifdef PHONEGAP_FRAMEWORK

#import <PhoneGap/PhoneGapViewController.h>

#else
#import "PhoneGapViewController.h"
#endif

@implementation VideoPlayerCommand

- (void)show:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options {
    NSString *soundFilePath = [[NSBundle mainBundle] pathForResource:@"movie" ofType:@"mp4"];
    NSURL *fileURL = [[NSURL fileURLWithPath:soundFilePath] retain];
    player = [[MPMoviePlayerController alloc] initWithContentURL:fileURL];
    player.fullscreen = YES;
    player.scalingMode = MPMovieScalingModeAspectFill;
    player.controlStyle = MPMovieControlStyleEmbedded;
    [[UIApplication sharedApplication] setStatusBarOrientation:UIInterfaceOrientationPortrait animated:NO];
    PhoneGapViewController *cont = (PhoneGapViewController *) [super appViewController];
    [player.view setFrame:cont.view.bounds];
    [cont.view addSubview:player.view];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(MovieDidExit:) name:MPMoviePlayerDidExitFullscreenNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(MovieDidFinish:) name:MPMoviePlayerPlaybackDidFinishNotification object:nil];
    [fileURL release];
    [player play];
}

- (void)MovieDidFinish:(NSNotification *)notification {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:MPMoviePlayerPlaybackDidFinishNotification
                                                  object:nil];
    [player stop];
    [player.view removeFromSuperview];
    [self writeJavascript:@"navigator.notification.alert('Play done'); document.getElementById('status').innerHTML='Finish Playing';"];

}

- (void)MovieDidExit:(NSNotification *)notification {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:MPMoviePlayerDidExitFullscreenNotification
                                                  object:nil];
    [player stop];
    [player.view removeFromSuperview];
    [self writeJavascript:@"document.getElementById('status').innerHTML='Stop Playing';"];

}

- (void)dealloc {
    [player release];
    [super dealloc];
}


@end
