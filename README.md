# click-shortcut

Robot js requires some special binary setup
https://github.com/octalmage/robotjs/issues/466
npm i robotjs
npm i -D electron-rebuild
npm install -g node-gyp
npx electron-rebuild -f -t prod,optional,dev -w robotjs