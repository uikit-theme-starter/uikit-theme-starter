# Favicon Generator 
    https://realfavicongenerator.net/

# Font Include
    https://typekit.com/

# Font Generator
    https://www.flaticon.com/font-face

# Fonticon Generator 
    node_modules/uikit/src/images/icons - Buraya svg leri kullanilacak isimler ile ekliyoruz.
    node_modules/uikit - Bu dosya dizininde sirasiyla
        npm install
        npm run compile
    yazip her komut sonrasi enter basiyoruz.
    node_modules/uikit/dist/js/uikit-icons.js & uikit.icons.min.js icerisine eklemis oldugumuz iconlari tanimliyor.
    UIkit de oldugu gibi uk-icon="icon-name" ile cagiriyoruz.

# Map Style
    https://snazzymaps.com

# Playground
    http://paperjs.org

# Css Standart Comment

    /* ========================================================================
     Component: Name
    ========================================================================== */

    // Name
    // ========================================================================

    /*
    * Name
    */

    /* Name */

# Css Custom Comment

    // Component Name --Page Name--
    // ========================================================================

# Css Responsive

    @media screen and (max-width: 1199px) {}

    @media screen and (max-width: 959px) {}

    @media screen and (max-width: 639px) {}

# Pug Standart Comment

    // Component Name

# Files

    -src
        -favicon
            favicon-file
        -fonts
            -font-name
                -font-type
                    font-file
        -images
            -component-name
                -page-name
                    images-file
                images-file
        -js
            js-file
        -pug
            -components
                -component-name
                    component-file
            -master
                master-file
            -pages
                -components
                    -component-name
                        component-page-file
                page-file
        -scss
            -components
                -component
                    component-file
            scss-file
    .gitignore
    gulpfile.js
    package.json
    README.md

