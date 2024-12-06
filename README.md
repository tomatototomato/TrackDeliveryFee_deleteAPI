# 課題：Web APIを使ったアプリケーション

作品名： 概算運送費算出アプリ

## 課題内容（どんな作品か）

- トラック輸送における概算運送費を算出できるアプリケーションです。  
  ２点間の郵便番号を入力すると住所が出力され、  
  住所情報を基に走行距離と概算運送費が出力されます。  
  
  沖縄含む離島は対応しておりませんが、一応、日本国内であれば対応可能です。  
  ※Google系統のAPIキーは削除してます。  
  GitHub Pagesでデプロイしたものは住所検索までしか動きません。  

- 仕組み
  - 住所検索APIで郵便番号から住所取得。（発送元と送り先の２箇所）
  - GoogleMapAPIに住所情報を渡すと、運送経路の算出と走行距離を算出してくれる。
  - GoogleSpreadSheetAPIから運賃表を取得。
  - あとは計算でいろいろして概算運送費をだしています。

- 使用したAPI
  ・jp-postal-code-api  
  - 郵便番号を入力すると住所が返ってくる
  
  ・Google Map Distance Matrix API
  - ２箇所の住所を入力するとルート検索と走行距離を返してくれる

  ・Google SpreadSheet API
  - 国交省が告示している「一般貨物自動車運送事業の標準的な運賃」を
    スプレッドシートにまとめ、APIとして公開した。
    今回の作品では作ったAPIを使い、算出ロジックを簡略化させた。

## DEMO

https://tomatototomato.github.io/TrackDeliveryFee_deleteAPI/

## 作ったアプリケーション用のIDまたはPasswordがある場合

- 設定なし

## 工夫した点・こだわった点

- Web APIを組み合わせると非常に幅が広がりそうだと思ったので、複数APIを使ってみました。
- GoogleMAPのAPIは使ってみたかったので、使ってみました。
- 普段の業務でも使いたかったので、UIはなるべく簡素にして、スマホでも操作しやすくしました。

## 難しかった点・次回トライしたいこと(又は機能)

- GoogleMAP API関連でいろんなエラーが出て、苦戦しました。

  私の場合、CORS policyで検証ができなくなってしまい、右往左往しました。
  Google chromeの拡張機能ででCORSをいじれるアドインがあったので、そちらで解決。

- Google SpreadSheetではなく、実際のAPI開発もやってみたいと思いました。

## 質問・疑問・感想、シェアしたいこと等なんでも

- [感想]
  APIの組合せ次第では様々もモノが作れそうだと感じました。
  情報の内容次第では、API単体だけでもマネタイズも可能だと思ったので、
  奥が深そうな分野だとは思いますが、もっと理解を深めたいと思いました。

- [参考記事]
  - 1. [https://zenn.dev/ttskch/articles/309423d26a1aaa]
  - 2. [https://www.mlit.go.jp/jidosha/jidosha_tk4_000118.html]
  - 3. [https://developers.google.com/maps/documentation/distance-matrix/overview?hl=ja]
  - 4. [https://news.mynavi.jp/techplus/article/excelvbaweb-14/]


