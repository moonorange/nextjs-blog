---
title: 'React, Reduxについての基礎'
date: '2020-03-26'
---

# 概要

ReactやReduxについてほとんど分からないという状態から学んだことをまとめた資料。

Javascriptについても一部触れている。

## Javacript周辺の用語

- Babel 新しい仕様の JavaScript や JSX、TypeScript のコードを古いブラウザでも実行可能なJavaScript にコンパイルするコンパイラー
- webpack  コンパイラと連携しつつ大量のソースコードファイルをひとつにまとめ、種々の最適化を施すbundler
- react-dom DOM を抽象化して React から操作できるようにするレンダラーのパッケージ
- jest オールインワンのjavascriptテスティングフレームワーク


## async関数について

関数の前にasyncを宣言することにより、非同期関数（async function）を定義できる。

```Javascript
async function sample() {}
```

- async functionは呼び出されるとPromiseを返す
- async functionが値をreturnした場合、Promiseは戻り値をresolveする
- async functionが例外や何らかの値をthrowした場合はその値をrejectする

### await

async function内でPromiseの結果（resolve、reject）が返されるまで待機する（処理を一時停止する）演算子のこと。

以下のように、関数の前にawaitを指定すると、その関数のPromiseの結果が返されるまで待機する。

```javascript
async function sample() {
    const result = await sampleResolve();

    // sampleResolve()のPromiseの結果が返ってくるまで以下は実行されない
    console.log(result);
}
```

# React

## コンポーネント


https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

コンポーネントで大事な要素
• Props　親コンポーネントから受け取る値
• Local State　コンポーネント自身が内部に持つ状態
• ライフサイクル　初期化されてマウントされレンダリングされ、何らかの処理が行われて再レンダリングされたりして、最後にアンマウントされるまでの過程


## 参考

https://qiita.com/soarflat/items/1a9613e023200bbebcb3
