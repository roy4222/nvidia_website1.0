# NVIDIA 購物網站示範

這個專案是以 NVIDIA 為範例的企業購物網站展示。專案展示了一個現代化的電子商務平台，包含產品列表、購物車功能和響應式設計。

## 功能架構

### 1. 首頁功能
- 響應式導航欄，包含品牌標誌、主要功能連結
- 輪播展示最新產品和促銷活動
- 熱門商品展示區
- 產品類別快速導航
- 企業新聞和最新消息區塊

### 2. 產品展示
- 產品分類瀏覽
- 產品搜尋功能
  - 關鍵字搜尋
  - 價格範圍篩選
  - 規格篩選（記憶體大小、晶片類型等）
- 產品排序（價格、上架時間）
- 產品詳細資訊頁面
  - 產品圖片展示
  - 詳細規格說明
  - 價格資訊
  - 庫存狀態
  - 加入購物車功能

### 3. 購物車系統
- 即時購物車預覽
- 商品數量調整
- 移除商品功能
- 購物車總額計算
- 運費計算機制
  - 標準運送 (NT$100)
  - 快速運送 (NT$200)
  - 門市自取 (免運費)
  - 訂單滿 NT$30,000 免運費

### 4. 結帳流程
- 購物車確認
- 運送方式選擇
- 填寫收件資訊
  - 姓名
  - 電話
  - 地址
  - 電子郵件
- 付款方式選擇
- 訂單摘要確認
- 送出訂單功能

### 5. 會員系統
- 會員註冊/登入
- 個人資料管理
- 訂單歷史查詢
- 願望清單
- 商品收藏功能

### 6. 後台管理（規劃中）
- 商品管理
- 訂單管理
- 會員管理
- 庫存管理
- 銷售報表

## 使用技術

- HTML5
- CSS3 (Bootstrap 5 框架)
- JavaScript
  - 原生 JavaScript
  - LocalStorage 購物車資料儲存
  - 響應式設計支援
- Bootstrap 5
  - 響應式網格系統
  - 元件樣式
  - 互動功能

## 專案結構

```
project/
├── index.html          # 首頁
├── product.html        # 產品列表頁
├── cart.html          # 購物車頁面
├── checkout.html      # 結帳頁面
├── about.html         # 關於我們
├── contact.html       # 聯絡我們
├── css/              # CSS 樣式檔案
│   └── style.css     # 主要樣式表
├── js/               # JavaScript 檔案
│   ├── cart.js       # 購物車功能
│   └── main.js       # 主要功能
├── images/           # 圖片資源
│   ├── products/     # 產品圖片
│   └── banners/      # 橫幅圖片
└── README.md         # 專案說明文件
```

## 開始使用

1. 複製專案儲存庫
2. 在瀏覽器中打開 `index.html`
3. 開始瀏覽網站

## 參與貢獻

1. Fork 此專案
2. 建立您的功能分支 (`git checkout -b feature/新功能`)
3. 提交您的修改 (`git commit -m '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 發起 Pull Request

## 授權說明

本專案僅供教育用途。NVIDIA 及其標誌是 NVIDIA Corporation 的商標。
