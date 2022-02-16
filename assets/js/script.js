//global variable to be used later
var tableId = 9;
function userInput(define, task, link) {
    this.DefineLabel = define;
    this.TaskList = task;
    this.APILink = link;
}
//ADD ROW TO TABLE FUNCTIONS
$(".add_another").click(function (event) {
    event.preventDefault;
    $(".tbody").append(
        `<tr class="tr" id="${tableId}">
        <td class="pt-3-half" contenteditable="true" id="define"></td>
        <td class="pt-3-half" contenteditable="true" id="task"></td>
        <td class="pt-3-half" contenteditable="true" id="link"></td>
        </tr>`
    );
    tableId++;

});

//LOCAL STORAGE FUNCTIONS ON SAVE BUTTON
//1. TABLE BODY INPUT
$(".save-btn").on("click", function () {

    function userInput(define, task, link) {
        this.firstColumn = define;
        this.TaskList = task;
        this.APILink = link;
    }

    var arr = [];
    $(".tbody")
        .find("tr")
        .each(function (index, item) {
            var define = $(item).find("td").eq(0).text();
            var task = $(item).find("td").eq(1).text();
            var link = $(item).find("td").eq(2).text();
            arr.push(new userInput(define, task, link));
        });

    localStorage.setItem("userInput", JSON.stringify(arr));
});

// //PREVENT INPUT CLEAR ON PAGE REFRESH
var arr2 = [];
function getInputs() {
    var getLocal = localStorage.getItem("userInput");
    arr2 = JSON.parse(getLocal);
    // console.log(arr2);
    $(".tbody")
        .find("tr")
        .each(function (index, item) {
            $(item).find("td").eq(0).text(arr2[index].firstColumn);
            $(item).find("td").eq(1).text(arr2[index].TaskList);
            $(item).find("td").eq(2).text(arr2[index].APILink);
        });
};

// getinputs is for page load, local storage to the initial 8 rows
getInputs();

// this if statement will load added rows on page load, if they exist in local storage
if (arr2.length > 8) {
    for (var i = 8; i < arr2.length++; i++) {
        $(".tbody").append(
        `<tr class="tr" id="${i++}">
        <td class="pt-3-half" contenteditable="true" id="define"></td>
        <td class="pt-3-half" contenteditable="true" id="task"></td>
        <td class="pt-3-half" contenteditable="true" id="link"></td>
        </tr>`
        );
    };
    getInputs();
};


//GOGGLE API
$("#sendGoogle").on('click', function(event) {
    event.preventDefault;
    var searchInput = $("#inputGoogle").val();

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
        // need to empty the past search results if there are any
        $("#googleResult").empty();

        // add the result count and time
        $("#googleResult").append(function() {
            return `<div class="row text-grey" id="googleInfo">About ${data.searchInformation.formattedTotalResults} results (${data.searchInformation.formattedSearchTime} seconds)</div>`
        });

        // looping over the first 10 results from the search
        for (var i = 0; i < 10; i++) {
            // creating an easier to use variable for the one result that we are looking at
            var result = data.items[i];

            // this appends the results to that id
            $("#googleResult").append(function() {
                return `<div class="row display-block result-box text-black bg-white" id="result${0}">
                    <h5 class="text-info small">
                        ${result.displayLink}
                    </h5>
                    <h4>
                        <span data-toggle="modal" data-target="#viewGoogleModal"><a target="_blank" href="${result.link}">${result.htmlTitle}</a></span>
                    </h4>
                    <p>
                        ${result.htmlSnippet}
                    </p>
                </div>`
            });
        }
    })
    .catch(console.error);
});

//YOUTUBE API
$('#sendYoutube').on('click', function (event) {
    event.preventDefault;
    var searchInput = $("#inputYoutube").val();

    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+searchInput+"&key=AIzaSyCLYNdBi4AZz2fvgLA6cw8cEhl88E-oCps")
    .then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })

    .then(data => {
        // need to empty the past search results if there are any
        $("#youtubeResult").empty();

        // add the result count and time
        $("#youtubeResult").append(function() {
            return `<div class="row text-grey" id="youtubeInfo">Showing Top 10 Relevant Results</div>`
        });

        // looping over the first 10 results from the search
        for (var i = 0; i < 10; i++) {
            // creating an easier to use variable for the one result that we are looking at
            var result = data.items[i];

            // grabbing the date video was created and slicing off the time from the end of it
            var dateString = result.snippet.publishedAt;
            var dateCreated = dateString.slice(0, 10);

            // this appends the results to that id
            $("#youtubeResult").append(function() {
                return `<div class="row result-box text-black bg-white" id="result${0}">
                    <div class="display-flex">
                        <div>
                            <button type="button" class="btn-link video-btn bg-white" data-toggle="modal" data-target="#playYoutubeModal" style="border: none;" data-content="https://www.youtube.com/embed/${result.id.videoId}"><img alt=${result.id.kind} src="${result.snippet.thumbnails.default.url}"></button>
                        </div>
                        <div>
                            <h5 class="">
                                <button type="button" class="btn-link video-btn bg-white" data-toggle="modal" data-target="#playYoutubeModal" style="border: none;" data-content="https://www.youtube.com/embed/${result.id.videoId}">${result.snippet.title}</button>
                            </h5>
                            <div class="text-primary">
                                <h5 class="small">Date Published: ${dateCreated}</h5>
                                <h5 class="small">${result.snippet.description}</h5>
                            </div>
                        </div>
                    <div>
                </div>`
            });
        }
    })
    .catch(console.error);
});

// when the modal is opened autoplay it  
$('#playYoutubeModal').on('shown.bs.modal', function (event) {
    // worked on this line with Jeff to make youtube videos play in modal popup
    $("#playVideo").attr('src',$(event.relatedTarget).attr('data-content') + "?autoplay=1&amp;modestbranding=1" ); 
})

$('#playYoutubeModal').on('hide.bs.modal', function (event) {
    // using this to stop playing video on close
    $("#video").attr('src',$(event.relatedTarget).attr('')); 
}) 