# phoenix-eye  

Frontend project of code:phoenix.

## Develop environment

- Node.js 8.10.0  

## Installation

Clone project  

```shell
git clone https://github.com/TzeHimSung/phoenix-eye.git
cd phoenix-eye
npm i
```

Install eslint, commitizen & cz-conventional-changelog

```shell
# use sudo when necessary
npm i -g eslint commitizen cz-conventional-changelog
```

Install commitlint and husky to check git commit message and use git hook more easily

```shell
npm i -D husky @commitlint/config-conventional @commitlint/cli
```

## Launch project

Compiles and hot-reloads for development  

```
npm run serve
```

Compiles and minifies for production  

```
npm run build
```

Lints and fixes files  

```
npm run lint
```
