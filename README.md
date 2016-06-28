# react-es6-template

react + es6(webpack)のプロジェクトテンプレートです。フォークしてブランチでちょこっとテストするなり、丸っとコピって新規プロジェクトを作るなり、一部コピーして使うなり好きにしてください。

コピーする場合は`.git`を削除してしまうと楽です。

```
git clone git@github.com:gomo/react-es6-template.git my-react-es6
cd my-react-es6
rm -rf .git
git init
git add .
git commit -m "initial commit"
```

## インストール

```
npm install
```

## ビルド方法

gulpのdefaultタスクになっています。

```
gulp
```

でwebpackとsass両方ともビルドされます。

## Compatibility

IE9/IE10に対応させるため[ES2015 classes transform](https://babeljs.io/docs/plugins/transform-es2015-classes/)の`loose`モードでコンパイルしています。必要なければ適宜外してください。

webpack.config.js
```ｊｓ
query:
{
    presets:['es2015', 'react'],
    plugins: [["transform-es2015-classes", { "loose": true }]]
}
```
