(function($) {

    'use strict';

    $(document).ready(function() {
        // Initializes search overlay plugin.
        // Replace onSearchSubmit() and onKeyEnter() with 
        // your logic to perform a search and display results
        $(".list-view-wrapper").scrollbar();

        $('[data-pages="search"]').search({
            // Bind elements that are included inside search overlay
            searchField: '#overlay-search',
            closeButton: '.overlay-close',
            suggestions: '#overlay-suggestions',
            brand: '.brand',
            reSend: false,
             // Callback that will be run when you hit ENTER button on search box
            onSearchSubmit: function(searchString) {
                console.log("Search for: " + searchString);
            },
            // Callback that will be run whenever you enter a key into search box. 
            // Perform any live search here.  
            onKeyEnter: function(searchString) {
                if((searchString.length < 3 && this.reSend == false) || (searchString.length > 0 && this.reSend == true))
                    return;
                $('#search-loader').addClass('circle-loader-small');
                console.log("Live search for: " + searchString);
                var searchField = $('#overlay-search');
                var searchResults = $('.search-results');
                var self = this;
                /* 
                    Do AJAX call here to get search results
                    and update DOM and use the following block 
                    'searchResults.find('.result-name').each(function() {...}'
                    inside the AJAX callback to update the DOM
                */
                this.reSend = true;
                $.ajax({
                    url: '/search',
                    data: {'keyword':searchString},
                    type: 'POST',
                    success:function(data){
                      console.log(data);
                      var callback = new EJS({url: '/elements/search_card.ejs'}).render({data : data});
                      $('#search-ajax-div').html(callback);
                      $('#search-loader').removeClass('circle-loader-small');
                      self.reSend = false;
                      
                    },
                    error:function(err){
                        self.reSend = false;
                        console.error(err);
                    }
                });
                /*// Timeout is used for DEMO purpose only to simulate an AJAX call
                clearTimeout($.data(this, 'timer'));
                searchResults.fadeOut("fast"); // hide previously returned results until server returns new results
                var wait = setTimeout(function() {

                    searchResults.find('.result-name').each(function() {
                        if (searchField.val().length != 0) {
                            $(this).html(searchField.val());
                            searchResults.fadeIn("fast"); // reveal updated results
                        }
                    });
                }, 500);
                $(this).data('timer', wait);*/

            }
        })

    });

    
    $('.panel-collapse label').on('click', function(e){
        e.stopPropagation();
    });    
    
})(window.jQuery);