import $ from 'jquery';
import md5 from 'md5';

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Promises {

    constructor(options) {
        this.options = options;
        this.buildInterface();
        this.init();
    }

    buildInterface() {
      this.ui = {};

      this.ui.element = this.options.element;
      this.ui.button = this.ui.element.find('button');
    }

    init() {
        this.ui.button.on('click', (event) => {
            event.preventDefault();
            this.getInput()
                .then(this.validateInput)
                .then(this.generateGravatarProfileUrl)
                .then(this.requestGravatar)
                .then(this.extractGravatarEntry)
                .then(this.showGravatar)
                .fail((cause) => {
                  const message = cause.message || cause;
                  alert(message);
                });
        });
    }

    getInput() {
        const input = $.Deferred();

        const $dialog = $(this.options.dialogTemplate);

        const $body = $('body');

        $body.append($dialog);

        $(() => {
          $dialog.one('click', 'button.submit', (event) => {
              event.preventDefault();
              input.resolve($('.email').val());
              $dialog.remove();
          });

          $dialog.one('click', 'button.cancel', (event) => {
              event.preventDefault();
              input.reject(new Error('User canceled'));
              $dialog.remove();
          });

        });

        return input.promise();
    }

    validateInput(input) {
        if(!emailRegex.test(input)) {
            throw new Error(`${input} is not a valid email`);
        }

        return input;
    }

    generateGravatarProfileUrl(email) {
        return 'http://www.gravatar.com/' + md5(email) + '.json';
    }

    requestGravatar(gravatarUrl) {
        return $.ajax({
            url: gravatarUrl,
            jsonp: "callback",
            dataType: "jsonp",
            method: 'GET'
        });
    }

    extractGravatarEntry(data) {
        if(!data.entry && ! data.entry[0]) {
            throw 'Entry does not exist in gravatar';
        }

        return data.entry[0];
    }

    showGravatar(gravatarProfile) {
      const $image = $(
          `<div class=gravatar>
            <img src="${gravatarProfile.thumbnailUrl}">
            <p>
              ${gravatarProfile.preferredUsername}
            </p>
          </div>
        `);

        $('body').append($image);
    }
}

export default Promises;
