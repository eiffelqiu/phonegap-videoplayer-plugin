//
//  MovieViewController.m
//  phonegap-videoplayer-plugin
//
//  Created by eiffel on 11-11-9.
//  Copyright (c) 2011年 __MyCompanyName__. All rights reserved.
//

#import "MovieViewController.h"

@implementation MovieViewController
@synthesize orientation=_orientation;

- (id)initWithContentURL:(NSURL *)url andOrientation:(BOOL)orientation
{
    MovieViewController *o =  [[[[self class] alloc] initWithContentURL:url] autorelease];
    o.orientation = orientation;
    return o;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    NSLog(@"[%d]", self.orientation);
    if (self.orientation) {
        return UIInterfaceOrientationIsPortrait(interfaceOrientation);
    } else {
       return UIInterfaceOrientationIsLandscape(interfaceOrientation); 
    }
}

@end
