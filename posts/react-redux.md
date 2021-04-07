---
title: 'React, Reduxについての基礎'
date: '2021-03-26'
---

# 概要

JavaScript, ReactやReduxについてほとんど分からないという状態から学んだことをまとめた資料。
様々なトピックをざっくりとしか書いていないためそれぞれで学習する必要がある。

# 非同期処理について

まずはJavaScriptを使う上で重要な概念である非同期処理について説明していく。

## Promiseについて

PromiseとはFutureパターン（Promiseパターン）というデザインパターンの一種で、ECMAScript6（ES2015）で標準化された組み込みのクラスである。
Promiseを使った非同期処理の関数は`Promise オブジェクト`(非同期処理の最終的な完了処理 (もしくは失敗) およびその結果の値を表現する)を返す。

Promiseオブジェクトとは簡単に言うと、`今は値を返せないが、あとで返すことを約束する`オブジェクトである。

### Promiseの状態について

Promiseオブジェクトは3つの内部状態を持つ

- pending（保留）: まだ非同期処理は終わっていない（成功も失敗もしていない）
- fulfilled（成功）: 非同期処理が正常に終了した
- rejected（拒否）: 非同期処理が失敗した

初期状態はpendingであり、`一度fulfilled or rejectedになるとそれ以降は状態が変わらず、終了時に返す値も変わらない`

### コンストラクター

Promiseのコンストラクターは関数を引数に取る。そしてその関数は以下の特徴がある。

- 関数は2つの関数(resolve, reject)を引数に取る
  - resolveに引数を渡して実行すると状態がfulfilledになり、引数の値がPromiseオブジェクトが保持する値になる
  - rejectに引数を渡して実行すると状態がrejectedになり、引数の値がPromiseオブジェクトが保持する値になる
- 関数が例外を投げた場合も状態がrejectedになり、投げた値があPromiseオブジェクトが保持する値になる
  - throwする値をrejectedに渡して実行した時と同じ


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

React, Javacript周辺の用語

- Babel 新しい仕様の JavaScript や JSX、TypeScript のコードを古いブラウザでも実行可能なJavaScript にコンパイルするコンパイラー
- webpack  コンパイラと連携しつつ大量のソースコードファイルをひとつにまとめ、種々の最適化を施すbundler
- react-dom DOM を抽象化して React から操作できるようにするレンダラーのパッケージ
- jest オールインワンのjavascriptテスティングフレームワーク

## コンポーネント


https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

コンポーネントで大事な要素
• Props　親コンポーネントから受け取る値
• Local State　コンポーネント自身が内部に持つ状態
• ライフサイクル　初期化されてマウントされレンダリングされ、何らかの処理が行われて再レンダリングされたりして、最後にアンマウントされるまでの過程


## 参考

https://qiita.com/soarflat/items/1a9613e023200bbebcb3

https://developer.mozilla.org/ja/


Promise編
https://knowledge.sakura.ad.jp/24890/
