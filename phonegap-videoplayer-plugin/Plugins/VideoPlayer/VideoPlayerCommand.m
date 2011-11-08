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
    NSString *movie = [arguments objectAtIndex:0];
    NSRange range = [movie rangeOfString:@"http"];
    if(range.length > 0) {
        NSLog(@"%@",movie);
        player = [[MPMoviePlayerController alloc] initWithContentURL:[NSURL URLWithString:movie]];        
    } else {
        NSArray *fileNameArr = [movie componentsSeparatedByString:@"."];
        NSString *prefix = [fileNameArr objectAtIndex:0];
        NSString *suffix = [fileNameArr objectAtIndex:1];
        NSString *soundFilePath = [[NSBundle mainBundle] pathForResource:prefix ofType:suffix];
        NSURL *fileURL = [NSURL fileURLWithPath:soundFilePath];
        player = [[MPMoviePlayerController alloc] initWithContentURL:fileURL];        
    }

    if (player) {
        player.fullscreen = YES;
        player.scalingMode = MPMovieScalingModeAspectFill;
        player.controlStyle = MPMovieControlStyleEmbedded;
        [[UIApplication sharedApplication] setStatusBarOrientation:UIInterfaceOrientationPortrait animated:NO];
        PhoneGapViewController *cont = (PhoneGapViewController *) [super appViewController];
        [player.view setFrame:cont.view.bounds];
        [cont.view addSubview:player.view];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(MovieDidExit:) name:MPMoviePlayerDidExitFullscreenNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(MovieDidFinish:) name:MPMoviePlayerPlaybackDidFinishNotification object:nil];
        [player play];
    }
}

- (void)MovieDidFinish:(NSNotification *)notification {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:MPMoviePlayerPlaybackDidFinishNotification
                                                  object:nil];
    [player stop];
    [player.view removeFromSuperview];
    [self writeJavascript:@"videoplayerCallBack('finish');"];

}

- (void)MovieDidExit:(NSNotification *)notification {
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:MPMoviePlayerDidExitFullscreenNotification
                                                  object:nil];
    [player stop];
    [player.view removeFromSuperview];
    [self writeJavascript:@"videoplayerCallBack('stop');"];

}

- (void)dealloc {
    [player release];
    [super dealloc];
}


@end
