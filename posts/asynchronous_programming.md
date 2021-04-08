---
title: 'Asynchronous Programming'
date: '2021-04-05'
---


# 概要

JavaScriptを使う上で重要な概念である非同期処理について説明していく。
JavaScriptの非同期処理の重要概念はCallback、Promise、async/awaitの3つがあり、それらについて説明する。


## Callback関数について

callbackとは`ある関数を他の関数に渡すこと`または`引数として渡される関数`のことを言う。
他の関数は、何らかの条件が満たされたとき、または何らかの（非同期の）イベントが発生したときに、引数の関数を呼び出す。

```javascript
function foo() {
  fs.readFile('/etc/passwd', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  console.log('foo');
}
```

radFile関数が終了したら2つ目の引数に渡したarrow関数を実行する。
この場合、readFileの`終了を待たずにconsole.log('foo')が先に実行される。`


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


fs.readFile()をPromise化した例。

```javascript
// Promiseのコンストラクタにresolveとrejectを引数に取るarrow関数を渡す
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err); // 失敗: 内部状態をrejectedにする
      }
      else {
        resolve(data); // 成功: 内部状態をfulfilledにする
      }
    });
  });
}
```

### then(), catch()

非同期処理の結果を取り出すthen()とcatch()について説明する。

#### then
then()は`2つの関数`を引数に取る。
Promiseの状態がfulfilledになったら1番目の関数がrejectedになると二番目が実行される。

```javascript
readFilePromise("/etc/passwd")
  .then(
    (data) => {
      // 読み出しに成功したらresolve()に渡した値が引数として渡される
      console.log("OK", data);
    },
    (err) => {
      // 読み出しに失敗するか fs.readFile() 自体が例外を投げたら
      // reject()に渡した値が引数として渡される
      console.log("error", err);
    }
  );
```

## async関数について

関数の前にasyncを宣言することにより、非同期関数（async function）を定義できる。
Promiseオブジェクトを返す非同期処理をより簡単に書けるようにするものである。
asyncを関数の前につけるとPromiseオブジェクトを返すようになる。

```Javascript
async function sample() {}
```
async functionには以下の特徴がある。

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


## 参考

async await
https://qiita.com/soarflat/items/1a9613e023200bbebcb3

mozilla
https://developer.mozilla.org/ja/

Promise
https://knowledge.sakura.ad.jp/24890/
