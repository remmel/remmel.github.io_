---
id: 179
title: Draw SVG rectangle with 1,2,3 or 4 rounded corner
date: 2011-09-05T21:24:37+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=179
permalink: /blog/179-draw-rectangle-with-123-or-4-rounded-corner/
categories:
  - Uncategorized
---
<img class="alignright size-full wp-image-202" title="Screen shot 2011-09-06 at 12.40.02 AM" src="/wp-content/uploads/2011/09/Screen-shot-2011-09-06-at-12.40.02-AM.png" alt="" width="124" height="127" /><br />Here is the code allowing you to draw with Raphael JS a rectangle with one or many corner rounded and to have a corner more rounded than the other.

This code will add _roundedRectangle_ method to Raphael JS ([how to extend Raphael](http://raphaeljs.com/reference.html#plugins-canvas)).

_roundedRectangle(x, y, width, height, upper\_left\_corner, upper\_right\_corner, lower\_right\_corner, lower\_left\_corner)_.

<pre class="brush:js">window.onload = function () {
    //roundedRectangle(x, y, width, height, upper_left_corner, upper_right_corner, lower_right_corner, lower_left_corner)
    Raphael.fn.roundedRectangle = function (x, y, w, h, r1, r2, r3, r4){
        var array = [];
        array = array.concat(["M",x,r1+y, "Q",x,y, x+r1,y]); //A
        array = array.concat(["L",x+w-r2,y, "Q",x+w,y, x+w,y+r2]); //B
        array = array.concat(["L",x+w,y+h-r3, "Q",x+w,y+h, x+w-r3,y+h]); //C
        array = array.concat(["L",x+r4,y+h, "Q",x,y+h, x,y+h-r4, "Z"]); //D

        return this.path(array);
    };

    var paper = Raphael("canvas", 840, 480);

    paper.roundedRectangle(10, 10, 80, 80, 0, 10, 25, 5).attr({fill: "#f00"});
}</pre>

[Online example](http://jsdo.it/remmel/1qGu)

If you don&#8217;t want to use Raphael and you don&#8217;t want neither to understand how svg path is working, use this function to generate the path corresponding to the corner rounded rectangle:

<pre class="brush:js">function p(x,y){
  return x+" "+y+" ";
}

function rectangle(x, y, w, h, r1, r2, r3, r4){
  var strPath = "M"+p(x+r1,y); //A
  strPath+="L"+p(x+w-r2,y)+"Q"+p(x+w,y)+p(x+w,y+r2); //B
  strPath+="L"+p(x+w,y+h-r3)+"Q"+p(x+w,y+h)+p(x+w-r3,y+h); //C
  strPath+="L"+p(x+r4,y+h)+"Q"+p(x,y+h)+p(x,y+h-r4); //D
  strPath+="L"+p(x,y+r1)+"Q"+p(x,y)+p(x+r1,y); //A
  strPath+="Z";

  return strPath;
}</pre>