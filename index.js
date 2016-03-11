var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var a = xhr.responseText;
            var cont = document.getElementById("cont");
            a = JSON.parse(a);
            for (var i = 0; i < a.length; i++) {
                var id = a[i].id;
                var title = a[i].title;
                var img = a[i].img;
                var text = a[i].text;
                cont.innerHTML += '<div id="' + id + '" class="goods">' + '<h3><b>' + title +
                    '</b></h3>' + '<img src="http://smktesting.herokuapp.com/static/' + img + '">' +
                    '<article>' + text + '</article>' + '</div>';
            }
        }
    }
};xhr.send();

var xhr1 = new XMLHttpRequest();
    for(var i = 1; i < 3; i++) {
        xhr1.open('GET','http://smktesting.herokuapp.com/api/reviews/'+i+'');
        xhr1.onreadystatechange = function(){
            if(xhr1.readyState == 4 && xhr1.status == 200){
                var a = xhr1.responseText;
                a = JSON.parse(a);
                console.log(a);
            }
        }
    };xhr1.send();


function doRegistration() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var obj = {
        username: username.value,
        password: password.value,
    };
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

function doAuthorisation(){
    var username = document.getElementById("usernameA");
    var password = document.getElementById("passwordA");
    var obj = {
        username: username.value,
        password: password.value
    };
    var jsn = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://smktesting.herokuapp.com/api/login/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsn);
    xhr.onreadystatechange = function (){

        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
        }
    }

};














