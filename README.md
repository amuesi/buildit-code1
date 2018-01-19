SafetyNet App
=============

todo

Version history
---------------

-   **0.0.1** WIP

Build
-----

- Node version:

        node -v
        
        v7.4.0

- Ionic version:

        ionic -v

		3.10.3
		3.12.0

- npm install

- Caveat: Remove the following from package.json and config.xml:

        "mx.ferreyra.callnumber": "~0.0.2"

- Install dependency:

         npm install pouchdb-find --save

- Run locally:

        ionic serve

- Animations
  Revert version in package.json to:

        "@angular/animations": "4.1.2"

- Build assets:

        ionic cordova resources

- Remove plugin:

        cordova plugin remove onesignal-cordova-plugin --save

- Remove image picker from package.json and config.xml:

        imagepicker

- Build for iOS:

        ionic build ios

- Open in Xcode


- One time install of cocapods

        https://cocoapods.org/
 
        brew install cocoapods                      

        pod setup                                   one time synch repo 
                                        
Execution
---------

Development environment
-----------------------

Improvements
------------

Technology
----------

Issues
------

Features
--------



[~/sb/vcs/SafetyNetApp] $ brew reinstall node --without-icu4c
==> Reinstalling node --without-icu4c
==> Downloading https://nodejs.org/dist/v8.6.0/node-v8.6.0.tar.xz
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/node/8.6.0 --without-npm
==> make install
==> Downloading https://registry.npmjs.org/npm/-/npm-5.3.0.tgz
######################################################################## 100.0%
==> node /private/tmp/node-20170927-22645-ms9xow/node-v8.6.0/npm_bootstrap/bin/npm-cli.js install -ddd --global --prefix=/usr/local/Cellar/node/8.6.0/libexec /Users/sarbjitbilling/Library/Cach
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
==> Summary
🍺  /usr/local/Cellar/node/8.6.0: 4,152 files, 54.2MB, built in 7 minutes 6 seconds
[~/sb/vcs/SafetyNetApp] $ 






https://github.com/ionic-team/ionic/issues/12849#issuecomment-328472880

ionic cordova plugin rm cordova-plugin-console