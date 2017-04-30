var photoContainer = document.getElementById('photo-container');



var urls = [
 "../images/engagement/fave1.jpg",
 "../images/engagement/FAVE3.jpg",
 "../images/engagement/fave2.jpg",
 "../images/engagement/betterone.jpg"   
]

for(var i in urls) {

    //create div for sizing
    var photoDiv = document.createElement('div');
        photoDiv.className="col-xs-12";
        photoDiv.className="col-sm-6";
        photoDiv.className="col-md-3";

    //create a link tag
    var photoA = document.createElement('a');
    photoA.className="thumbnail";
    photoA.setAttribute('data-toggle', "modal");
    photoA.setAttribute('data-target', "#myModal");

    //use let for block specific scope.
    let path = urls[i];

    photoA.addEventListener("click", function(){
        console.log(path + " clicked");
        document.getElementById('modal-image').src = path;
    });


    //create an image with url at the current index
    var photoImg = document.createElement('img');
    photoImg.src=urls[i];

    //append the objects to the container
    photoA.appendChild(photoImg);
    photoDiv.appendChild(photoA);
    photoContainer.appendChild(photoDiv);

    
}


