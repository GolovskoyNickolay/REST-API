var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var a = xhr.responseText;
            var cont = document.getElementById("cont");
            var list = document.getElementById("goodsList");
            a = JSON.parse(a);
            for (var i = 0; i < a.length; i++) {
                var id = a[i].id;
                var title = a[i].title;
                var img = a[i].img;
                var text = a[i].text;
                list.innerHTML += '<button>'+title+'</button>';
                cont.innerHTML += '<div id="' + id + '" class="goods">' + '<h3><b>' + title + '</b></h3>' +
                    '<img src="http://smktesting.herokuapp.com/static/' + img + '">' + "<article>"
                    + text + "</article>" + '<textarea id="text">' + '</textarea>' +
                    '<button type="button" onclick="pushComment()">Comment</button>'
                    + '<table id="table"></table>' + '</div>';


            }


        }
    }
};

function pushComment() {
    var tab = document.getElementById("table");
    var text = document.getElementById("text");
    text = text.value;
    tab.innerHTML += '<tr>' + text + '</tr>';
};

xhr.send();

function yeap() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var obj = {
        username: username.value,
        password: password.value,
    }
    var jsn = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://smktesting.herokuapp.com/api/register/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsn);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                console.log(xhr.responseText);


            }
        }
    }
};














