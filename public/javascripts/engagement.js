var photoContainer = document.getElementById('photo-container');

var photoDiv = document.createElement('div');
photoDiv.className="col-xs-12";
photoDiv.className="col-sm-6";
photoDiv.clasName="col-md-3";

var urls = [
 "../images/engagement/fave1.jpg",
 "../images/engagement/fave2.jpg",
 "../images/engagement/FAVE3.jpg",
 "../images/engagement/betterone.jpg"   
]


var photoA = document.createElement('a');
photoA.className="thumbnail";
var photoImg = document.createElement('img');
photoImg.src=urls[0];


photoA.appendChild(photoImg);
photoDiv.appendChild(photoA);
photoContainer.appendChild(photoDiv);
