//import UIkit from 'uikit';

'use strict';

let modal = class {
    static dialog(message) {
        UIkit.modal.dialog(`<p class='uk-padding'>${message}</p><button class="uk-modal-close-default" type="button" uk-close></button>`)
    }
};

exports.default = modal;
module.exports = exports['default'];