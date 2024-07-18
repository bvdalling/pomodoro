let imageUrls = [
  "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721137287642-43b251bd6f00?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721112796760-fe228d1e22a8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721157549677-73644a262b6c?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721143133240-8b4da5312e83?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1700416501742-47f25f16d769?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721102825235-3ec07d8d0cab?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

let activeImage = "";

const defaultBackground =
  imageUrls[Math.floor(Math.random() * imageUrls.length)];

setInterval(() => SetRandomBackground(), 3600000);

const ReplaceAllDataBackground = () => {
  Array.from(document.querySelectorAll("div[data-background]")).forEach(
    (listItem) => {
      listItem.style.backgroundImage =
        "url('" + listItem.getAttribute("data-background") + "')";
    }
  );
};

const CreateImageOptionTile = (url) => {
  const container = document.querySelector(".infinite-row");
  const div = document.createElement("div");
  div.setAttribute("data-background", url);

  div.addEventListener("click", () => {
    SetBackgroundImage(div.getAttribute("data-background"));
  });
  container.appendChild(div);
};

const SetupBackgroundSelector = () => {
  imageUrls.forEach((url) => {
    CreateImageOptionTile(url);
  });
};

const SetBackgroundImage = (background) => {
  activeImage = background;
  document.getElementById("background-image").placeholder = background;
  let appContent = document.querySelector(".app-content");

  appContent.style.backgroundImage = `url('${background}')`;
  appContent.style.backgroundRepeat = "no-repeat";
  appContent.style.backgroundPosition = "center center";
  appContent.style.backgroundAttachment = "fixed";
  appContent.style.backgroundSize = "cover";
};

const SetRandomBackground = () => {
  SetBackgroundImage(imageUrls[Math.floor(Math.random() * imageUrls.length)]);
};

const SetupBackground = () => {
  SetBackgroundImage(defaultBackground);
};

const AddImageToOptions = (newImage) => {
  imageUrls.push(newImage);
  CreateImageOptionTile(newImage);
  ReplaceAllDataBackground();
  window.localStorage.setItem("image-options", JSON.stringify(imageUrls));
};

const SetupImageOptions = () => {
  let imageOptions = window.localStorage.getItem("image-options");

  if (imageOptions != null && imageOptions != "") {
    imageOptions = JSON.parse(imageOptions);

    if (imageOptions != null && imageOptions.length > 0) {
      imageUrls = imageOptions;
    }
  }
};

const PruneBackgroundOptionTiles = () => {
  let options = document.querySelectorAll(".infinite-row > div")
  
  Array.from(options).forEach(option => {
    let backgroundValue = option.getAttribute("data-background")
    
    if (!imageUrls.includes(backgroundValue)) {
      option.remove()
    }
  })
}

document.getElementById('import-settings').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
  let file = event.target.files[0];

  if (!file) {
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e) {
    try {
      let content = e.target.result;
      let importedSettings = JSON.parse(content);

      applySettings(importedSettings);

      alert('Settings imported successfully!');
    } catch (error) {
      alert('Error importing settings: ' + error.message);
    }
  };

  reader.readAsText(file);
});

function applySettings(settings) {
  console.log('Applying settings:', settings);
  
  imageUrls = settings.images

  window.localStorage.setItem("image-options", JSON.stringify(imageUrls));
  SetupImageOptions();
  SetupBackground();
  SetupBackgroundSelector();
  ReplaceAllDataBackground();
  SetBackgroundImage(settings.activeImage);
}


const DownloadObject = (exportObject, fileName) => {
  let link = document.createElement('a');
  let url = URL.createObjectURL(new Blob([JSON.stringify(exportObject)], { type: 'application/json' }))
  
  link.href = url;
  link.download = fileName;
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

$(document).ready(function () {
  SetupImageOptions();
  SetupBackground();
  SetupBackgroundSelector();
  ReplaceAllDataBackground();

  document
    .querySelector("#remove-current-background")
    .addEventListener("click", () => {
      imageUrls = imageUrls.filter((url) => url != activeImage);
      SetRandomBackground()
      PruneBackgroundOptionTiles()
      window.localStorage.setItem("image-options", JSON.stringify(imageUrls));
    });
  
  document.querySelector("#export-settings")
  .addEventListener("click", () => {
      let exportObject = {
        images: imageUrls,
        activeImage: activeImage
      }
      
      DownloadObject(exportObject, "simple-pomodoro-settings-export.json")
    });

  document.querySelector("#addImageToImages").addEventListener("click", () => {
    let value = document.getElementById("background-image").value;
    SetBackgroundImage(
      value == "" || value == null ? defaultBackground : value
    );

    AddImageToOptions(value);
  });

  // Everything below here is from:
  //    https://codepen.io/putraaryotama/pen/wgwqBB$(document).ready(function(){
  var countS = 25;
  $("#session").html(countS);
  var countB = 5;
  $("#break").html(countB);
  var pos = "pomodoro";
  var countLama;
  var posLama;
  var count;
  $("#stats").html(pos);
  var clock = $(".timer").FlipClock(0, {
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {
      interval: function(){
        if (clock.getTime() == 0){
          if (pos == "session"){
            clock.setTime(countB*60);
            clock.start();
            pos = "break";
            $("#stats").html(pos);
          } else if (pos == "break"){
            clock.setTime(countS*60);
            clock.start();
            pos = "session";
            $("#stats").html(pos);
          }
        }        
      }
    }
  })  
  //SESSION
  $("#sessInc").on("click", function(){
    if ($("#session").html() > 0){
      countS = parseInt($("#session").html());
      countS+=1;
      $("#session").html(countS);
      //clock.setTime(countS*60);
    }
  });
  $("#sessDec").on("click", function(){
    if ($("#session").html() > 1){
      countS = parseInt($("#session").html());
      countS-=1;
      $("#session").html(countS);
      //clock.setTime(countS*60);
    }
  });
  //BREAK
  $("#breakInc").on("click", function(){
    if ($("#break").html() > 0){
      countB = parseInt($("#break").html());
      countB+=1;
      $("#break").html(countB);
    }    
  });
  $("#breakDec").on("click", function(){
    if ($("#break").html() > 1){
      countB = parseInt($("#break").html());
      countB-=1;
      $("#break").html(countB);
    }
  });  
  $("#start").on("click", function(){
    if (count != countS || clock.getTime()==0){
      clock.setTime(countS*60);
      pos="session";
      $("#stats").html(pos);
    } else {
      pos = posLama;
      $("#stats").html(pos);
    }
    count = countS;    
    clock.start();    
  });
  $("#stop").on("click", function(){
    clock.stop();
    countLama = clock.getTime();
    posLama = $("#stats").html();
  });
  $("#clear").on("click", function(){
    clock.stop();
    pos = "pomodoro";
    $("#stats").html(pos);
    clock.setTime(0);
  });
});