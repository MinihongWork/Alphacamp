## 餐廳清單
<img src = "https://github.com/MinihongWork/Alphacamp/blob/Alphacamp/Alphacamp/RestaurantList/public/image/sample.png" width="900px">  


此網頁可以使用的功能如下 :  
使用者可以新增一家餐廳  
使用者可以瀏覽一家餐廳的詳細資訊  
使用者可以瀏覽全部所有餐廳  
使用者可以修改一家餐廳的資訊  
使用者可以刪除一家餐廳  
使用者可以註冊帳號，註冊的資料包括：名字(非必要)、email、密碼、確認密碼  
    使用者可以透過 Facebook Login 直接登入  

此外，使用者必須登入才能使用餐廳清單  

## 開始使用
1. 請先確認有安裝 node.js ， npm 與使用環境的插件安裝項目
2. 將專案 clone 到本地
3. 設定環境變數，請參考 .env.example
4. 在本地開啟之後，透過終端機進入資料夾載入資料庫預設資料，輸入：
  
   ```bash
   npm run seed
   ```

5. 載入後，繼續輸入執行程式：

   ```bash
   npm run start
   ```

5. 若看見此行訊息則代表順利運行

   ```bash
   Express is listening on localhost:{port}
   mongodb connected!
   
   ```
   打開瀏覽器進入到以下網址
   
   ```bash
   http://localhost:{port}

   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 使用環境  
    bcryptjs 2.4.3  
    body-parser 1.19.2  
    connect-flash 0.1.1  
    dotenv 8.2.0  
    express 4.16.4  
    express-handlebars 6.0.6  
    express-session 1.17.1  
    method-override 3.0.0  
    mongoose 6.2.6  
    passport 0.4.1  
    passport-facebook 3.0.0  
    passport-local 1.0.0
