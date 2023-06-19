 function displayText() {
      var text = "Connect with thousands of people right now!";
      var words = text.split(" ");
      var output = document.getElementById("output");

      var i = 0;
      var interval = setInterval(function () {
        output.innerHTML += words[i] + " ";
        i++;
        if (i >= words.length) {
          clearInterval(interval);
        }
      }, 500); // Change the time delay (in milliseconds) between each word here
    }