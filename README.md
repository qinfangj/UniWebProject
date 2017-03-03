# UHTS LIMS

### Directory Layout

```shell
.
├── components/                # Shared or generic UI components
│   ├── actions/               # Redux actions (creators, reducers)
│   ├── Layout/                # Website layout component (header, footer, sidebar)
│   ├── forms/                 # Data management forms (insert, update, etc.)
│   ├── login/                 # Login, signup, etc. 
│   ├── pages/                 # Particular pages
│   ├── routes/                # Route components (directly tied to a route in "/routes.js")
│   ├── tables/                # Data tables
│   └── ...                    # etc.
├── core/                      # Core framework
│   └── store.js               # Application state manager (Redux)
├── node_modules/              # 3rd-party libraries and utilities
├── public/                    # Static files such as favicon.ico etc.
│   ├── dist/                  # The folder for compiled output
│   ├── favicon.ico            # Application icon to be displayed in bookmarks
│   ├── robots.txt             # Instructions for search engine crawlers
│   ├── conf/conf.js           # The main configuration file, to set e.g. BACKEND_URL
│   └── ...                    # etc.
├── test/                      # Unit and integration tests
├── styles/                    # Global styles (constants, overrides, etc.) 
├── utils/                     # Utility and helper classes
│── main.js                    # React application entry point
│── package.json               # The list of project dependencies and NPM scripts
│── routes.js                  # The list of routes (react-router format)
│── run.js                     # Build automation script, e.g. `node run build`
└── webpack.config.js          # Bundling and optimization settings for Webpack
```


### Getting Started

Requirements:

* Node 6.1+ (js interpreter)
* Npm 4.1+ (node package manager)
* Ruby + Sass (to write sass)

The best way is to first install NVM (Node Version Manager) using the instructions here: 
https://github.com/creationix/nvm . 

Then to get the latest version of node: 
```
nvm install node
``` 

You can update npm using itself: 
```
sudo npm install npm -g
```

Finally, to install Sass, you will need Ruby and 
```
gem install sass
```

Then resolve all the js dependencies with npm:
```
npm install
```

### How to run (dev mode)

Build and launch your app using the development server by running:
```
node run start
```

The app should become available at [http://localhost:3000/](http://localhost:3000/).

You can also test your app in release (production) mode by running `node run start --release`.


### How to Test

(For when there will actually be tests...)

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ node run lint                  # Check JavaScript and CSS code for potential issues
$ node run test                  # Run unit tests. Or, `npm run test:watch`
$ node run test:watch            # Run tests, watching for changes in source code
```

### How to Build

```shell
$ node run build --release      # production build (minified)
$ node run build --debug        # dev build, don't minify-dedupe-merge
```

The compiled assets are created in `public/*`. Copy the content of this directory
to a location your server can expose, such as some /var/www/html or a DocumentRoot
in the Apache configuration:
```
cp -r public/* /var/www/html
```

### Configuration

The main app configuration, to set e.g. BACKEND_URL, is in `public/conf/conf.js`.
You will want to rewrite this file before serving the app in production.

Additional configuration, such as the page title, is on top of "/run.js".