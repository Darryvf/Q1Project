$(document).ready(function() {

search("spider man");  //this calls the function after the DOM is loaded automtically

function search(searchTerm){
      console.log("in searchTerm");
       //this is comicVineAPI used with cards.  Needs to be changed to movie api_key
       //with the correct fields
      let movieAPI = "https://api.themoviedb.org/3/discover/movie/?callback=?"
       console.log(movieAPI);
       let items = [];
       $.getJSON (movieAPI, {  //need to replace the query and fields with
                                   //the ones from the movie api
         api_key: "1129d2385edb99c86d346163cc650604",
         query: searchTerm,
         // resources: "movie",
         limit: "10",
         results: "results,id,title,poster_path",
         format: "jsonp"
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
            console.log("name: " + data.results[i].name);

          if (i < 6){    //we only want 6 boxes on the front page -
                         //if we do a random movie, will need to look
                         //at doing this a little different, but that can wait
            let divCard = document.createElement('div');
            divCard.className = "card";
            divCard.style = "width: 18rem";

            let divCardImage = document.createElement('img');
            divCardImage.className = "card-img-top";
            divCardImage.setAttribute('src', data.results[i].image);
            divCardImage.setAttribute('style', 'size:30%');
            divCard.appendChild(divCardImage);

            divCardBody = document.createElement('div');
            divCardBody.className =  "card-body";

            let divH5 = document.createElement('h5');
            divH5.className="card-title";

            let divH5Text = document.createTextNode(data.results[i].name);
            divH5.appendChild(divH5Text);
            divCardBody.appendChild(divH5);

            let divP = document.createElement('p');
            divP.className="card-text";

            let divPText = document.createTextNode(data.results[i].description);
            divP.appendChild(divPText);
            divCardBody.appendChild(divP);

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
 })
