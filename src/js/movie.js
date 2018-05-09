$(document).ready(function() {

landingPage("");  //this calls the function after the DOM is loaded automtically

function landingPage(){
      console.log("in landingPage");
       //this was comicVineAPI used with cards. Changed to movie api_key
       //with the correct fields
      let movieAPI = "https://api.themoviedb.org/3/discover/movie/?callback=?"
       console.log(movieAPI);
       let items = [];
       $.getJSON (movieAPI, {  //need to replace the query and fields with
                                   //the ones from the movie api
         api_key: "1129d2385edb99c86d346163cc650604",
         language: "en-us",
         sort_by: "popularity.desc",
         include_adult: "false",
         include_video: "false",
         page: "1",
         with_genres: "878"
       })


         .done(function( data ) {  //when we are done, do stuff with the data returned
           console.log("in .done");
           //need to look at the structure of the data returned so the fields
           //below in the cards can use the right data. Looking in the log
           //for this one shows how the structure of comicVineAPI is - change
           //the fields to use the movie API ones
           console.log(data);

           //create the cardGroup at the top "data" level
           let divCardGroup = document.createElement('div');
            divCardGroup.className = "card-deck";

          //for each row in data.results, create a card programmatically and
          //add it to the card group
          $.each( data.results, function(i) {
            console.log("in .each");
            console.log (data.results[i]);
            console.log("title: " + data.results[i].title);

          if (i < 8){    //we only want 6 boxes on the front page -
                         //if we do a random movie, will need to look
                         //at doing this a little different, but that can wait
            let divCard = document.createElement('div');
            divCard.className = "card";
            divCard.style = "width: 18rem";

            let divCardAnchor = document.createElement('a');
            divCardAnchor.setAttribute('href',"detail.html?movie_id=" + data.results[i].id);

            let divCardImage = document.createElement('img');
            divCardImage.className = "card-img-top";
            divCardImage.setAttribute('src', "https://image.tmdb.org/t/p/w780" + data.results[i].poster_path);
            divCardImage.setAttribute('style', 'size:30%');
            divCardAnchor.appendChild(divCardImage);
            divCard.appendChild(divCardAnchor);

            divCardBody = document.createElement('div');
            divCardBody.className =  "card-body";

            let divH5 = document.createElement('h5');
            divH5.className="card-title";

            let divH5Text = document.createTextNode(data.results[i].title);
            divH5.appendChild(divH5Text);
            divCardBody.appendChild(divH5);

            // let divP = document.createElement('p');
            // divP.className="card-text";

            // let divPText = document.createTextNode(data.results[i].overview);
            // divP.appendChild(divPText);
            // divCardBody.appendChild(divP);

            divCard.appendChild(divCardBody);

            let cardContainer = document.getElementById("cardContainer");
            divCardGroup.appendChild(divCard);
            cardContainer.appendChild(divCardGroup);
          } //end-if

        })
      })
      .fail(function() { //need to add something in case the call fails}
        let divFail = document.createElement('p');

        let divFailText = document.createTextNode("API Not Responding.  Please Refresh.");
        divFail.appendChild(divFailText);
        cardContainer.appendChild(divFail);
      });
    };
  function dropDownLinks(){
    $('#login').show();
    $('#search').hide();
  }
  $('#navbarSupportedContent').click(function(){
    console.log('in dropdown event');
    dropDownLinks();
  })
  $('#login').submit(function(event){
  let username = $('#user').val();
  console.log(user);
  storeName(username);
  event.preventDefault();
})
function storeName(name){
    localStorage.setItem('usernamekey', name);
    var tempName = localStorage.getItem('usernamekey');
    // updateName(tempName);
    // console.log('storage: ' + localStorage.getItem('usernamekey'));
}
 })
