//
// Form submit loading fonksiyonları

let formLoadingAnimation = {
    submitText: '',
    submitElement: {},
    submitTypeButton: true,
    form: '',
    loadingText: "<div class='uk-icon uk-light' uk-spinner='ratio:.7'></div>",
    init(form) {
        this.submitElement = form.querySelector('[type="submit"]');
        this.submitTypeButton = this.submitElement.tagName === 'BUTTON';
        this.submitText = this.submitTypeButton ? this.submitElement.innerHTML : this.submitElement.value;
    },
    add() {
        this.submitElement.setAttribute('disabled', 'disabled');
        if (this.submitTypeButton) {
            this.submitElement.innerHTML = this.loadingText;
        } else {
            this.submitElement.value = this.loadingText;
        }
    },
    remove() {
        if (this.submitTypeButton) {
            this.submitElement.innerHTML = this.submitText;
        } else {
            this.submitElement.value = this.submitText;
        }
        this.submitElement.removeAttribute('disabled');
    }
};

exports.default = formLoadingAnimation;
module.exports = exports['default'];