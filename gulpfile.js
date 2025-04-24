const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-clean-css`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`app/html/index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`app/html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src(`app/css/style.css`)
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [{
                formatter: `string`,
                console: true
            }]
        }));
};

let compressCSS = () => {
    return src(`app/css/style.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`));
};

let validateJS = () => {
    return src(`app/js/app.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressJS = () => {
    return src(`app/js/app.js`)
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let transpileJSForDev = () => {
    return src(`app/js/app.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`app/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `temp`,
                `app`,
                `app/html`
            ]
        }
    });
    watch(`app/js/app.js`, series(jsLinter, transpileJSForDev))
        .on(`change`, reload);

    watch(`app/css/style.css`, compressCSS)
        .on(`change`, reload);

    watch(`app/html/index.html`, validateHTML)
        .on(`change`, reload);
};

let build = () => {
    compressHTML();
    compressCSS();
    transpileJSForProd();
};

//exports.default = build; does not work yet
exports.default = serve;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.compressJS = compressJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateHTML,
    validateCSS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);

