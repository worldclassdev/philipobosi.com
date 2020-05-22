---
title: Handling Media Files like a Pro in JAMstack Applications
date: "2020-05-23"
description: "An article that examines ways to properly handle media files in JAMstack apps using Cloudinary."
permalink: "media-files-in-jamstack-using-cloudinary"
author: worldclassdev
---

**TL;DR:** - In this article, we examine how to properly store, transform and deliver media files i.e images and videos in JAMstack applications using Cloudinary. The techniques explored herein are also very useful within other kinds of web applications as well. Enjoy!

# Introduction

A remarkably large portion of the web as we know it today comprises primarily of media assets. These primarily comprise of images and videos. In building JAMstack applications, server-side functionality is conveniently abstracted into reusable APIs which are accessed using JavaScript.
An example of such functionality is media management i.e upload, storage, transformation and rendering.

An API that does all these? Okay, this sounds exciting, but what really is JAMstack and how would this work?

# What is JAMstack?

The “JAM” in there stands for client-side **J**avaScript, reusable **A**PIs and prebuilt **M**arkup. Emphasis on **client-side, reusable and prebuilt** as these are the defining terms of this web development architecture.

The term basically describes the idea of building fully functional web applications that rely primarily on client-side JavaScript such that everything takes place within the browser. To make this possible, previously considered back-end functionality is accessed and utilized on the front-end through dedicated reusable API’s generally termed API as a service(or more broadly Software as a Service i.e SAAS). Examples include [Algolia](https://www.algolia.com/) for search, [Typeform](https://www.typeform.com/product/?tf_campaign=brand_1506568720&tf_source=google&tf_medium=paid&tf_content=59657938444_329558427288&tf_term=typeform&tf_dv=c&gclid=CjwKCAjw2cTmBRAVEiwA8YMgzXktRr37vibrQWDTWNUWhI8qk2F0NGlddCFkr9kY9bqjegk8yd2p4BoCsmYQAvD_BwE) for form processing, [Prismic.io](https://prismic.io/) as a CMS for data management and [Cloudinary](https://cloudinary.com/) for media management. 😉

The markup is prebuilt which implies that the templated views are populated and created/built at deploy time. This is usually achieved using a static site generator (e.g [Gatsby](https://www.gatsbyjs.org/) and [Hugo](https://gohugo.io/)) or a build tool.

![Snapshot from https://JAMstack.org/ breaking down the JAMstack](https://paper-attachments.dropbox.com/s_F5015317E0100799832CF5CE04A4417A773F34B81331BF69CE6A104C0B1F281F_1557017796821_image.png)

All of these come together to produce web applications with the following super powers: 💪🏾

- High Performance
- Good Security
- Cheap to scale

# Is your JAMstack truly JAMstack?

Like most developers, you are probably wondering why you should be worrying about this at all. After all, when you create an `images` folder within your `assets` folder, you load them up just fine and have been storing your uploads conveniently on your server too.

Why then should you worry?

![](https://paper-attachments.dropbox.com/s_F5015317E0100799832CF5CE04A4417A773F34B81331BF69CE6A104C0B1F281F_1557026308915_image.png)

Load time is a fundamental factor when crafting rich user interfaces and experiences on the web. Media files are generally large and heavy especially when of high quality.

**What does this mean for your JAMstack application?**

Using large and un-optimised media resources within your application will slow it down and ruin the user’s experience. Recall that the high performance is supposed to be one of the super powers of the JAMstack? What happens when users use our application with poor internet connections? How then can we handle media assets properly to keep our JAMstack application genuinely JAMstack?

# Look! A Savior !

This is where [Cloudinary](https://cloudinary.com/) comes in. With Cloudinary, you can upload, store and optimize images for your web application seamlessly and on the fly without any boggling configuration.

How is your application affected?

![](https://paper-attachments.dropbox.com/s_F5015317E0100799832CF5CE04A4417A773F34B81331BF69CE6A104C0B1F281F_1557062235844_image.png)

With Cloudinary, optimized versions of images can be served to users from servers nearest to them, thus reducing load time and enhancing the experience of your application.

To fully understand the relevance of Cloudinary in your JAMstack application, let us take a deeper look at what it really offers.

# The How(A Dive into Image Optimization)

In managing media assets for your web application, the following things are worth considering:

- What is the right format to render?
- How do I maintain quality?
- How do I handle resizing?
- How do I deliver media assets optimally(especially over poor internet connections)?

## Rendering the right format

![](https://media.giphy.com/media/KfCPwfA4zWOr4rBz9g/giphy.gif)

As a web developer, you are almost definitely familiar with JPEG, PNG, SVG and GIF image formats. You’ve probably used them extensively too. Guess what? There’s more!

Various browsers support other formats which are generally smaller and optimized for rendering within web pages. These formats include:

- **WebP -** This image format was developed by Google for lossy and lossless compression. It is currently supported in Chrome, Opera, Android Browser, Edge 18+ and Firefox 65+**.**
- **JPEG XR -** This was developed by Microsoft for lossy and lossless compression as well. It is supported in IE9-11 and Edge.
- **JPEG 2000 -** This format also allows lossy and lossless compression and is supported in Safari 5+.

**Good to know, but are there any benefits in using these?**

These formats are usually more optimized than the conventional formats as they are specifically transformed to improve the user experience for specific browsers. For instance, loading a 20kb JPEG image transformed into the formats above yields the following:

- **WebP - 10kb**
- **JPEG XR - 13kb**
- **JPEG 2000 - 10kb**

> In optimizing media resources for web applications, every kilobyte(kb) that is chunked off while retaining the quality of the resource is a win.

The reduction in size may appear negligible, however it is important to know that these gains build up across your web application, thus resulting in huge performance gains.

**This is all cool and exciting but how do I make the choice of what format gets rendered to what user?**
Guess what? You don’t have to!

## Automatic Image Formatting with Cloudinary

With Cloudinary, the choice of what image to render is handled by advanced optimization algorithms which serve the most optimal format to the user. To use this feature, you add the `f_auto` tag to the resource URL right after `/upload/` as shown below:

    https://res.cloudinary.com/demo/image/upload/f_auto/pond_reflect.jpg

**Note:** When you upload media files to Cloudinary, you get a unique link for accessing that file. The link for the resource above is `https://res.cloudinary.com/demo/image/upload/pond_reflect.jpg`.

You may also retrieve uploaded images manually in several other formats apart from that in which the image was uploaded by changing the extension above e.g

    https://res.cloudinary.com/demo/image/upload/pond_reflect.webp

Awesome!!! A different format wouldn’t always bring better quality, would it? Isn’t the quality of the image a performance concern?

## Maintaining Image Quality

It is very important to optimize images for good visual quality and sadly rendering the right format is not all it takes. Do not despair.

![](http://media.giphy.com/media/3otPoEaA4G9rEVgVUY/giphy.gif)

## Automatic Image Quality with Cloudinary

With cloudinary, you can automate the quality control of images using the `q_auto` tag as shown below:

    https://res.cloudinary.com/demo/image/upload/q_auto/pond_reflect.jpg

This uses sophisticated algorithms to select the optimal quality for the specific image type, format and browser in order to create a smaller sized image that is sufficiently clear.

You may also specify the quality level manually on a scale of 1 to 100 i.e `q_1` for the lowest to `q_100` for the highest as shown below:

    https://res.cloudinary.com/demo/image/upload/q_80/pond_reflect.jpg

In most cases `q_80` yields an optimal quality level that is sufficiently clear and optimized for rendering.

## How do I handle resizing?

Whether done with CSS or some graphic editing tool, resizing images can be quite a hassle for web developers. Eventually, we very quickly end up with distorted images, thus ruining the user experience yet again. Thankfully, this gets easier.

## Automatic Image Resizing with Cloudinary

Cloudinary provides an auto-resizing feature thus enabling the delivery of high resolution images to devices that can handle them while scaling the images as necessary. To achieve this, we make use of the following tags:

- `w_auto` - This scales the width of the image to the available space on the webpage’s layout.
- `dpr-auto` - This ensures that the image is rendered with the appropriate Device Pixel Ratio for the user’s device.

It is used as shown below:

    https://res.cloudinary.com/demo/image/upload/w_auto,dpr_auto/pond_reflect.jpg

This can also be manually specified as shown below:

    https://res.cloudinary.com/demo/image/upload/w_200,dpr_3/pond_reflect.jpg

## Delivering media assets optimally

How media assets are delivered is a very strong concern in building web applications. The concern gets even more pressing as we begin to consider areas with poor internet connectivity. Would the image just keep loading without any feedback for the user? Would it get broken? Or something else?

Cloudinary to the rescue!

## Enhanced Media Delivery with Cloudinary

## For Images

The following strategies come in handy for improving the delivery of images through Cloudinary:

- Image Preloading
- Dynamic/Lazy Loading
- Progressive Loading

**Image Preloading**
Using preloading, we are able to fetch images that the user would be needing next/soon just before they are needed, thus providing a smooth experience. This is very easily achieved in HTML, with the use of the `prefetch` directive on the link tag `<a></a>`. An example is shown below:

    <link rel="prefetch" href="image.png">

The `prefetch` directive helps get the specified resource for use in the next navigation/routing. For images used at a latter point in the current navigation, you may use the `preload` directive as shown below:

    <link rel="preload" as="image" href="https://res.cloudinary.com/demo/image/upload/w_auto,dpr_auto/pond_reflect.jpg" media="(max-width: 600px)">

This isn’t particularly a Cloudinary feature, but improves delivery remarkably when used in conjunction with Cloudinary.

**Lazy Loading**
Lazy loading, also known as dynamic loading, is another efficient way to improve the delivery of images on the client. The idea is to load images required for visible sections of the page only. Thus, others are loaded dynamically as they are scrolled into view.

## Why is this awesome?

This technique prevents the over-fetching of images, such that images that are not needed by the user do not get loaded as he may never interact with with those sections of the page.

## How do we do this?

Implementing this technique requires a bit of JavaScript manipulation for monitoring the browser’s viewport and responding accordingly. A recommended tool for doing this excellently is [lazysizes](https://github.com/aFarkas/lazysizes).

> It is a high performance and SEO friendly lazy loader for images (responsive and normal), iframes and more, that detects any visibility changes triggered through user interaction, CSS or JavaScript without configuration.

With lazysizes, implementing this feature is only a matter of adding a class of `lazyload` to the image as shown below:

    <img data-src="https://res.cloudinary.com/demo/image/upload/w_auto,dpr_auto/pond_reflect.jpg" class="lazyload" />

Although not a Cloudinary feature, this may be used in conjunction with Cloudinary to greatly enhance web applications.

**Progressive Loading**

![Progressive image sample](https://cloudinary-res.cloudinary.com/image/upload/v1488841931/Progressive_Images_600x600_v3.gif)

> A **progressive** image is an **image** created using compression algorithms that load the **image** in successive waves until the entire **image** is downloaded and clearly displayed. This makes the **image** appear to load faster, as it loads the whole **image** in **progressive** waves.

Taking advantage of Cloudinary’s `fl_progressive` transformation tag, we are able to load in progressive JPEGs into web pages as illustrated below:

    https://res.cloudinary.com/demo/image/upload/fl_progressive/pond_reflect.jpg

This transformation could be further personalized to achieve various configurations using mode values `semi`, `steep` and `none`. You may [learn more about how to implement this here.](https://cloudinary.com/documentation/transformation_flags?query=fl_progres&c_query=Delivery%20and%20image%20format%20flags%20%E2%80%BA%20progressive[:mode]#delivery_and_image_format_flags)

## For Videos

There are several video formats that one may use while serving videos on the web. The most commonly used today include ` .``MP4 `, ``.`MOV`and`.``WEBM`. All of these have their peculiar use cases and are most appropriate under various conditions. However, there are problems common to their usage irrespective of what format is chosen. They include:

- Using the wrong video resolution
- Using the wrong video codec
- Using too high a video bitrate
- Not muting autoplaying videos
- Buffering

These concerns get even more unbearable with poor internet connectivity. How then can we solve these?

## Adaptive Bitrate Streaming with Cloudinary

Adaptive Bitrate Streaming(ABS) is a streaming technique which is able to dynamically adjust the quality of the video based on what the connection speed can handle. It is also able to automatically serve the right resolution for the viewer’s device. This feature can be noticed on platforms like Youtube and Netflix where instead of stopping to buffer, you observe that the video switches gracefully to a more pixelated version until better connectivity is attained.

This tends to make sure that the viewer’s experience is uninterrupted and doesn’t have to wait an inordinate amount of time for videos to buffer.

Using the [Cloudinary SDKs,](https://cloudinary.com/documentation/) you can easily implement HTTP Live Streaming and MPEG-DASH adaptive bit-rate streaming formats as shown in the code snippet below:

    Cloudinary::Uploader.upload("big_buck_bunny.mp4", :resource_type => :video,
      :eager => [
         {:streaming_profile => "full_hd", :format => "m3u8"},
         {:streaming_profile => "full_hd", :format => "mpd"}],
      :eager_async => true,
      :eager_notification_url => "http://mysite/notify_endpoint",
      :public_id => "bb_bunny")

# Putting it all together

The various media asset management techniques just considered can be finely interwoven to drastically improve performance for users across various devices and on various quality levels of internet connectivity.

Primarily, these enhancement transformations and directives are utilized by adding the appropriate tags and modes where required after the `/upload` section of your resource URL. i.e

    https://res.cloudinary.com/demo/image/upload/{tags go here}/pond_reflect.jpg

Several tags may also be applied on the same resource by separating them with commas as shown below:

    http://res.cloudinary.com/demo/image/upload/w_300,fl_progressive/pond_reflect.png

# Conclusion

We have successfully examined several valuable media management techniques available via the Cloudinary SDK and API. We have also examined ways to implement them and shown the performance benefit of each method for your JAMstack application.

This is by no means an exhaustive list of all media management techniques available via Cloudinary. To discover more concepts, techniques and transforms, the [Official Cloudinary Guides](https://cloudinary.com/documentation/cloudinary_guides) are a good place to start.

# Further Reading

For a better understanding of some of the techniques and concepts examined above, you may use the following links:

- [WebP](https://en.wikipedia.org/wiki/WebP)
- [JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR)
- [JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000)
- [Getting started with Webp, JPEG2000, and JPEG-XR (2019)](https://blog.greggant.com/posts/2017/07/26/getting-started-with-jpeg2000-jpeg-xr-webp-on-macos-osx.html)
- [Multi Codec Adaptive Bitrate Streaming](https://cloudinary.com/blog/video_optimization_part_ii_adaptive_bitrate_streaming_of_multiple_codecs)
