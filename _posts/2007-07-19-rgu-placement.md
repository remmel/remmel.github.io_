---
id: 85
title: RGU Placement
date: 2007-07-19T11:51:04+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=85
permalink: /blog/85-rgu-placement/
categories:
  - Uncategorized
---
<img class="alignright size-thumbnail wp-image-87" title="robert gordon logo" src="/wp-content/uploads/2011/04/robert-gordon-logo-150x150.jpg" alt="" width="105" height="105" />To validate my technical degree in Informatics-Embedded Systems I have done from march to june 2007 a placement in the Robert Gordon University in Aberdeen, Scotland. The subject was to develop a control system for an Autonomous Underwater Vehicle (AUV) using **image processing**.

Thus, the main part of my work was to write algorithms to process images captured by the webcam.

<p style="text-align: center;">
  <img class="size-full wp-image-92 aligncenter" title="ROV" src="/wp-content/uploads/2011/04/ROV.jpg" alt="" width="230" height="164" />
</p>

Algorithms wrote:

  * Lines and rectangles detection (using Hough space instead of Cartesian space).
  * Circle detection with its center.
  * Edge detection.
  * Color detection (using HSV color space instead of RGB).
  * Luminosity detection.

Once, environment is know, the AUV must move by activating its 3 motors. To control the motors from the a PC, the board K8055 is used.

[🖺 Download the internship report](/wp-content/uploads/2011/04/AUV-rapportENG-20070622.pdf)