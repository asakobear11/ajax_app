function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    //JavaScriptからサーバーサイドにリクエストを送信するのに必要なXMLHttpRequestオブジェクトを生成
    const XHR = new XMLHttpRequest(); //新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納
    //openメソッドを用いて、リクエスト内容を指定。今回は、非同期で投稿したメモをデータベースに保存したいので、HTTPメソッドにはPOSTを指定
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
  });
};

window.addEventListener('load', post);