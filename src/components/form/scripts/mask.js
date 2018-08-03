import maskInput from 'vanilla-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask.js';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import UIkit from 'uikit';

const util = UIkit.util;

//
// Elementler
const phones = document.querySelectorAll('[mask="tel"]');
const emails = document.querySelectorAll('[mask="email"]');
const creditcards = document.querySelectorAll('[mask="creditcard"]');
const dates = document.querySelectorAll('[mask="date"]');


//
// Masklar
let phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
let creditcardMark = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const dateMask = createAutoCorrectedDatePipe('dd/mm/yyyy');

util.each(phones, (e) => {
    if (util.isNode(e)) {
        maskInput({
            inputElement: e,
            mask: phoneMask
        });
    }
});

util.each(emails, (e) => {
    if (util.isNode(e)) {
        maskInput({
            inputElement: e,
            mask: emailMask
        });
    }
});

util.each(creditcards, (e) => {
    if (util.isNode(e)) {
        maskInput({
            inputElement: e,
            mask: creditcardMark
        });
    }
});

util.each(dates, (e) => {
    if (util.isNode(e)) {
        maskInput({
            inputElement: e,
            mask: dateMask
        });
    }
});