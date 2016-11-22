import $ from 'jquery';
import Multiplier from './lessons/multiplier/multiplier';
import EmailValidator from './exercises/emailValidator/emailValidator';
import Promises from './lessons/promises/promises';
import PromisesWithGiphy from './exercises/giphy/giphy';

$(document).ready(() => {
  Multiplier.setup();
  EmailValidator.setup();

  new Promises({
    element: '.gravatar-show',
    dialogTemplate: '#dialog-template'
  });

  new PromisesWithGiphy({
      element: '.giphy'
  });

});
