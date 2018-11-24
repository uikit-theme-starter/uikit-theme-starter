# Uikit Starterkit
Uikit ile site geliştirmek için gerekli araçları bir araya toplar

# Kurulum

```sh
yarn install / npm install
```

## Komutlar

```sh
yarn dev / npm run dev
```
Yazılan kodları sanal olarak derleyip tarayıcıda sanal adreste çalıştırır

```sh
yarn prod / npm run prod
```
Projeyi dist klasörüne derlenmiş şekilde çıktılar

```sh
yarn icon / npm run icon
```
`/src/images/iconset` klasöründeki svg dosyalarını uikit içine ekleyip [Uikit Icon][uikit-icon-url] bileşeniyle kullanılabilecek hale 
getirir.

## Kullanılan Sistemler ve Teknolojiler

### Uikit [![Uikit][uikit-image]][uikit-url]

Web sitesi oluşturmak için gereken hemen hemen her şeye sahip front-end framework'üdür.

##### Neden tercih edildi?

Birçok gereksinimi tek çatı altında, uyumlu çalışacak şekilde toplaması, kolay müdahale edilebilmesi, tema oluşturmak 
için kullanılan sass ve less yapısına tam uyumlu olması, güncel front-end ihtiyaçlarına uygun olması sebepleriyle 
tercih edildi.

### Webpack [![Webpack][webpack-image]][webpack-url]

Derlenmemiş asset dosyalarını derleyip tarayıcılar tarafından anlaşılabilir hale getiren paketleyicidir.

##### Neden tercih edildi?

Boyutunun küçük olması, node js yapısında kodlandığı ve ayarlandığı için hızlı olması, birçok mod eklenebilmesi,
sorunsuz çalışan sanal sunucu modülüne sahip olması, kullanılmayan bütün dosyaları hariç tutarak dist klasörünü
olabildiğince küçültmesi sebepleriyle tercih edildi.

### Desteklenen teknolojiler

[Less][less-url], [Sass][sass-url], [Pug][pug-url], [Babel ile ES6][babel-url]

Bunların dışında standart css, html ve js de kullanılabilir

## Öneriler

#### Css Yorum Standardı
```less
/* ========================================================================
 Component: [Component Name]
========================================================================== */

// [Function Name]
// ========================================================================

/*
* Comment
*/

/* Short Comment */

// Component Name --Page Name--
// ========================================================================
```
#### Css Responsive İçin Kullanılacak Standart Media Değerleri

```less
@media screen and (max-width: 1199px) {} // Window
@media screen and (max-width: 959px) {} // Laptop
@media screen and (max-width: 639px) {} // Mobile
```

#### Pug Yorum Standardı
```pug
// Component Name
```

## Yararlı Kaynaklar

| İsim | Link |
| ------ | ------ |
| Favicon Generator | [https://realfavicongenerator.net/](https://realfavicongenerator.net/) |
| Font Generator | [https://www.flaticon.com/font-face](https://www.flaticon.com/font-face) |
| Map Style | [https://snazzymaps.com](https://snazzymaps.com) |
| Playground | [http://paperjs.org](http://paperjs.org) |

### Dizin Listesi

    ├── src
    │   ├── css                     # Ana css, less, sass dosyaları
    │   │   ├── theme.less
    │   │   └── *.less,*.sass,*.css
    │   ├── files    
    │   │   ├── media               # Video ve ses dosyaları
    │   │   │   └── *.mp4,*.mov,*.webm,*.ogg,*.flac
    │   │   └── docs                # Dokümanlar
    │   │       └── *.pdf,*.doc,*.docx,*.xls
    │   ├── fonts                   # Font dosyaları
    │   │   └── *.woff,*.woff2,*.eot,*.ttf,*.otf
    │   ├── images                  # Resim dosyaları
    │   │   ├── icons               # Geri kalan ikonlar
    │   │   ├── iconset             # Uikit'e eklenecek svg ikonlar
    │   │   └──  *.jpg,*.png,*.gif
    │   ├── js                      # Ana js dosyaları
    │   │   └── theme.js
    │   └── templates
    │       ├── components          # Uikit componentleri, ayarları
    │       │   └── ...
    │       ├── layouts             # Düzen şemaları
    │       │   └── master.pug
    │       └── pages               # Ana pug, html dosyaları
    │           ├── index.pug
    │           ├── test.pug
    │           └── *.pug, *.html
    ├── webpack
    │   ├── config                  # Webpack ayar dosyaları
    │   │   ├── postcss.config.js
    │   │   ├── webpack.dev.js
    │   │   ├── webpack.icon.js
    │   │   └── webpack.prod.js
    │   ├── html-add-functions      # Html output için kullanılan ayarlar
    │   │   ├── create-plugin.js
    │   │   └── pug-files.json      # Not: Dosya bulamama hatası olursa bu dosyanın içeriğini `{"files":[]}` olarak güncelleyin 
    │   ├── server                  # Development sunucusu ayarları
    │   │   ├── client.js
    │   │   ├── express.js
    │   │   ├── hotreloader.js
    │   │   └── main.js
    │   └── icon.js
    ├── .gitignore
    ├── package.json
    └── README.md

[yarn-image]: https://img.shields.io/badge/yarn-stable-2188b6.svg?longCache=true&style=flat-square
[yarn-url]: https://github.com/yarnpkg/yarn
[uikit-image]: https://img.shields.io/badge/uikit-lastest-2395f2.svg?longCache=true&style=flat-square
[uikit-url]: https://getuikit.com/
[webpack-image]: https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600
[webpack-url]: https://webpack.js.org/
[less-url]: http://lesscss.org/
[sass-url]: https://sass-lang.com
[pug-url]: https://pugjs.org/api/getting-started.html
[babel-url]: http://babeljs.io/
[uikit-icon-url]: https://getuikit.com/docs/icon
