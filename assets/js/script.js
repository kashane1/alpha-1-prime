$("#sendSearch").on('click', function(event) {
    event.preventDefault;
    var searchInput = $("#inputGoogle").val();
    console.log(searchInput);

    fetch("https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyDgLwR0nvp94v9yFrzBQOTbaERziTLQ9mM&cx=7725374fca0735be0&q="+searchInput)
    .then(response => {
        // error checking the response
        if (!response.ok) {
            throw response;
        }
        // then returning the response in .json() format, which makes it an object
        return response.json();
    })

    .then(data => {
        // this console.log is to check the data and read it all to find out what I want to add to the page
        console.log(data);

        // empty past search results if there are any
        $("#searchResults").empty();

        // add the result count and time
        $("#searchResults").append(function() {
            return `<div class="row text-grey" id="searchInfo">About ${data.searchInformation.formattedTotalResults} results (${data.searchInformation.formattedSearchTime} seconds)</div>`
        });

        // looping over the first 10 results from the search
        for (var i = 0; i < 10; i++) {
            // creating an easier to use variable for the one result that we are looking at
            var result = data.items[i];

            // this appends the results to that id
            $("#searchResults").append(function() {
                return `<div class="row result-box text-black bg-light" id="result${0}">
                    <h5 class="text-info small">
                        ${result.displayLink}
                    </h5>
                    <h4>
                        <a href="${result.link}">${result.htmlTitle}</a>
                    </h4>
                    <p>
                        ${result.htmlSnippet}
                    </p>
                </div>`
            });
        }
    })

});


