import validator from 'validator';
import UIkit from 'uikit';

const util = UIkit.util;
const forms = document.querySelectorAll('form');

util.each(forms, (form) => {
    if (util.isNode(form)) {
        let validations = form.querySelectorAll('[validation]');
        if (validations) {
            form.validation = {};
            util.each(validations, (control) => {
                if (util.isNode(control)) {
                    if (!util.hasAttr(control, 'name')) {
                        util.attr(control, 'name', `validation-${Math.random()}`);
                    }
                    let name = util.attr(control, 'name');
                    let validation = util.hasAttr(control, 'validation') ? control.getAttribute('validation').split('|') : [];
                    let validationMessage = util.hasAttr(control, 'validation-message') ? control.getAttribute('validation-message').split('|') : [];

                    validationMessage.forEach((e) => {
                        let p = e.split(':');
                        if (p[1]) {
                            validationMessage[p[0]] = p[1];
                        }
                    });

                    form.validation[name] = {'rules': validation, 'messages': validationMessage};
                }
            });
        }
    }
});

let validation = {
    locale: 'tr-TR',
    result: true,
    prevent: true,
    containerClass: '.control-container',
    labelClasses: ['uk-text-danger'],
    defaultErrors: {
        required: "Bu alan boş bırakılamaz",
        email: "E-posta adresi doğru girilmedi",
        max: "En fazla {#} karakter yazılabilir",
        min: "En az {#} karakter yazılabilir",
        tel: "Telefon numarası doğru girilmedi"
    },
    validationRules: {},
    addLabelClass(classString) {
        this.labelClasses.push(...classString.split(' '));
    },
    validate(form, cb = null) {
        if (form) {
            let result = this.result;
            if (cb && util.isFunction(cb)) {
                form.addEventListener('submit', (event) => {
                    if (this.validationControl(form)) {
                        result = cb(event);
                    }
                    if (this.prevent) event.preventDefault();
                });
            } else {
                this.validationControl(form);
            }

            return result;
        }
    },
    validationControl(form) {
        this.result = true;

        // Form validation set object element
        if (form.validation !== undefined) this.validationRules = form.validation;

        util.each(this.validationRules, (control, name) => {

            let controlElement = form.querySelector(`[name='${name}']`);

            if (!controlElement) {
                this.result = false;
                return this.result;
            }

            // Control container
            let container = util.closest(controlElement, this.containerClass);
            let controlContainer = container ? container : controlElement.parentElement;

            let errorLabel = controlContainer.querySelector(`label[for="${name}"]`);

            if (errorLabel === null) {
                // Creating error label
                errorLabel = document.createElement('label');

                errorLabel.setAttribute('for', name);
                errorLabel.classList.add(...this.labelClasses);

                // Adding in html dom
                controlContainer.appendChild(errorLabel);
            }
            errorLabel.innerHTML = '';

            for (let i = 0; i < control.rules.length; i++) {
                let rule = control.rules[i];
                let ruleType = rule.split(':')[0];
                let option = rule.split(':')[1];
                if (ruleType === 'required') {
                    if (this.requiredControl(controlElement)) {
                        this.writeError(errorLabel, ruleType, name);
                        break;
                    }
                } else if (ruleType === 'email') {
                    if (!this.emailControl(controlElement)) {
                        this.writeError(errorLabel, ruleType, name);
                        break;
                    }
                } else if (ruleType === 'max') {
                    if (!this.maxControl(controlElement, option)) {
                        this.writeError(errorLabel, ruleType, name);
                        break;
                    }
                } else if (ruleType === 'min') {
                    if (!this.minControl(controlElement, option)) {
                        this.writeError(errorLabel, ruleType, name);
                        break;
                    }
                } else if (ruleType === 'tel') {
                    if (!this.phoneControl(controlElement, option)) {
                        this.writeError(errorLabel, ruleType, name);
                        break;
                    }
                }
            }
        });
        return this.result;
    },
    writeError(label, rule, inputName) {
        label.innerHTML = this.validationRules[inputName].messages[rule] ? this.validationRules[inputName].messages[rule] : this.defaultErrors[rule];
        this.result = false;
    },
    emailControl(element) {
        return validator.isEmpty(element.value) ? true : validator.isEmail(element.value);
    },
    requiredControl(element) {
        return validator.isEmpty(element.value);
    },
    maxControl(element, max) {
        return element.value.length <= max;
    },
    minControl(element, min) {
        return element.value.length > min;
    },
    phoneControl(element) {
        return validator.isEmpty(element.value) ? true : validator.isMobilePhone(element.value.replace(/[^\d]/g, ''), [this.locale]);
    }
};

exports.default = validation;
module.exports = exports['default'];