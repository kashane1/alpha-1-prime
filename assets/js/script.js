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
        // this console.log is to check the data and read it all to find out what I want to add to the page
        console.log(data);

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
                return `<div class="row result-box text-black bg-light" id="result${0}">
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
            return `<div class="row text-grey" id="youtubeInfo">Showing Top 5 Relevant Results</div>`
        });

        // looping over the first 10 results from the search
        for (var i = 0; i < 5; i++) {
            // creating an easier to use variable for the one result that we are looking at
            var result = data.items[i];

            // grabbing the date video was created and slicing off the time from the end of it
            var dateString = result.snippet.publishedAt;
            var dateCreated = dateString.slice(0, 10);

            // this appends the results to that id
            $("#youtubeResult").append(function() {
                return `<div class="row result-box text-black bg-light" id="result${0}">
                    <div class="display-flex">
                        <div>
                            <button type="button" class="btn-link video-btn" data-toggle="modal" data-target="#playYoutubeModal" style="border: none;" data-content="https://www.youtube.com/embed/${result.id.videoId}"><img alt=${result.id.kind} src="${result.snippet.thumbnails.default.url}"></button>
                        </div>
                        <div>
                            <h5 class="">
                                <button type="button" class="btn-link video-btn" data-toggle="modal" data-target="#playYoutubeModal" style="border: none;" data-content="https://www.youtube.com/embed/${result.id.videoId}">${result.snippet.title}</button>
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



// function googleLinkOpen(linkTest) {
//     console.log(linkTest);

//     $("#viewGoogle").append(function() {
        
//         return `<iframe width="1000" height="1000" src="${linkTest}" frameborder="0" allowfullscreen></iframe>`;
//     });

// }

// $(document).ajaxSuccess(function() {
//     $('a').on("click", function() {
//         console.log($(this));
//         $(this).modal();
//         return false;
//     });
// });

// // mayeb try
// // do an $.ajax() call, on success $('#modal').html(content)

// jQuery.ajax(${linkTest})

// function googleLinkOpen(linkTest) {
//     console.log(linkTest);
//     $.ajax(linkTest, function() {
//         $("#viewGoogle").append(function() {
//         })
//     });
    
//     $("#viewGoogle").append(function() {
        
//         return `<iframe width="1000" height="1000" src="${linkTest}" frameborder="0" allowfullscreen></iframe>`;
//     });

// }

// $("#googleResult").on('load', function(){
    
    
// });

// $("#youtubeResult").on('load', function(linkClicked){
//     $([a]).on("click", function(linkClicked) {
//         console.log(linkClicked)
//         return `
//         <iframe id="Geeks3" width="650" height="500"
//             src=
//             "${linkClicked}"
//             frameborder="0" allowfullscreen>
//         </iframe>
//         `
//     })
    
// });

// $("#").on("click", function() {
//     return `
//     <iframe id="Geeks3" width="650" height="500"
//         src=
//         "${linkClicked}"
//         frameborder="0" allowfullscreen>
//     </iframe>
//     `
// })



var videoSrc;  

// $("#youtubeResultModal").on('shown.bs.modal', function() {
//     $('.video-btn').click(function() {
//         videoSrc = $(this).data( "src" );
//     });
//     console.log(videoSrc);
// });

// $('.video-btn').click(function() {
//     videoSrc = $(this).data( "content" );
// });
// console.log(videoSrc);

// when the modal is opened autoplay it  
$('#playYoutubeModal').on('shown.bs.modal', function (event) {

    console.log($(event.relatedTarget).attr('data-content'));
    $("#playVideo").attr('src',$(event.relatedTarget).attr('data-content') + "?autoplay=1&amp;modestbranding=1" ); 
})

$('#playYoutubeModal').on('hide.bs.modal', function (event) {
    // using this to stop playing video on close
    $("#video").attr('src',$(event.relatedTarget).attr('data-content')); 
}) 