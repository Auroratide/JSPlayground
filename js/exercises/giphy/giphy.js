import $ from 'jquery';


class Giphy {

    constructor(options) {
        this.ui = {};

        this.ui.element = $(options.element);
        this.ui.searchInput = this.ui.element.find('input');
        this.ui.send = this.ui.element.find('button');

        // this.ui.search = this.ui.element.find('.search');
        // this.ui.random = this.ui.element.find('.random');
        // this.ui.anything = this.ui.element.find('.anything');

        this.init();
    }

    init() {
        const self = this;
        this.ui.send.on('click', function(event) {
            event.preventDefault();
            self.getGiphySearchData(self.ui.searchInput.val())
                .then(self.extractGiphyData)
                .then(self.showSearchGiphy);
            self.getGiphyRandomData()
                .then(self.extractRandomGiphyData)
                .then(self.showRandomGiphy);
            self.getGiphyTrendingData()
                .then(self.extractGiphyData)
                .then(self.showTrendingGiphy);

            // $.ajax({
            //    url: 'http://api.giphy.com/v1/gifs/search',
            //     data: {
            //        q: self.ui.searchInput.val(),
            //         limit: 1,
            //         api_key: 'dc6zaTOxFJmzC'
            //     },

            //     success: function(data) {

            //         self.ui.search.attr('src', data.data[0].images.original.url );

            //         $.ajax({
            //             url: 'http://api.giphy.com/v1/gifs/random',
            //             data: {
            //                 api_key: 'dc6zaTOxFJmzC',
            //                 limit: 1
            //             },
            //             success: function(data) {

            //                 self.ui.random.attr('src', data.data['image_url']);

            //                 $.ajax({
            //                     url: 'http://api.giphy.com/v1/gifs/trending',
            //                     data: {
            //                         limit: 1,
            //                         api_key: 'dc6zaTOxFJmzC',
            //                     },
            //                     success: function(data) {
            //                         self.ui.anything.attr('src', data.data[0].images.original.url);
            //                     }
            //                 });
            //             }
            //         });

            //     }
            // });
  
  });

}

  getGiphySearchData(input) {
      const promise = $.ajax({
          url: 'http://api.giphy.com/v1/gifs/search',
          data: {
            q: input,
            api_key: 'dc6zaTOxFJmzC',
            limit: 1
          }
      });
      return promise;
  }

  getGiphyRandomData() {
    const promise = $.ajax({
          url: 'http://api.giphy.com/v1/gifs/random',
          data: {
            api_key: 'dc6zaTOxFJmzC',
            limit: 1
          }
      });
    return promise;
  }

  getGiphyTrendingData() {
    const promise = $.ajax({
          url: 'http://api.giphy.com/v1/gifs/trending',
          data: {
            api_key: 'dc6zaTOxFJmzC',
            limit: 1
          }
      });
    return promise;
  }
  extractGiphyData(data){
    if(!data.data && ! data.data[0]) {
            throw 'Entry does not exist in giphy';
        }
        return data.data[0].images.original.url;
  }

  extractRandomGiphyData(data){
    if(!data.data) {
            throw 'Entry does not exist in giphy';
        }
        return data.data['image_url'];
  }

  showSearchGiphy(giphyEntry){
    const $search = $('.search');
    $search.attr('src', giphyEntry);
  }

  showRandomGiphy(giphyEntry){
    const $random = $('.random');
    $random.attr('src', giphyEntry);
  }

   showTrendingGiphy(giphyEntry){
    const $trending = $('.anything');
    $trending.attr('src', giphyEntry);
  }

}

export default Giphy;