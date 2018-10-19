# Form Scriptleri
> Formlarda kullanılmak üzere yapılmış scriptler

## Validation
Form alanlarının belirtilen kurallara uygunluğunu kontrol eder. Kuralların tanımlanmasının iki yolu vardır.
- Html attribute'u olarak tanımlamak:
```html
<input type="text" name="email" validation="required|email" />
```
- Script koduna ayar olarak göndermek
```javascript
const form = document.getElementById('form1');
const form1Validation = validation;
form1Validation.validationRules = {
    email: {
        rules: [
            'required',
            'email'
        ]
    }
};
form1Validation.validate(form, (event) => {
    let form = event.target;
    alert('Form doğru');
});
```

## Mask
Form alanlarının belirtilen kurala uygun halde yazılmasını sağlar. Kullanımı için inputun mask attribute'üne uygun mask filtresi yazılmalıdır.
```html
<input type="tel" name="tel" mask="tel" />
```

## Loading Animation
Form gönderilirken gönder butonunun üzerine yükleme animasyonu çıkararak kullanıcıya beklemesi için geri bildirim yapan yardımcı araçtır.
```javascript
const form = document.getElementById('form1');
formLoadingAnimation.init(form);
// Ajax
util.ajax(form.getAttribute('action'), {
    method: 'POST',
    data: formData,
    responseType: 'json',
    beforeSend: () => {
        formLoadingAnimation.add();
    }
}).then((xhr) => {
    if (xhr.response.success === 0) {
        modal.dialog("E-posta adresiniz sistemimizde kayıtlı.");
    } else {
        modal.dialog("Teşekkürler.");
    }
    formLoadingAnimation.remove();
});
```

## Hepsinin Bir Arada Kullanımı
```javascript
import validation from 'validation';
import modal from '../../modal/scripts/modal';
import formLoadingAnimation from 'loading-animation';
import 'mask';

const form1 = document.getElementById('form1');
const form1Validation = validation;
form1Validation.addLabelClass('uk-flex uk-flex-center uk-margin-small');
form1Validation.validate(form1, (event) => {
    let form = event.target;

    let formData = new FormData(form);

    formLoadingAnimation.init(form);
    // Ajax
    util.ajax(form.getAttribute('action'), {
        method: 'POST',
        data: formData,
        responseType: 'json',
        beforeSend: () => {
            formLoadingAnimation.add();
        }
    }).then((xhr) => {
        if (xhr.response.success === 0) {
            modal.dialog("E-posta adresiniz sistemimizde kayıtlı.");
        } else {
            modal.dialog("Teşekkürler.");
        }
        formLoadingAnimation.remove();
    });
});
```