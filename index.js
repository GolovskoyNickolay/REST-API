var val, token, starsValue, username;

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://smktesting.herokuapp.com/api/products/');
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var a = xhr.responseText;
            a = JSON.parse(a);
            var b = $("#productsList")[0];
            for (var i = 0; i < a.length; i++) {
                b.innerHTML += '<li  class="active" value="' + i + '" onclick="showProduct(value)">'
                    + '<a data-toogle="tab" href="#">' + a[i].title + '</li>';
            }
        }
    };
    xhr.send();
}; //Load the list of products

$("#wantToSignUp").click(function(){
    $("#signIn").hide();
    $("#signUp").toggle('explode');
    setTimeout(function(){
        $("#wantToSignUp").popover('hide');
    },0);

});
$("#wantToSignIn").click(function(){
    $("#signUp").hide();
    $("#signIn").toggle('explode');
});

function doSignUp() {
        username = $("#usernameRegistration")[0];
    var password = $("#passwordRegistration")[0];
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
            $("#signUp").slideToggle("slow");
            setTimeout(function(){
            $("#signUpSuccess").toggle('slow');
            }, 300);
            setTimeout(function(){
                $("#signUpSuccess").toggle('slow');
            }, 2500);
            txt = JSON.parse(xhr.responseText);
            token = txt.token;
        }
                if(xhr.status == 200 && xhr.readyState == 4){
                    txt = JSON.parse(xhr.responseText);
                    $("#signUpFailure").toggle('slow');
                    setTimeout(function(){
                        $("#signUpFailure").toggle('slow');
                    }, 2500);


                }
        }
}

function doSignIn() {

        username = $("#usernameAuthorisation")[0];
    var password = $("#passwordAuthorisation")[0];
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
                $("#signIn").toggle('slow');
                $("#signInSuccess").toggle('slow');
               setTimeout(function(){
                   $("#signInSuccess").toggle('slow');
               }, 2500);

                token = a.token; //take token into the global scope for sending comments
            }
            else{
                $("#signInFailure").toggle('slow');
                setTimeout(function(){
                    $("#signInFailure").toggle('slow');
                }, 2500);

            }
        }
    }

}

function showProduct(value) {
        var tt = document.getElementById("text");
            tt.value = "";
            $(".star").css('background', 'none');
            $('input').attr('checked',false);
        value = +value; //get value from product's list
        val = value;// other value for reviews
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
    starsValue = +value;


}

function  sendComment (){
    var text = $("#text")[0];
    var obj = {
        rate: starsValue,
        text: text.value
    };
    var jsn = JSON.stringify(obj);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/'+val+'');
        xhr2.onreadystatechange = function() {
            var sendButton = $("#sendButton");
            var wantToSignUp = $("#wantToSignUp");
            if (xhr2.status == 401 && xhr2.readyState == 4) {
                
                        wantToSignUp.attr('data-container', 'body');
                        wantToSignUp.attr('data-toggle', 'popover');
                        wantToSignUp.attr('data-placement', 'bottom');
                        wantToSignUp.attr('data-content', 'You should sign in or sign up');
                        wantToSignUp.popover('show');
                setTimeout(function(){
                    wantToSignUp.popover('hide');
                }, 2500);
                }

            if (xhr2.status == 200 && xhr2.readyState == 4) {
                var r = JSON.parse(xhr2.responseText);
                if (r.success == true) {
                    var b = document.getElementById("reviews");
                    var newElement = document.createElement("div");
                        var d = new Date();
                            d = d.toUTCString();
                    newElement.innerHTML = '<div class="list-group-item">' +
                            '<p>'+ username.value + ' at ' + d + '</p>'+
                        '<p> Rate: ' + starsValue + '</p>' +
                        '<p>' + text.value + '</p>' + '</div>';
                    b.insertBefore(newElement, b.children[0]);
                }
            }
            if (xhr2.status == 500 || xhr2.status == 400 && xhr2.readyState == 4) {
                var textArea =  $("#text");
                var stars = $("#reviewStars-input");

                    textArea.popover({trigger: "manual"});
                    textArea.attr("data-toggle", "popover");
                    textArea.attr("data-content", "And write something here");
                    textArea.popover("show");

                    stars.popover({trigger: "manual"});
                    stars.attr("data-toggle", "popover");
                    stars.attr("data-content", "You should chose a mark");
                    stars.popover("show");
                    setTimeout(function () {
                        textArea.popover("hide");
                        stars.popover("hide");
                    }, 3500);


            }
        };




    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('Authorization', 'Token '+token+'');
    xhr2.send(jsn);
}






























