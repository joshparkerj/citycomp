var base = "http://localhost:8081/";
var localbase = "https://city-frontend.joshquizzes.com/";
$(document).ready(function() {
$(document).ready(function() {
    console.log("HelloWorld!");

    $('#create').parent().on('click','#create',e=>{
        e.preventDefault();
        toggleButton();
    }).on('click','#register', e=>{
        register();
    });
    

    $('#submitButton').on('click', e=>{
        e.preventDefault();
        console.log("SENDING:");
        console.log(JSON.stringify( { "username": $('#username').val(), "password": $('#password').val() } ));
        console.log("I was clicked");
        $.ajax({
            method: 'POST',
            // contentType: 'application/json; charset=utf-8',
            url: base+"login",
            data: JSON.stringify({ "username": $('#username').val(), "password": $('#password').val()}) ,
            success: function loginSuccess(succ){
                console.log("Succ:"+succ);
                console.log(succ)
                if(succ === ""){

                }else if(succ === false || succ=="UHHHHH"){
                    onError(succ);
                }else{
                    let p = `<p style="color:green; margin-top:0px;">Login was succesfull please wait a moment...</p>`
                    $('.loginErrors').empty().append(p);
                    console.log("Login was a success:")
                    console.log(succ)
                    localStorage.setItem("token", succ)
                    window.location.href = localbase+"/landing";
                }
            },
            error: function onError(err) {
            console.log("Error hit")
            if(err == ""){

            }else{
            let p = `<p style="color:red; margin-top:0px;">Username/Password incorrect please try again</p>`
            $('.loginErrors').empty().append(p);
            }
          }
            });
        });
    });
});
            function toggleButton(){
                var subButtonVal = $('#submitButton').text();
                console.log(subButtonVal)
                if(subButtonVal == 'Login'){
                    $('#submitButton').text('Register');
                    $('#create').text('Login');
                    $('#submitButton').removeClass("login100-form-btn").addClass("login1-form-btn");
                    $('#submitButton').attr('id', 'register');
            
                }else{
                    $('#register').text('Login');
                    $('#create').text('Create Account');
                    $('#register').removeClass("login1-form-btn").addClass("login100-form-btn");
                    $('#register').attr('id', 'submitButton');
                }
            }
            
            function register(){
                console.log("REGISTER CLICKEDDDDD!");
            }