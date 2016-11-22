import $ from 'jquery';


function identity(argument) {
    return argument;
}


class Giphy {

    constructor(options) {
        this.ui = {};

        this.ui.element = $(options.element);
        this.ui.searchInput = this.ui.element.find('input');
        this.ui.send = this.ui.element.find('button');

        this.ui.search = this.ui.element.find('.search');
        this.ui.random = this.ui.element.find('.random');
        this.ui.anything = this.ui.element.find('.anything');


        this.init();
    }

    init() {
        const self = this;
        this.ui.send.on('click', function(event) {
            event.preventDefault();

            let searchCall = self.executeSearchAjax(self.ui.searchInput.val());
            let randomCall = self.executeRandomAjax();
            let trendingCall = self.executeTrendAjax();

            $.when(searchCall, randomCall, trendingCall)
                .then((searchData, randomData, trendingData) => {
                    self.ui.search.attr('src', searchData.data[0].images.original.url );
                    self.ui.random.attr('src', randomData.data['image_url']);
                    self.ui.anything.attr('src', trendingData.data[0].images.original.url);
                });

        });
    }

    executeTrendAjax() {
        return $.ajax({
            url: 'http://api.giphy.com/v1/gifs/trending',
            data: {
                limit: 1,
                api_key: 'dc6zaTOxFJmzC',
            }
        }).then(identity);
    }

    executeRandomAjax() {
        return $.ajax({
            url: 'http://api.giphy.com/v1/gifs/random',
            data: {
                api_key: 'dc6zaTOxFJmzC',
                limit: 1
            }
        }).then(identity );
    }

    executeSearchAjax(searchInput) {
        return $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search',
            data: {
                q: searchInput,
                limit: 1,
                api_key: 'dc6zaTOxFJmzC'
            }
        }).then(identity);
    }


}

export default Giphy;