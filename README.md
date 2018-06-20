# Uikit Starter - Webpack
> Uikit ile site geliştirmek için gerekli araçları bir araya toplar

##### Gerekli programlar ve paketler

[![Yarn Version][yarn-image]][yarn-url]

## Kurulum

```sh
yarn install
```

## Komutlar

```sh
yarn dev
```

Yazılan kodları sanal olarak derleyip tarayıcıda sanal adreste çalıştırır

```sh
yarn prod
```

Projeyi dist klasörüne derlenmiş şekilde çıktılar

```sh
yarn icon
```

/src/images/iconset klasöründeki svg dosyalarını uikit içine ekleyip uikit icon bileşeniyle kullanılabilecek hale 
getirir.

## Kullanılan Sistemler ve Teknolojiler

####Uikit [![Uikit][uikit-image]][uikit-url]

Web sitesi oluşturmak için gereken hemen hemen her şeye sahip front-end framework'üdür.

__Neden tercih edildi?__

Birçok gereksinimi tek çatı altında, uyumlu çalışacak şekilde toplaması, kolay müdahale edilebilmesi, tema oluşturmak 
için kullanılan sass ve less yapısına tam uyumlu olması, güncel front-end ihtiyaçlarına uygun olması sebepleriyle 
tercih edildi.

####Yarn [![Yarn Version][yarn-image]][yarn-url]

Paket yöneticisi

__Neden tercih edildi?__

Npm'den daha hızlı olduğu için tercih edildi.

####Webpack [![Webpack][webpack-image]][webpack-url]

Derlenmemiş asset dosyalarını derleyip tarayıcılar tarafından anlaşılabilir hale getiren paketleyicidir.

__Neden tercih edildi?__

Boyutunun küçük olması, node js yapısında kodlandığı ve ayarlandığı için hızlı olması, birçok mod eklenebilmesi,
sorunsuz çalışan sanal sunucu modülüne sahip olması, kullanılmayan bütün dosyaları hariç tutarak dist klasörünü
olabildiğince küçültmesi sebepleriyle tercih edildi.

#### Asset teknolojileri

__Less__ [![Less][less-image]][less-url]

__Pug__ [![Pug][pug-image]][pug-url]

__Babel ile ES6__ [![Bebel][babel-image]][babel-url]

###Öneriler

#### Css Standart Comment
```scss
/* ========================================================================
 Component: Name
========================================================================== */

// Name
// ========================================================================

/*
* Name
*/

/* Name */
```

#### Css Custom Comment
```scss
// Component Name --Page Name--
// ========================================================================
```
#### Css Responsive

```scss
@media screen and (max-width: 1199px) {}
@media screen and (max-width: 959px) {}
@media screen and (max-width: 639px) {}
```

#### Pug Standart Comment
```pug
// Component Name
```

# Yararlı Kaynaklar

#### Favicon Generator 
https://realfavicongenerator.net/

#### Font Include
https://typekit.com/

#### Font Generator
https://www.flaticon.com/font-face

#### Map Style
https://snazzymaps.com

#### Playground
http://paperjs.org

## Dizin Listesi

    ├── src
    │   ├── components
    │   │   └── ...
    │   ├── images                  # Resim dosyaları
    │   │   ├── icons               # Geri kalan svg ikonlar
    │   │   ├── iconset             # Uikit'e eklenecek svg ikonlar
    │   │   └──  *.jpg,*.png,*.gif
    │   ├── js                      # Dönüştürülecek js dosyaları
    │   │   └── theme.js
    │   ├── less                    # Dönüştürülecek less dosyaları
    │   │   └── theme.less
    │   ├── layouts                 # Düzen şemaları
    │   │   └── master.pug
    │   ├── pages                   # Dönüştürülecek pug dosyaları
    │   │   ├── index.pug
    │   │   ├── test.pug
    │   │   └── *.pug
    │   ├── videos                  # Video dosyaları
    │   │   └── *.mp4,*.webm
    ├── .gitignore
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── webpack.config.js
    └── yarn.lock

<!-- Markdown link & img dfn's -->
[yarn-image]: https://img.shields.io/badge/yarn-stable-2188b6.svg?longCache=true&style=flat-square
[yarn-url]: https://github.com/yarnpkg/yarn
[uikit-image]: https://img.shields.io/badge/uikit-3.0.0_rc_6-2395f2.svg?longCache=true&style=flat-square
[uikit-url]: https://getuikit.com/
[webpack-image]: https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600
[webpack-url]: https://webpack.js.org/
[less-image]: https://img.shields.io/badge/less-lastest-5d92b2.svg?longCache=true&style=flat-square
[less-url]: http://lesscss.org/
[pug-image]: https://img.shields.io/badge/pug-lastest-a86454.svg?longCache=true&style=flat-square
[pug-url]: https://pugjs.org/api/getting-started.html
[babel-image]: https://img.shields.io/badge/babel-lastest-f5da55.svg?longCache=true&style=flat-square
[babel-url]: http://babeljs.io/