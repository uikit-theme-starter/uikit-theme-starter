### Authors
- Barış Karaderili
- Hakan Tezcan

## Icon Svg Generator 
Gulp çalıştırıldığında *"Yeni ikon eklendi"* uyarısı aldığınızda aşağıdaki komutları çalıştırın
```sh
cd node_modules/uikit
npm install
npm run compile
```
Ikon tanımlanması bittiğinde ikonlarımız uikit içerisine eklenmiş olacaktır.

Kulanmak için:
```pug
i.uk-icon(uk-icon="icon: ikon-adı")
```

##Öneriler

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
    │   └── theme
    │       ├── images                  # Resim dosyaları
    │       │   ├── icons               # Geri kalan svg ikonlar
    │       │   │   └── set             # Uikit'e eklenecek svg ikonlar
    │       │   └──  *.jpg,*.png,*.gif
    │       ├── videos                  # Video dosyaları
    │       │   └── *.mp4,*.webm
    │       ├── layouts                 # Düzen şemaları
    │       │   └── master.pug
    │       ├── pages                   # Dönüştürülecek pug dosyaları
    │       │   ├── index.pug
    │       │   ├── test.pug
    │       │   └── *.pug
    │       ├── theme.js                # Dönüştürülecek js dosyası
    │       ├── theme.scss              # Dönüştürülecek scss dosyası
    │       ├── uikit.scss              # Uikit ayar dosyası
    │       └── variables.scss          # Proje scss değişkenleri
    ├── .babelrc
    ├── .gitignore
    ├── package.json
    └── README.md