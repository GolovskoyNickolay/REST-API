function doRegistration() {
    var username = $("#username")[0];
    var password = $("#password")[0];
    var obj = {
        username: username.value,
        password: password.value
    };
   var txt;
    var jsn = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://smktesting.herokuapp.com/api/register/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsn);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            alert("You have been registered successfully");
            var showLeaveComment =  $("#leaveComment")[0];
            showLeaveComment.id = "leaveComment1";
            $("#commentBox").hide();
            txt = xhr.responseText;
            txt = JSON.parse(txt);
            token = txt.token;
        }
                if(xhr.status == 200 && xhr.readyState == 4){
                    txt = xhr.responseText;
                    txt = JSON.parse(txt);
                    alert(txt.message);


                }
        }
}
function doAuthorisation() {

    var username = $("#usernameA")[0];
    var password = $("#passwordA")[0];
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
            if (a.success == true) {
                alert("Authorisation is successful");
                var showLeaveComment =  $("#leaveComment")[0];
                showLeaveComment.id = "leaveComment1";
                $("#commentBox").hide();
                $("#authorisationCont").slideToggle("slow");
                token = a.token; //take token into the global scope for sending comments
            }
            else{
alert('something go wrong, please, try again');
            }
        }
    }

}
var val, token, startValue;

        //Load the list of products
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
      xhr.onreadystatechange = function () {
          if (xhr.status == 200 && xhr.readyState == 4) {
              var a = xhr.responseText;
              a = JSON.parse(a);
              var b = $("#productsList")[0];
              for (var i = 0; i < a.length; i++) {
                  b.innerHTML += '<button class="btn btn-primary" value="' + i + '" onclick="showProduct(value)">'
                      + a[i].title + '</button>'
              }
          }
      };
      xhr.send();





function showProduct(value) {
    if(token == undefined){
        $("#commentBox").show();
    }
    else {  $("#commentBox").hide();}
        //Show current product
        value = +value;
        val = value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var a = xhr.responseText;
                    var cont = $("#cont")[0];
                    a = JSON.parse(a);
                        var id = a[value].id;
                        var title = a[value].title;
                        var img = a[value].img;
                        var text1 = a[value].text;
                        cont.innerHTML = '<div id="' + id + '" class="goods">' + '<h3>' + title +
                            '</h3>' + '<img " src="http://smktesting.herokuapp.com/static/' + img + '">' +
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
                            var list = $("form")[2];
                                list.id = "list";//change id for seeing rating
                            for (var i = a.length - 1; i > 0; i--) {
                                var rate = a[i].rate;
                                var text = a[i].text;
                                var create =a[i].created_by.username + ' at ' +  a[i].created_at;
                                b.innerHTML +='<div class="list-group-item">' +'<p>' + create + '</p>' +
                                    '<p>Rate: ' + rate + '</p>' +
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
    var text = $("#text")[0];
    var obj = {
        rate: startValue,
        text: text.value
    };
    var jsn = JSON.stringify(obj);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
        xhr2.onreadystatechange = function() {

            if (xhr2.status == 401 && xhr2.readyState == 4) {
                alert("You should sign in at first");
            }
            if (xhr2.status == 200 && xhr2.readyState == 4) {
                var r = JSON.parse(xhr2.responseText);
                if (r.success == true) {
                    var b = document.getElementById("reviews");
                    var newElement = document.createElement("div");
                    newElement.innerHTML = '<div class="list-group-item">' +
                        '<p>Rate: ' + startValue + '</p>' +
                        '<p>' + text.value + '</p>' + '</div>';
                    b.insertBefore(newElement, b.children[0]);
                }
            }
            if (xhr2.status == 500 || xhr2.status == 400 && xhr2.readyState == 4) {
                alert("You should write in rating and text");
            }
        };




    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('Authorization', 'Token '+token+'');
    xhr2.send(jsn);
}
$("#enter").click(function () {
    $("#authorisationCont").slideToggle("slow");
    $(this).show();

});



//Оставлять комментарии только после входа или авторизироваться
//Responsive, зафиксировать звездочки
//Использовать jQuery, Bootstrap(alert and so on)
//Вместо кнопок продуктов-закладки

























