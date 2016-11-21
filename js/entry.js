import $ from 'jquery';
import Multiplier from './lessons/multiplier/multiplier';
import EmailValidator from './exercises/emailValidator/emailValidator';
import Promises from './lessons/promises/promises';

$(document).ready(() => {
  Multiplier.setup();
  EmailValidator.setup();

  new Promises({
    element: '.gravatar-show',
    dialogTemplate: '#dialog-template'
  });

});
