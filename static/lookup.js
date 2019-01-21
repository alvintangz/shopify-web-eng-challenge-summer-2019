/*
 * Searches the data from the Toronto Waste Wizard. Requires the jQuery library and a #templateItemTWL mustache
 * template.
 * Author: Alvin Tang
 * Created: 2019-01-19
 * Last updated: 2019-01-21
*/

// Toronto Waste Wizard Lookup Data in a URI with Content-Type as application/json;charset=UTF-8
// RULE: The data must be taken from the Waste Wizard Lookup data (JSON).
// RULE: Typing in the search field should NOT perform an API call.
var dataURI = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
// Messages
var messages = {
    // When there are no results
    "noResults": "<p>There are no results pertaining to your search.</p>",
    // When there are no favourites
    "noFavourites": "<p>You have no items in your favourites. Search an item first and click on a star to save it in your favourites.</p>",
    // When search bar is empty
    "searchEmpty": "<p>Save the planet! Enter an item in the search bar to find out how it should be disposed of.</p>",
};
// All the data
var TWWLData;

// Function that loads each item in the TWW
function loadItem(item, target, star) {
    var template = $('#templateItemTWL').html();
    Mustache.parse(template);
    // Decode body
    var decodedBody = $('<div>').html(item.body).text();
    // Active class - default is empty
    var activeStar = "";
    // Green star for those favourited
    if(star) {
        activeStar = " star-active";
    }
    var rendered = Mustache.render(template, {active: activeStar, title: item.title, body: decodedBody});
    target.append(rendered);
}

// When the document is ready
$(document).ready(function() {

    // Add message when search bar is empty
    $("#results > .list-TWL-items-container").html(messages["searchEmpty"]);

    // Loading: Hide loading message and show main content
    $("#loading").hide();
    $("main").show();

    // Load all the data from the Toronto Waste Wizard ONLY once
    $.getJSON(dataURI, function(data){
        TWWLData = data;
    });

    // Load saved favourites in local storage
    var savedFav = JSON.parse(localStorage.getItem("favourites"));

    // If there are saved favourites
    if(savedFav) {
        if(savedFav.length == 0) {
            $("#favourites .list-TWL-items-container").html(messages["noFavourites"]);
        }
        // Loop through each item in the Toronto Waste Wizard Data
        $.each(savedFav, function(index, itemTitle){
            // If list of favourites doesn't already exist
            if(!$('ul#favouritesTWL').length) {
                // Define a list of favourits
                var ulFavTWL = "<ul id=\"favouritesTWL\" class=\"list-TWL-items\"></ul>";
                $("#favourites > .list-TWL-items-container").html(ulFavTWL);
            }

            // Load current item in results
            $.getJSON(dataURI, function(data){
                $.each(data, function(index, item){
                    if(item.title == itemTitle) {
                        loadItem(item, $("ul#favouritesTWL"), true);
                    }
                });
            });
        });
    } else {
        $("#favourites .list-TWL-items-container").html(messages["noFavourites"]);
    }

    // On submission of the search form
    // RULE: A search must be performed when hitting enter or clicking the search button.
    $("#searchTWL").submit(function(form){

        // Prevent default action by browser after form is submitted
        form.preventDefault();

        // The search input
        var searchInput = $("#searchTWL input[name=search]").val();

        // If list of results already exists
        if($('ul#resultsTWL').length) {
            // Delete list
            $("ul#resultsTWL").remove();
        }

        // Add no results message by default, will be overwritten if there are results
        $("#results > .list-TWL-items-container").html(messages["noResults"]);

        // Loop through each item in the Toronto Waste Wizard Data
        $.each(TWWLData, function(indexA, item){
            // If the current item's keyword is in the search input
            if(item.keywords.includes(searchInput)) {
                // If list of results doesn't already exist
                if(!$('ul#resultsTWL').length) {
                    // Define a list of results
                    var ulResultsTWL = "<ul id=\"resultsTWL\" class=\"list-TWL-items\"></ul>";
                    $("#results > .list-TWL-items-container").html(ulResultsTWL);
                }
                
                // Refresh saved favourites in local storage
                savedFav = JSON.parse(localStorage.getItem("favourites"));

                // Load current item in results
                $.getJSON(dataURI, function(data){
                    $.each(data, function(index, item){
                        if(item.title == itemTitle) {
                            loadItem(item, $("ul#favouritesTWL"), true);
                        }
                    });
                });
                // Load current item in results
                loadItem(item, $("ul#resultsTWL"), false);
            }
        });
    });

   // Favourites
   $(".list-TWL-items-container").on("click", ".item-TWL .item-TWL-star .star-item", function() {
        // Refresh saved favourites in local storage
        savedFav = JSON.parse(localStorage.getItem("favourites"));
        // Item title
        var itemTitle = $(this).parent().parent().find(".item-TWL-title p").text();
        // If item is in favourites already, remove it
        if(savedFav) {
            if(savedFav.includes(itemTitle)) {
                var index = savedFav.indexOf(itemTitle);
                if(index > -1) {
                    savedFav.splice(index, 1);
                }
            } else {
                // Add to array
                savedFav.push(itemTitle);
            }
        } else {
            // Add to array
            savedFav = [itemTitle,];
        }
        // Make changes in local storage
        localStorage.setItem("favourites", JSON.stringify(savedFav));
        // Reset favourites listing
        $("#favourites .list-TWL-items-container").empty();
        if(savedFav.length == 0) {
            $("#favourites .list-TWL-items-container").html(messages["noFavourites"]);
        }
        // Loop through each item in the Toronto Waste Wizard Data
        $.each(savedFav, function(index, itemTitle){
            // If list of favourites doesn't already exist
            if(!$('ul#favouritesTWL').length) {
                // Define a list of favourites
                var ulFavTWL = "<ul id=\"favouritesTWL\" class=\"list-TWL-items\"></ul>";
                $("#favourites > .list-TWL-items-container").html(ulFavTWL);
            }

            // Load current item in results
            $.getJSON(dataURI, function(data){
                $.each(data, function(index, item){
                    if(item.title == itemTitle) {
                        loadItem(item, $("ul#favouritesTWL"), true);
                    }
                });
            });
        });
    });

    // On change of search input field
    $("#searchTWL input[name=search]").keyup(function() {
        // The search input
        var searchInput = $("#searchTWL input[name=search]").val();
        // If search input is empty
        // RULE: When the search input field is cleared, the list of results should also be cleared.
        if(searchInput == "") {
            // If list of results exists
            if($('ul#resultsTWL').length) {
                // Delete list
                $("ul#resultsTWL").remove();
            }
            // Add message when search bar is empty
            $("#results > .list-TWL-items-container").html(messages["searchEmpty"]);
        }
    });
});