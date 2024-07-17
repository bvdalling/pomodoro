const imageUrls = [
  "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721137287642-43b251bd6f00?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721112796760-fe228d1e22a8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721157549677-73644a262b6c?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721143133240-8b4da5312e83?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1700416501742-47f25f16d769?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721102825235-3ec07d8d0cab?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to simulate pixel giggling
function pixelGiggler() {
  // Define the elements or areas of your display to be affected
  // Here, we're using a simple example where we change text content
  // Replace this with your actual display update logic
  let elements = document.querySelectorAll('body > div');

  elements.forEach(element => {
    // Generate random content or random changes
    let randomContent = getRandomInt(1, 1000); // Example: Generate a random number
    element.textContent = randomContent;
  });
}

// Call pixelGiggler function periodically
setInterval(pixelGiggler, 5000); // Adjust the interval (in milliseconds) as needed

const defaultBackground = imageUrls[Math.floor(Math.random() * imageUrls.length)];

setInterval(() => SetBackgroundImage(imageUrls[Math.floor(Math.random() * imageUrls.length)]), 3600000)

const ReplaceAllDataBackground = () => {
  Array.from(document.querySelectorAll("div[data-background]")).forEach(
    (listItem) => {
      listItem.style.backgroundImage =
        "url('" + listItem.getAttribute("data-background") + "')";
    }
  );
};

const SetupBackgroundSelector = () => {
  const container = document.querySelector(".infinite-row");

  imageUrls.forEach((url) => {
    const div = document.createElement("div");
    div.setAttribute("data-background", url);
    container.appendChild(div);
  });
  
  Array.from($(".infinite-row > div")).forEach((option) => {
    option.addEventListener("click", () => {
      SetBackgroundImage(option.getAttribute("data-background"));
    });
  });
};

const SetBackgroundImage = (background) => {
  document.getElementById("background-image").value = background;
  let appContent = document.querySelector(".app-content");

  appContent.style.backgroundImage = `url('${background}')`;
  appContent.style.backgroundRepeat = "no-repeat";
  appContent.style.backgroundPosition = "center center";
  appContent.style.backgroundAttachment = "fixed";
  appContent.style.backgroundSize = "cover";
};

const SetupBackground = () => {
  SetBackgroundImage(defaultBackground);

  document.getElementById("background-image").addEventListener("keyup", () => {
    let value = document.getElementById("background-image").value;
    SetBackgroundImage(
      value == "" || value == null ? defaultBackground : value
    );
  });
};

$(document).ready(function () {
  SetupBackground();
  SetupBackgroundSelector();
  ReplaceAllDataBackground();

  // Everything below here is from:
  //    https://codepen.io/putraaryotama/pen/wgwqBB

  var countS = 25;
  $("#session").html(countS);
  var countB = 5;
  $("#break").html(countB);
  var countLama;
  var posLama;
  var count;
  var clock = $(".timer").FlipClock(0, {
    countdown: true,
    clockFace: "MinuteCounter",
    autoStart: false,
    callbacks: {
      interval: function () {
        if (clock.getTime() == 0) {
          if (pos == "session") {
            clock.setTime(countB * 60);
            clock.start();
          } else if (pos == "break") {
            clock.setTime(countS * 60);
            clock.start();
          }
        }
      }
    }
  });
  //SESSION
  $("#sessInc").on("click", function () {
    if ($("#session").html() > 0) {
      countS = parseInt($("#session").html());
      countS += 1;
      $("#session").html(countS);
      //clock.setTime(countS*60);
    }
  });
  $("#sessDec").on("click", function () {
    if ($("#session").html() > 1) {
      countS = parseInt($("#session").html());
      countS -= 1;
      $("#session").html(countS);
      //clock.setTime(countS*60);
    }
  });
  //BREAK
  $("#breakInc").on("click", function () {
    if ($("#break").html() > 0) {
      countB = parseInt($("#break").html());
      countB += 1;
      $("#break").html(countB);
    }
  });
  $("#breakDec").on("click", function () {
    if ($("#break").html() > 1) {
      countB = parseInt($("#break").html());
      countB -= 1;
      $("#break").html(countB);
    }
  });
  $("#start").on("click", function () {
    if (count != countS || clock.getTime() == 0) {
      clock.setTime(countS * 60);
      pos = "session";
    } else {
      pos = posLama;
    }
    count = countS;
    clock.start();
  });
  $("#stop").on("click", function () {
    clock.stop();
    countLama = clock.getTime();
    posLama = $("#stats").html();
  });
  $("#clear").on("click", function () {
    clock.stop();
    pos = "pomodoro";
    clock.setTime(0);
  });
});
