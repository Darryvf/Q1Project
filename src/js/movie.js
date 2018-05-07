$(document).ready(function() {

search("spider man");  //this calls the function after the DOM is loaded automtically

function search(searchTerm){
      console.log("in searchTerm");
       //this is comicVineAPI used with cards.  Needs to be changed to movie api_key
       //with the correct fields
       var comicVineAPI = "https://comicvine.gamespot.com/api/search/?json_callback=?";
       console.log(comicVineAPI);
       var items = [];
       $.getJSON (comicVineAPI, {  //need to replace the query and fields with
                                   //the ones from the movie api
         api_key: "05b4f8f5fda83cc6c9ff081e00bd78f0143e16ba",
         query: searchTerm,
         resources: "issue",
         limit: "10",
         field_list: "id,name,image,description, api_detail_url,issue_number",
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
           var divCardGroup = document.createElement('div');
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
            var divCard = document.createElement('div');
            divCard.className = "card";
            divCard.style = "width: 18rem";

            var divCardImage = document.createElement('img');
            divCardImage.className = "card-img-top";
            divCardImage.setAttribute('src', data.results[i].image.small_url);
            divCardImage.setAttribute('style', 'size:30%');
            divCard.appendChild(divCardImage);

            divCardBody = document.createElement('div');
            divCardBody.className =  "card-body";

            var divH5 = document.createElement('h5');
            divH5.className="card-title";

            var divH5Text = document.createTextNode(data.results[i].name);
            divH5.appendChild(divH5Text);
            divCardBody.appendChild(divH5);

            var divP = document.createElement('p');
            divP.className="card-text";

            var divPText = document.createTextNode(data.results[i].description);
            divP.appendChild(divPText);
            divCardBody.appendChild(divP);

            divCard.appendChild(divCardBody);

            var cardContainer = document.getElementById("cardContainer");
            divCardGroup.appendChild(divCard);
            cardContainer.appendChild(divCardGroup);
          } //end-if

        })
      })
      .fail(function() { //need to add something in case the call fails}
        var divFail = document.createElement('p');

        var divFailText = document.createTextNode("API Not Responding.  Please Refresh.");
        divFail.appendChild(divFailText);
        cardContainer.appendChild(divFail);
      });
    };
 })
