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
        if (xhr.readyState == 4 && xhr.status == 201) {
            alert("You have been registered successfully");
        }
                if(xhr.status == 200 && xhr.readyState == 4){
                    var txt = xhr.responseText;
                        txt = JSON.parse(txt);
                    alert(txt.message);


                }
        }
}
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
                alert("Authorisation is successful")
                token = a.token; //take token into the global scope for sending comments
            }
            else{
                alert("Authorisation is fail");
            }
        }
    }

}
var val;
var token;
var startValue;


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
                        cont.innerHTML = '<div id="' + id + '" class="goods">' + '<h3>' + title +
                            '</h3>' + '<img src="http://smktesting.herokuapp.com/static/' + img + '">' +
                            '<article>'+'Product description:'+'<br>' + text1 + '</article>' +'</div>';


                    //Comments
                    val = val + 1;
                    var xhr1 = new XMLHttpRequest();
                    xhr1.open('GET', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == 4 && xhr1.status == 200) {
                            var a = xhr1.responseText;
                            a = JSON.parse(a);
                            var b = document.getElementById("reviews");
                                     b.innerHTML = "";
                            var list = document.getElementsByTagName("form")[2];
                                list.id = "list";
                            for (var i = a.length - 1; i > 0; i--) {
                                var rate = a[i].rate;
                                var text = a[i].text;
                                var create =a[i].created_by.username + ' at ' +  a[i].created_at;
                                b.innerHTML +='<div class="comments">' +'<p>' + create + '</p>' +
                                    '<p>Rate:' + rate + '</p>' +
                                    '<p>' + text + '</p>' + '</div>';

                            }


                        }

                    };
                    xhr1.send();
                }
            }
        };
        xhr.send();
    }
function getStarValue(value){
    startValue = +value;


}
function  sendComment (){
    var text = document.getElementById("text");
    var rate = document.getElementById("rate");
    var obj = {
        rate: startValue,
        text: text.value
    };
    var jsn = JSON.stringify(obj);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
        xhr2.onreadystatechange = function(){
            if(xhr2.status == 401 && xhr2.readyState == 4){
                alert("You should sign in at first");
            }
            if(xhr2.status == 200 && xhr2.readyState == 4){
                alert("Your comment have been sent successfully");
            }
            if(xhr2.status == 500 && xhr2.readyState == 4){
                alert("You should write in rating and text");
            }

        };
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('Authorization', 'Token '+token+'');
    xhr2.send(jsn);
    }


























