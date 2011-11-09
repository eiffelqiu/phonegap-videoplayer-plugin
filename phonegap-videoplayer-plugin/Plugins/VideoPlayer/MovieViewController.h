//
//  MovieViewController.h
//  phonegap-videoplayer-plugin
//
//  Created by eiffel on 11-11-9.
//  Copyright (c) 2011年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MediaPlayer/MPMoviePlayerViewController.h"

@interface MovieViewController : MPMoviePlayerViewController {
    BOOL _orientation;
}

@property(nonatomic) BOOL orientation;

- (id)initWithContentURL:(NSURL *)url andOrientation:(BOOL)orientation;

@end
