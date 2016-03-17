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
function doAuthorisation() {

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
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            var a = JSON.parse(xhr.responseText);
            console.log(a);
            if (a.success == true) {
                token = a.token;

            }
        }
    }

};
var val;
var token;


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var a = xhr.responseText;
            a = JSON.parse(a);
            var b = document.getElementById("productsList");
            for (var i = 0; i < a.length; i++) {
                b.innerHTML += '<button value="' + i + '" onclick="showProduct(value)">' + a[i].title + '</button>'
            }
        }
    };
    xhr.send();




function showProduct(value) {
        //Show current product
        value = +value;
        val = value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var a = xhr.responseText;
                    var cont = document.getElementById("cont");
                    a = JSON.parse(a);
                        var id = a[value].id;
                        var title = a[value].title;
                        var img = a[value].img;
                        var text1 = a[value].text;
                        cont.innerHTML = '<div id="' + id + '" class="goods">' + '<h3><b>' + title +
                            '</b></h3>' + '<img src="http://smktesting.herokuapp.com/static/' + img + '">' +
                            '<article>' + text1 + '</article>' +'</div>';


                    //Comments
                    val = val + 1;
                    var xhr1 = new XMLHttpRequest();
                    xhr1.open('GET', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == 4 && xhr1.status == 200) {
                            var a = xhr1.responseText;
                            a = JSON.parse(a);
                            console.log(a);
                            var b = document.getElementById("reviews");
                            
                            for (var i = a.length - 1; i > 0; i--) {
                                var rate = a[i].rate;
                                var text = a[i].text;
                                var create =a[i].created_by.username + ' at ' +  a[i].created_at;
                                b.innerHTML += '<div>' + '<p>' + create + '</p>' +
                                    '<p>Rate:' + rate + '</p>' +
                                    '<p>' + text + '</p>'+'</div>>';



                            }


                        }

                    };
                    xhr1.send();
                }
            }
        };
        xhr.send();
    }

function  sendComment (){
    var text = document.getElementById("text");
    var rate = document.getElementById("rate");
    var obj = {
        rate: rate.value,
        text: text.value
    };
    var jsn = JSON.stringify(obj);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('Authorization', 'Token '+token+'');
    xhr2.send(jsn);
    xhr2.onreadystatechange = function () {
        if (xhr2.state == 4 && xhr2.readyState == 201) {
            console.log(xhr2.responseText);
        }
    }
}
























