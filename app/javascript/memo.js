const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};


function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    //JavaScriptからサーバーサイドにリクエストを送信するのに必要なXMLHttpRequestオブジェクトを生成
    const XHR = new XMLHttpRequest(); //新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納
    //↓openメソッドを用いて、リクエスト内容を指定。今回は、非同期で投稿したメモをデータベースに保存したいので、HTTPメソッドにはPOSTを指定
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    //↓onloadメソッドを用いて、レスポンスに成功したときの処理を記述する
    XHR.onload = () => {
      //↓成功しなかった(200以外)のときに警告がでるようにした
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list"); //新しいメモを挿入するための要素"list"を取得して変数listに入れた
      const formText = document.getElementById("content"); //リセットの対象となるフォームの要素"content"を取得して、変数formTextに入れた
      
      list.insertAdjacentHTML("afterend",buildHTML(XHR)); //変数listに入ってる要素の直後にhtmlを挿入するようにした
      formText.value = ""; //formTextのvalue属性に投稿したメモの内容が格納されているので、そこに空文字をあてる
    };
  });
};

window.addEventListener('load', post);