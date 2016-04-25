var val, token, starsValue, username;

window.onload = function () {
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

$("#wantToSignUp").click(function () {
    $("#signIn").hide();
    $("#signUp").toggle('explode');
    setTimeout(function () {
        $("#wantToSignUp").popover('hide');
    }, 0);

});
$("#wantToSignIn").click(function () {
    $("#signUp").hide();
    $("#signIn").toggle('explode');
    setTimeout(function () {
        $("#wantToSignIn").popover('hide');
    }, 0);

});
$("#reviewsStars-input").click(function () {
    setTimeout(function () {
        $("#reviewsStars-input").popover("hide");

    }, 0);
});
$("#text").click(function () {
    setTimeout(function () {
        $("#text").popover("hide");

    }, 0);
});
$("#buttonExit").click(function(){
    $("#yourName").hide();
    $("#buttonExit").hide();
    token = undefined;

});
$("#usernameRegistration").click(function() {
    setTimeout(function () {
        $("#usernameRegistration").popover('hide');
    }, 0)
});
$("#passwordRegistration").click(function(){
    setTimeout(function(){
    $("#passwordRegistration").popover('hide');
},0);
});
$("#usernameAuthorisation").click(function() {
    setTimeout(function () {
        $("#usernameAuthorisation").popover('hide');
    }, 0)
});
$("#passwordAuthorisation").click(function(){
    setTimeout(function(){
        $("#passwordAuthorisation").popover('hide');
    },0);
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
        if (xhr.readyState == 4) {
            if (username.value == "" || password.value == "") {
                var username1 = $("#usernameRegistration");
                var password1 = $("#passwordRegistration");
                username1.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-content': "Shouldn't be empty"
                });
                username1.popover('show');
                password1.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-content': "Shouldn't be empty"
                });
                password1.popover('show');
                setTimeout(function(){
                    username1.popover('hide');
                    password1.popover('hide');
                },2000)
            }
        }
        if (username.value !== "" || password.value !== ""){
            if (xhr.readyState == 4) {
                if (xhr.status == 201) {
                    $("#prodList").find("p").remove();
                    $("<p/>", {text: "You enter as " + username.value, id: "yourName"}).appendTo("#prodList");
                    $("#buttonExit").show();
                    $("#signUp").slideToggle("slow");
                    txt = JSON.parse(xhr.responseText);
                    token = txt.token;
                }
            }
            if (xhr.status == 200) {
                if (xhr.readyState == 4) {
                    txt = JSON.parse(xhr.responseText);
                    $("#signUp").slideToggle("slow");
                    $("#signUpFailure").toggle('slow');
                    setTimeout(function () {
                        $("#signUpFailure").toggle('slow');
                    }, 2500);

                }
            }
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
        if (xhr.readyState == 4) {
            if (username.value == "" || password.value == "") {
                var username1 = $("#usernameAuthorisation");
                var password1 = $("#passwordAuthorisation");
               username1.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-content': "Shouldn't be empty"
                });
               username1.popover('show');
               password1.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-content': "Shouldn't be empty"
                });
               password1.popover('show');
                setTimeout(function () {
                    username1.popover('hide');
                    password1.popover('hide');
                }, 2000)
            }
        }
        if (username.value !== "" || password.value !== "") {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var a = JSON.parse(xhr.responseText);
                    if (a.success == true) {
                        $("#prodList").find("p").remove();
                        $("<p/>", {text: "You enter as " + username.value, id: "yourName"}).appendTo("#prodList");
                        $("#buttonExit").show();
                        $("#signIn").toggle('slow');

                        token = a.token; //take token into the global scope for sending comments
                    }
                }
                if (a.success == false) {
                    $("#signIn").toggle('slow');
                    $("#signInFailure").toggle('slow');
                    setTimeout(function () {
                        $("#signInFailure").toggle('slow');
                    }, 2500);

                }
            }
        }
    }
}

function showProduct(value) {
    var tt = document.getElementById("text");
    tt.value = "";
    $(".star").css('background', 'none');
    $('input').attr('checked', false);
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
                    '<article>' + 'Product description:' + '<br>' + text1 + '</article>' + '</div>';


                //Comments
                val = val + 1;
                var xhr1 = new XMLHttpRequest();
                xhr1.open('GET', 'http://smktesting.herokuapp.com/api/reviews/' + val + '');
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
                            var create = a[i].created_by.username + ' at ' + a[i].created_at;
                            b.innerHTML += '<div class="list-group-item">' + '<p>' + create + '</p>' +
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

function getStarValue(value) {
    starsValue = +value;


}

function sendComment() {
    var text = $("#text")[0];
    var obj = {
        rate: starsValue,
        text: text.value
    };
    var jsn = JSON.stringify(obj);
    var xhr2 = new XMLHttpRequest();
    var wantToSignUp = $("#wantToSignUp");
    var wantToSignIn = $("#wantToSignIn");
    var textArea = $("#text");
    var stars = $("#reviewStars-input");


    if (username == undefined) {
        wantToSignUp.attr({
            'data-container': 'body',
            'data-toggle': 'popover',
            'data-placement': 'bottom',
            'data-content': 'You should sign up'
        });
        wantToSignUp.popover('show');

        wantToSignIn.attr({
            'data-container': 'body',
            'data-toggle': 'popover',
            'data-placement': 'bottom',
            'data-content': 'or sign in'
        });
        setTimeout(function () {
            wantToSignIn.popover('show');
        }, 1000);

        setTimeout(function () {
            wantToSignUp.popover('hide');
            wantToSignIn.popover('hide');
        }, 2000);
    }


    if (username !== undefined) {

        if (text.value == "" || starsValue == undefined) {
            if (text.value == "") {
                textArea.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-content': 'Write something here'
                });
                textArea.popover("show");
                setTimeout(function () {
                    textArea.popover("hide");
                }, 3000);
            }

            if (starsValue == undefined) {
                stars.attr({
                    'data-toggle': 'popover',
                    'data-placement': 'top',
                    'data-content': 'You should chose a mark'
                });
                stars.popover("show");
                setTimeout(function () {
                    stars.popover("hide");
                }, 3000);

            }


        }

        if (text.value !== "" && starsValue !== undefined) {
            var b = document.getElementById("reviews");
            var newElement = document.createElement("div");
            var d = new Date();
            d = d.toUTCString();
            newElement.innerHTML = '<div class="list-group-item">' +
                '<p>' + username.value + ' at ' + d + '</p>' +
                '<p> Rate: ' + starsValue + '</p>' +
                '<p>' + text.value + '</p>' + '</div>';
            b.insertBefore(newElement, b.children[0]);
        }
    }

    if (text.value !== "" && starsValue !== undefined) {
        xhr2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/' + val + '');
            xhr2.setRequestHeader('Content-Type', 'application/json');
            xhr2.setRequestHeader('Authorization', 'Token ' + token + '');
            xhr2.send(jsn);

    }
}




























