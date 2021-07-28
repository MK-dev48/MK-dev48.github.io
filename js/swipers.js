 'use strict';

 var img = new Array(
                      "images/slide1.png",
                      "images/slide2.png",
                      "images/slide3.png",
 );
 var element = document.getElementById("slideshow");
 var links = document.getElementById("slidelink");
 var count = -1;
 imgTimer();

 function imgTimer(){
   count++;
   if(count == img.length) count = 0;


   element.src = img[count];


   if(count == 0){
   links.href = "infomations.html";
 } else if (count == 1) {
   links.href = "contents.html";
 }else if (count == 2) {
  links.href = "contact.html";
 }
 setTimeout("imgTimer()",7000);
 }
