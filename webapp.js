var nextVideos = [];

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    videoId: "fb9KXo2y06A",
    playerVars: {
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for ten seconds and then stop.
function onPlayerStateChange(event) {
  console.log("event youtube palyer:", event.data);
  if (event.data == YT.PlayerState.ENDED) {
    const item = nextVideos.shift();
    updateContentNext();

    player.loadVideoById(item["videoId"]);
  }
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

var searchVideos = [];
function searchYoutube() {
  var textSearch = encodeURIComponent(
    document.getElementById("textboxSearch").value
  );
  console.log(textSearch);

  var requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=AIzaSyBvoC3r9qzkrrX-nTcUd6Z1xONs4X5fdnU&q=" +
      textSearch,
    requestOptions
  )
    .then((response) => response.text())
    .then((rawResult) => {
      const result = JSON.parse(rawResult);

      searchVideos = [];
      result["items"].forEach((video) => {
        var videoId = video["id"]["videoId"];
        var title = video["snippet"]["title"];
        var channelTitle = video["snippet"]["channelTitle"];
        var image = video["snippet"]["thumbnails"]["default"]["url"];
        searchVideos.push({
          videoId: videoId,
          title: title,
          channelTitle: channelTitle,
          image: image
        });
      });

      console.log(searchVideos);
      updateContentSearch();
    })
    .catch((error) => console.log("error", error));
}

function addVideo(index) {
  nextVideos.push(searchVideos[index]);
  updateContentNext();
}

function updateContentSearch() {
  var myNode = document.getElementById("contentSearch");

  // Xóa các phần tử cũ
  while (myNode.firstChild) {
    myNode.firstChild.remove();
  }

  // Them video moi
  let text = "<ul>";
  searchVideos.forEach((element, index) => myFunction(index, element));
  text += "</ul>";
  myNode.innerHTML = text;

  function myFunction(index, value) {
    text +=
      '<div onclick="addVideo(' +
      index +
      ')"><img src="' +
      value["image"] +
      '"/><h3>' +
      value["title"] +
      "</h3><p>" +
      value["channelTitle"] +
      "</p></div>\n";
  }
}

function updateContentNext() {
  var myNode = document.getElementById("contentNext");

  // Xóa các phần tử cũ
  while (myNode.firstChild) {
    myNode.firstChild.remove();
  }

  // Them video moi
  let text = "<ul>";
  nextVideos.forEach((element, index) => myFunction(index, element));
  text += "</ul>";
  myNode.innerHTML = text;

  function myFunction(index, value) {
    if (value === undefined) return;
    text += `<div class="nextItem" name="next_${index}" onclick="test_menu()">
        <img src="${value["image"]}"/>
        <h3>${value["title"]}</h3>
        <p>${value["channelTitle"]}</p>
      </div>\n`;
  }
}

var abc = false;

// this is from another SO post...
$(document).bind("click", function (event) {
  console.log("click", abc);
  if (abc) document.getElementById("rmenu").className = "hide";
  abc = true;
  // var hide_rmenu = true;
  // console.log(event.currentTarget.nodeName);
  // if (event.currentTarget.nodeName === "DIV") hide_rmenu = false;
  // if (hide_rmenu === true) document.getElementById("rmenu").className = "hide";
});

function test_menu() {
  function mouseX(evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return (
        evt.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft)
      );
    } else {
      return null;
    }
  }

  function mouseY(evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return (
        evt.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop)
      );
    } else {
      return null;
    }
  }

  document.getElementById("rmenu").className = "show";
  document.getElementById("rmenu").style.top = mouseY(event) + "px";
  document.getElementById("rmenu").style.left = mouseX(event) + "px";

  var index = event.currentTarget.attributes.name.value.split("_")[1];
  document.getElementById("rmenu_top").onclick = function () {
    nextVideos.unshift(nextVideos.splice(index, 1)[0]);
    updateContentNext();
  };
  document.getElementById("rmenu_delete").onclick = function () {
    nextVideos.splice(index, 1);
    updateContentNext();
  };

  abc = false;
  console.log("test_menu", abc);

  window.event.returnValue = false;
}
