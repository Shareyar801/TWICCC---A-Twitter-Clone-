var user_ids;

function registerUser() {
  var u_name = document.getElementById("form3Example1c").value;
  var u_email = document.getElementById("form3Example3c").value;
  var u_password = document.getElementById("form3Example4c").value;
  var u_confirm_pass = document.getElementById("form3Example4cd").value;
  var checkbox = document.getElementById("myCheckbox");

  var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var name_regex = /^[A-Za-z\s]+$/;
  var pass_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,20}$/;

  if (!u_name.match(name_regex)) {
    alert(
      "Incorrect form entered in name. Please enter a valid one. " + u_name
    );
    return false;
  } else if (!u_email.match(email_regex)) {
    alert("Incorrect form entered in email. Please enter a valid one.");
    return false;
  } else if (!u_password.match(pass_regex)) {
    alert("Incorrect form entered in password. Please enter a valid one.");
    return false;
  } else if (!checkbox.checked) {
    alert("You haven't agreed to Terms and Condition.");
    return false;
  }

  user_ids = {
    username: u_name,
    useremail: u_email,
    userpassword: u_password,
  };
  localStorage.setItem("userdetail", JSON.stringify(user_ids));

  window.location.href = "index.html";

  return true;
}



function userValidate() {
  var entered_email = document.getElementById("form3Example3").value;
  var entered_password = document.getElementById("form3Example4").value;


  var usertest = JSON.parse(localStorage.getItem("userdetail"));

  console.log(usertest.username);
  console.log(usertest.useremail);
  console.log(usertest.userpassword);

  if (usertest.useremail === entered_email && usertest.userpassword === entered_password)
  {
    authenticatedUser = true;
  }
  else
  {
    authenticatedUser = false;
  }
    

  console.log(authenticatedUser);
  if (authenticatedUser == true) {
    //console.log("Login successful. Welcome, " + username + "!");
    window.location.href = "userHome(Tail).html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
}

function deleteAcc(){
  console.log(usertest.username);
  console.log(usertest.useremail);
  console.log(usertest.userpassword);

  usertest.useremail = "User Deleted 21625273945";
  usertest.userpassword = "User Deleted 21625273945";

}

