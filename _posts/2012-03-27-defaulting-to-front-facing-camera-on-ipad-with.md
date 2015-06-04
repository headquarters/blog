---
layout: post
title: Defaulting to front-facing camera on iPad with PhoneGap
date: '2012-03-27T21:00:00-05:00'
tags:
- development
- ios
- ipad
- phonegap
tumblr_url: http://michaelehead.com/post/20038040089/defaulting-to-front-facing-camera-on-ipad-with
---
While working on a PhoneGap project for an iPad app that utilizes the PGBarcodeScanner plugin, I was trying to find a solution to using the front-facing camera on an iPad 2 by default–not allowing the user to swap back and forth via the UI. I found a helpful [Stack Overflow post](http://stackoverflow.com/questions/5886719/what-is-the-front-cameras-deviceuniqueid) on finding the front-facing camera's device ID. The code below is from the Stack Overflow answer:
 
	-(AVCaptureDevice *)frontFacingCameraIfAvailable
	{
		NSArray *videoDevices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
		AVCaptureDevice *captureDevice = nil;
		for (AVCaptureDevice *device in videoDevices)
		{
		    if (device.position == AVCaptureDevicePositionFront)
		    {
		        captureDevice = device;
		        break;
		    }
		}

		//  couldn't find one on the front, so just get the default video device.
		if ( ! captureDevice)
		{
		    captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
		}

		return captureDevice;
	}

Placing this code in the `PGBarcodeScanner.mm` file, above the `setUpCaptureSession` function, I was able to call it inside the setUpCaptureSession function:

	AVCaptureDevice* device = [self frontFacingCameraIfAvailable]; //[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];

The commented-out line is the original PGBarcodeScanner.mm code, which I've left for others to reference.
