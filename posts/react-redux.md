---
title: 'About React and Redux'
date: '2021-03-26'
---

# 概要

Summarizing what I learned about React and Redux


## React

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
