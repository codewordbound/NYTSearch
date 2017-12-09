

let api_key = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"; //api key
let searchTerm = "George Bush"; //search term
let beginDate =  "19950101"; //YYYYMMDD
let endDate = "19960101";
let numOfArticles = 5;
let articleCounter = 0;


function runQuery(numArticles, queryURL) {
            $.ajax({
                      url: queryURL,
                      method: 'GET',
                    }).done(function(result) {
                      console.log(result);
                      //$('#topArticles').html(JSON.stringify(result));


                      for (var i = 0; i < numOfArticles; i++) {

                        // Add to the Article Counter (to make sure we show the right number)
                        articleCounter++;

                        // Create the HTML well (section) and add the article content for each
                        var topArticles = $("<div>");
                        topArticles.addClass("well");
                        topArticles.attr("id", "article-well-" + articleCounter);
                        $("#topArticles").append(topArticles);

                        // Confirm that the specific JSON for the article isn't missing any details
                        // If the article has a headline include the headline in the HTML
                        if (result.response.docs[i].headline !== "null") {
                          $("#article-well-" + articleCounter)
                            .append(
                              "<h3 class='articleHeadline'><span class='label label-primary'>" +
                              articleCounter + "</span><strong> " +
                              result.response.docs[i].headline.main + "</strong></h3>"
                            );

                          // Log the first article's headline to console
                          console.log(result.response.docs[i].headline.main);
                        }

                        // If the article has a byline include the headline in the HTML
                        if (result.response.docs[i].byline && result.response.docs[i].byline.original) {
                          $("#article-well-" + articleCounter)
                            .append("<h5>" + result.response.docs[i].byline.original + "</h5>");

                          // Log the first article's Author to console.
                          console.log(result.response.docs[i].byline.original);
                        }

                        // Then display the remaining fields in the HTML (Section Name, Date, URL)
                        $("#article-well-" + articleCounter)
                          .append("<h5>Section: " + result.response.docs[i].section_name + "</h5>");
                        $("#article-well-" + articleCounter)
                          .append("<h5>" + result.response.docs[i].pub_date + "</h5>");
                        $("#article-well-" + articleCounter)
                          .append(
                            "<a href='" + result.response.docs[i].web_url + "'>" +
                            result.response.docs[i].web_url + "</a>"
                          );

                        // Log the remaining fields to console as well
                        console.log(result.response.docs[i].pub_date);
                        console.log(result.response.docs[i].section_name);
                        console.log(result.response.docs[i].web_url);
                      }
                    }).fail(function(err) {
                      throw err;
                    });
}

$("#run-search").on("click", function(event) {

    event.preventDefault();

    $("#topArticles").empty();

    searchTerm = $('#searchTerm').val().trim(); //search term
    beginDate =  $('#startYear').val().trim(); //YYYYMMDD
    endDate = $('#endYear').val().trim();
    numOfArticles = $('#numRecord').val();

    // if (parseInt(beginDate)) {
    //   url = url + "&begin_date=" + beginDate + "0101";
    // }
    //
    //
    // if (parseInt(endDate)) {
    //   url = url + "&end_date=" + endDate + "0101";
    // }
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    url += '?' + $.param({
      'api-key': api_key,
      'q': searchTerm,
      'begin_date': beginDate = beginDate + "0101",
      'end_date': endDate = endDate + "0101",
      'sort': "newest"

    });

    runQuery(numOfArticles, url);

});

$("#run-clear").on("click", function(event) {

  articleCounter = 0;
  $("#topArticles").empty();

});
