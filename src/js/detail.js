$(document).ready(function() {

search("");  //this calls the function after the DOM is loaded automtically


function search(searchTerm){
      console.log("in searchTerm");
       //this was comicVineAPI used with cards. Changed to movie api_key
       //with the correct fields
      let detailClick = $(location).attr('search').split('=')[1];
      let movieAPIBase = "https://api.themoviedb.org/3/movie/" + detailClick;
       console.log(movieAPIBase);
       let items = [];
       $.getJSON (movieAPIBase, {  //need to replace the query and fields with
                                   //the ones from the movie api
         api_key: "1129d2385edb99c86d346163cc650604",
         language: "en-us"
         //comment out rest of params for the id
         // sort_by: "popularity.desc",
         // include_adult: "false",
         // include_video: "false",
         // page: "1",
         // with_genres: "878"
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
          // $.each( data.results, function(i) {
            // console.log("in .each");
            console.log (data);
            console.log("title: " + data.title);

          // if (i < 6){    //we only want 6 boxes on the front page -
                         //if we do a random movie, will need to look
                         //at doing this a little different, but that can wait
            let divCard = document.createElement('div');
            divCard.className = "card";
            divCard.style = "width: 18rem";

            let divCardImage = document.createElement('img');
            divCardImage.className = "card-img-top";
            divCardImage.setAttribute('src', "https://image.tmdb.org/t/p/w500" + data.poster_path);
            divCardImage.setAttribute('style', 'size:30%');
            divCard.appendChild(divCardImage);

            divCardBody = document.createElement('div');
            divCardBody.className =  "card-body";

            let divH5 = document.createElement('h5');
            divH5.className="card-title";

            let divH5Text = document.createTextNode(data.title);
            divH5.appendChild(divH5Text);
            divCardBody.appendChild(divH5);

            let divP = document.createElement('p');
            divP.className="card-text";

            let divPText = document.createTextNode(data.overview);
            divP.appendChild(divPText);
            divCardBody.appendChild(divP);

            // divCard.appendChild(divCardBody);

            let divR = document.createElement('p');
            divR.className="card-text";

            let divRText = document.createTextNode(data.release_date);
            divR.appendChild(divRText);
            divCardBody.appendChild(divR);

            let divH = document.createElement('a');
            divH.setAttribute('href',data.homepage);
            divH.innerHTML = data.homepage;
            divH.className="card-text2";
            divCardBody.appendChild(divH);

            divCard.appendChild(divCardBody);

            let cardContainer = document.getElementById("cardContainer");
            divCardGroup.appendChild(divCard);
            cardContainer.appendChild(divCardGroup);
          // } //end-if

        // })
      })
      .fail(function() { //need to add something in case the call fails}
        let divFail = document.createElement('p');

        let divFailText = document.createTextNode("API Not Responding.  Please Refresh.");
        divFail.appendChild(divFailText);
        cardContainer.appendChild(divFail);
      });
    };
 })
