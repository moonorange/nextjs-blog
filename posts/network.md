---
title: 'ネットワークについて'
date: '2021-01-13'
---

# TCP/IP

Transmission Control Protocol / Internet Protocol）は通信を実現する基盤技術

中でも「通信の信頼性を確保する」役割を担っているのがTCP

# IPとは　Internet Protocol

IPとは、複数の通信ネットワークを相互に接続し、データを中継・伝送して一つの大きなネットワークにすることができる通信規約（プロトコル）の一つ。IPによって接続された世界規模の巨大なコンピュータネットワークをインターネット（the Internet）という。

ネットワーク層で用いられるプロトコル。（経路制御）

IP アドレスを用いて機器と機器をネットワーク上でつなぐような役割。
・　パケット通信技術
・　コネクションレス型通信

## IPデータグラム

IPで送受信するデータは一定の大きさに分割され、先頭に宛先アドレスや送信元アドレスなどの制御情報（IPヘッダと呼ばれる）を付加した「IPデータグラム」（IP datagram）と呼ばれる送受信単位で伝送される。このような伝送方式をパケット交換方式という。

# TCPとは

TCPは「コネクション型」と分類され、送受信を行う機器間で通信の開始と終了を確認する。データ転送時には、送信側はデータを送信し、受信側はそれに対する確認応答であるACK（Acknowledgement）を返すことによって、両端のホスト間でデータが届いたかどうかを確認し合いながら確実にデータ転送を行う。

![OSI参照モデル](https://cdn-ak.f.st-hatena.com/images/fotolife/b/blog-media/20200205/20200205164620.png)

OSI参照モデルではトランスポート層にあたる。

## 特徴

通常、データの送信単位にはデータ部とヘッダ部があり、ヘッダは各階層ごとにフォーマットが規定されている。

TCPでは、両ホストはトランスポート層のヘッダのみを参照し、通信のやりとりを行う。通信する両者が同時にデータを送受信可能である全二重通信を提供

- TCPでは送信単位のことを「セグメント」と呼ぶ
- セグメントが何番目まで送られたかを示すシーケンス番号
- 何番目まで受け取りました/次は何番目が欲しい」ということを示す確認応答番号
「受信可能なセグメント量」を示すウィンドウサイズ
## コネクション管理

### コネクションの確立　3ウェイハンドシェイク

1. 送信側から確立要求としてSYN(synchronize)（コネクションの確立要求）フラグの有効化されたTCPパケットを送信
2. 受信側はこれに対するACK(Acknowledgement)と、同時に受信側からの接続確立要求として同TCPヘッダのSYNフラグを有効化して送信（SYN+ACK）
3. 送信側が受信側からのSYNに対するACKパケットを送信

### コネクションの切断：ハーフクローズ

1. 送信側は最初にFIN（コネクション終了要求）を送信
2. 受信側はACKを送信し、続けてFINを送信
3. 送信側はFINを受信して最後のACKを送った後、一定時間待ってコネクション終了
### ウィンドウ制御

TCPの送信側では、一度に転送可能なデータ量を表すパラメータであるウィンドウサイズ（swnd）が定義されている。
ウィンドウ内にあるセグメントはACKを待たずに送信することができる。

ウィンドウ制御」が上位概念に相当し、スライディングウィンドウ方式に基づいてデータの転送を行う、というもの。送信ウィンドウサイズswndを決定するための方法が「フロー制御」と「輻輳制御」となる。
フロー制御は受信側から通知される受け入れ可能なウィンドウサイズrwndに基づいて送信ウィンドウサイズswndを決定するもの。輻輳制御は、ネットワークの輻輳をできるだけ抑えつつ、かつ効率よくデータを転送することを目的とし輻輳ウィンドウサイズcwndを決定するもの。 rwndがcwndよりも小さければ、rwndを優先的に採用する。

### フロー制御

二つの機器間でデータのやり取りを行う場合、相手から受信したデータはバッファメモリにいったん記録され、その後プロセッサから読み出されて処理される。
このとき、送信が速過ぎてバッファからあふれそうになったり、受信側が何らかの処理に忙しくてデータの処理を進められない場合などに、送信側の機器にこれを通知して、送信を一時中断したり、速度を低下させたりする。こうしたデータの流れの調整をフロー制御という。

### 輻輳制御

ネットワークの混雑（輻輳、ふくそうと言います）をできるだけ回避するような送信セグメント量の制御をおこなう。

# 他のプロトコル

## ARP：Address Resolution Protocol
通信相手の IP アドレスから MAC アドレスを取得する。

## RARP:Reverse-ARP
MAC アドレスから IP アドレスを取得。

## ICMP Internet Control Message Protocol

IP パケット（データ）の送信処理時のエラー通知・制御のためのプロトコル。
Ping コマンドで用いられる。

## Pingコマンドとは

Pingコマンドとはネットワークを確認したいホストに対してIPパケットを送信して、通信ができるかどうかを確認するコマンド

## DHCPとは「Dynamic Host Configuration Protocol
 IPv4ネットワークにおいて通信用の基本的な設定を自動的に行うためのプロトコル

 最初はDHCPクライアントは自身のIPアドレスも知らなければ、DHCPサーバのIPアドレスも知らないので全ての宛先（ブロードキャスト）にDHCP Discoverメッセージを送信して、ネットワーク全体に問い合わせをする。
 ブロードキャストをサポートしているプロトコルであるUDPを使う。

## SMTP：Simple Mail Trasfer Protocol

メール送信用

## POP3：Post Office Protocol

メール受信用
一回受け取ると、サーバーから消えるので複数台受信向きではない。

## IMAP：Internet Message Access Protocol

メール受信用。Webメールとかは大体これ。
受信してもサーバーから消えないが上限がある。

## ルーティングプロトコル 【 routing protocol 】
ルーティングプロトコルとは、ネットワーク上の経路選択を行うルータ間の通信に用いられるプロトコル（通信規約）の一つで、経路情報を交換するためのもの。通常はインターネット上でのルーティングに用いられるものを指す。

## NTPとは
　NTP（Network Time Protocol）は、コンピュータに内蔵されているシステムクロックをネットワークを介して正しく同期させるためのプロトコル。NTPにより時刻同期を行うことで指定時間に正しくサービスを動作させたり、出力ログを正しく管理できたり、証明書を利用した認証なども正しく行うことができます。

## Internet Relay Chatとは

サーバを介してクライアントとクライアントが会話をする枠組みの名称
## 参考

TCP/IP

https://eh-career.com/engineerhub/entry/2020/02/13/103000

IPとは

https://e-words.jp/w/IP.html

DHCPとは

https://www.infraexpert.com/study/tcpip13.html


NTPとは

https://www.infraexpert.com/study/tcpip25.html


ICMPとは

https://www.infraexpert.com/study/tcpip4.html


IPアドレスとは(歴史も)

https://qiita.com/mogulla3/items/efb4c9328d82d24d98e6
