console.time('Loading plugins');

// require('time-require');

let gulp = require('gulp'),
  babel = require('gulp-babel'),
  plugins = require('gulp-load-plugins')(),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserSync = require('browser-sync'),
  merge = require('merge-stream'),
  chalk = require('chalk'),
  Server = require('karma').Server;

console.timeEnd('Loading plugins');

const config = {
  production: true
};

gulp.task('clean:build', () => {
  const del = require('del');

  del.sync(['build/'], { force: true });
  // return del(['build'], { force : true }, cb); this one fails so using the sync option
});

function bundler(entry) {
  let babelify = require('babelify'),
    watchify = require('watchify'),
    browserify = require('browserify');

  const globalShim = require('browserify-global-shim').configure({
    react: 'React',
    'react-dom': 'ReactDOM',
    'create-react-class': 'createReactClass',
    'prop-types': 'PropTypes',
    d3: 'd3'
  });
  const opts = {
    entries: entry, // Only need initial file, browserify finds the deps
    standalone: 'rd3', // enable the build to have UMD and expose window.rsc if no module system is used
    extensions: ['.jsx', '.js'],
    fullPaths: false
  };
  if (!config.production) {
    // opts.entries = watchEntry // building the demo
    opts.debug = true; // Gives us sourcemapping
    opts.cache = {}; // Requirement of watchify
    opts.packageCache = {}; // Requirement of watchify
    opts.fullPaths = true; // Requirement of watchify
  }

  const bundler = browserify(opts);

  bundler
    .external(['react', 'react-dom', 'd3']) // this informs browserify that when you see require("react") or require("d3") it will be available, trust me
    .transform('babelify', { presets: ['react', 'es2015'] }) // We want to convert JSX to normal javascript
    .transform(globalShim)
    ;

  return config.production ? bundler : watchify(bundler);
}

function compileJS(entry) {
  const w = bundler(entry);

  if (!config.production) {
    w.on('update', (e) => {
      const updateStart = Date.now();

      bundleShare(w);
      console.log('file changed %s', e);
    });
  }

  // called on completion of build
  w.on('time', (time) => {
    if (!config.production) {
      console.log('Bundle updated in %s ms', time);
      browserSync.reload();
    }
  })
  .on('error', console.error.bind(console));

  return bundleShare(w);
}

function bundleShare(b) {
  return b.bundle()
    .on('error', function (err) {
      console.log(chalk.red(err.toString()));
      this.emit('end');
    })
    .pipe(source('react-d3.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./build/public/js'));
}


const data = function () { return gulp.src('dist/public/data/*').pipe(gulp.dest('build/public/data')); };

const html = function () { return gulp.src('dist/public/*.html').pipe(gulp.dest('build/public')); };

gulp.task('copy', () => merge(data, html));

gulp.task('docs', ['clean:build'], () => merge(data(), html(), compileJS(['./docs/examples/main.js'])));

gulp.task('watch', ['clean:build', 'serve'], () => {
  config.production = false;
  compileJS(['./docs/examples/main.js']);
  gulp.watch('dist/public/data/*', [data()], reload);
  gulp.watch('dist/public/*.html', [html()], reload);
});

gulp.task('minified', ['clean:build'], () => {
  config.production = true;
  const gulpFilter = require('gulp-filter');
  const jsfilter = gulpFilter(['*.js']);
  return compileJS(['./src/index.js'])
    .pipe(jsfilter)
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('build/public/js'))
    ;
});


gulp.task('copymisc', (cb) => {
  // replacement for jsx --harmony -x jsx src build/cjs && jsx --harmony src build/cjs
  const npmAssets = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(babel({ presets: ['es2015', 'react'] }))
        .pipe(gulp.dest('build/cjs'));

  // replacement for cp *.md build/cjs && cp .npmignore build/cjs
  const misc = gulp.src(['*.md', '.npmignore'])
        .pipe(gulp.dest('build/cjs'));

  return merge(npmAssets, misc);
});


gulp.task('build', ['minified', 'docs']);

gulp.task('release', ['copymisc', 'minified'], (cb) => {
  const fs = require('fs');
  const Handlebars = require('handlebars');
  const path = require('path');

  const pkg = require(path.join(__dirname, 'package.json'));

  // replacement for node scripts/build.js
  const packageTemplate = fs.readFileSync(path.join(__dirname, 'dist/cjs/package.json')).toString();
  const template = Handlebars.compile(packageTemplate);
  const buildPackage = template({ pkg });
  try {
    JSON.parse(buildPackage);
  } catch (err) {
    console.error('package.json parse error: ', err);
    process.exit(1);
  }

  fs.writeFile(path.join(__dirname, 'build', 'cjs', 'package.json'), buildPackage, (err) => {
    if (err) console.log(err);
    else console.log('CJS package.json file rendered');
    cb();
  });
});

function reload(updateEvent, buildTime) {
  if (buildTime) {
    console.log('%s updated, bundle updated in %s ms', updateEvent, buildTime);
  } else {
    console.log('%s updated', updateEvent.path);
  }

  browserSync.reload();
}

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: ['build/public']
    },
    ui: {
      port: 9080
    },
    port: 4000,
    open: false
  });
});

gulp.task('test', (cb) => {
  const server = new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, cb);
  server.start();
});

gulp.task('tdd', (cb) => {
  console.log('Running TDD');
  const server = new Server({
    configFile: `${__dirname}/karma.conf.js`
  }, cb);
  server.start();
});

gulp.task('default', () => {
  console.log('gulp build       -> Build all');
  console.log('gulp docs        -> Build the docs folder');
  console.log('gulp watch       -> Watch for changes to src/**/*.js(x)?, dist/public/*.html, dist/public/data/*');
  // console.log("gulp minified    -> Compile the javascript with entry as src/index.js and create dist/public/js/react-d3.min.js");
  console.log('gulp release     -> Create a release for npm under build/cjs which can be pulished to npm');
  console.log('gulp clean:build -> Clean the build directory');
  console.log("gulp serve       -> Launch a web browser on localhost:4000 and server from 'build/public'");
  console.log('gulp test        -> Execute the tests once with config file karma.conf.js');
  console.log('gulp tdd         -> Execute the tests continuosly with config file karma.conf.js');
});
