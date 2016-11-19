import $ from 'jquery';

import md5 from 'md5';

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Promises {

    constructor(options) {

        this.ui = {};

        this.ui.element = options.element;
        this.ui.input = this.ui.element.find('input');
        this.ui.button = this.ui.element.find('button');

        this.inputTemplate = options.dialogTemplate;

        this.init();
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
                    alert(cause.message);
                });
        });
    }

    getInput() {
        const input = $.Deferred();

        const $dialog = $(this.inputTemplate);

        const $body = $('body');

        $body.append($dialog);

        $body.one('click', 'button.submit', (event) => {
            event.preventDefault();
            input.resolve($('.email').val());
            $dialog.remove();
        });

        $body.one('click', 'button.cancel', (event) => {
            event.preventDefault();
            input.reject(new Error('User canceled'));
            $dialog.remove();
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
        const $image = $('<img>').attr('src', gravatarProfile.thumbnailUrl).attr('alt', gravatarProfile.preferredUsername);

        $('body').append($image);
    }
}

export default Promises;