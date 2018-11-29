<h1 align="center">Uikit Starterkit</h1>

> Uikit ile site geliştirmek için gerekli araçları bir araya toplar

<h2 align="center">Kurulum</h2>

```sh
yarn install / npm install
```

<h2 align="center">Komutlar</h2>

```sh
yarn dev / npm run dev
```

> Yazılan kodları sanal olarak derleyip tarayıcıda sanal adreste çalıştırır

```sh
yarn prod / npm run prod
```

> Projeyi dist klasörüne derlenmiş şekilde çıktılar

```sh
yarn icon / npm run icon
```

> `/src/images/iconset` klasöründeki svg dosyalarını uikit içine ekleyip [Uikit Icon][uikit-icon-url] bileşeniyle kullanılabilecek hale 
getirir.

<h2 align="center">Kullanılan Sistemler ve Teknolojiler</h2>

<h3>Uikit [![Uikit][uikit-image]][uikit-url]</h3>

> Web sitesi oluşturmak için gereken hemen hemen her şeye sahip front-end framework'üdür.

<h5>Neden tercih edildi?</h5>

> Birçok gereksinimi tek çatı altında, uyumlu çalışacak şekilde toplaması, kolay müdahale edilebilmesi, tema oluşturmak 
için kullanılan sass ve less yapısına tam uyumlu olması, güncel front-end ihtiyaçlarına uygun olması sebepleriyle 
tercih edildi.

<h3>Webpack [![Webpack][webpack-image]][webpack-url]</h3>

> Derlenmemiş asset dosyalarını derleyip tarayıcılar tarafından anlaşılabilir hale getiren paketleyicidir.

<h5>Neden tercih edildi?</h5>

> Boyutunun küçük olması, node js yapısında kodlandığı ve ayarlandığı için hızlı olması, birçok mod eklenebilmesi,
sorunsuz çalışan sanal sunucu modülüne sahip olması, kullanılmayan bütün dosyaları hariç tutarak dist klasörünü
olabildiğince küçültmesi sebepleriyle tercih edildi.

<h3>Desteklenen teknolojiler</h3>

>  [Less][less-url], [Sass][sass-url], [Pug][pug-url], [Babel ile ES6][babel-url]
<br/>
> Bunların dışında standart css, html ve js de kullanılabilir

<h2>Öneriler</h2>

<h4>Css Yorum Standardı</h4>
```scss
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
<h4>Css Responsive İçin Kullanılacak Standart Media Değerleri</h4>

```scss
@media screen and (max-width: 1199px) {} // Window
@media screen and (max-width: 959px) {} // Laptop
@media screen and (max-width: 639px) {} // Mobile
```

<h4>Pug Yorum Standardı</h4>
```pug
// Component Name
```

<h2>Yararlı Kaynaklar</h2>

<table>
    <tr>
        <th align="left">Favicon Generator</th>
        <td align="left"><a href="https://realfavicongenerator.net/">https://realfavicongenerator.net/</a></td>
    </tr>
    <tr>
        <th align="left">Font Generator</th>
        <td align="left"><a href="https://www.flaticon.com/font-face">https://www.flaticon.com/font-face</a></td>
    </tr>
    <tr>
        <th align="left">Map Style</th>
        <td align="left"><a href="https://snazzymaps.com">https://snazzymaps.com</a></td>
    </tr>
    <tr>
        <th align="left">Playground</th>
        <td align="left"><a href="http://paperjs.org">http://paperjs.org</a></td>
    </tr>    
</table>

<h3>Dizin Listesi</h3>

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

<!-- Markdown link & img dfn's -->
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
