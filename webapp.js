var nextVideos = [];
var isPlay = false;

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
      // onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

function nextVideo() {
  console.log("Next");
  if (nextVideos.length === 0) return;

  const item = nextVideos.shift();
  console.log(item);
  updateContentNext();

  player.loadVideoById(item["videoId"]);
  player.playVideo();
  isPlay = true;
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for ten seconds and then stop.
function onPlayerStateChange(event) {
  console.log("event youtube palyer:", event.data);
  switch (event.data) {
    case YT.PlayerState.ENDED:
      nextVideo();
      break;
    case YT.PlayerState.PLAYING:
      isPlay = true;
      var myNode = document.getElementById("contentSearch");
      while (myNode.firstChild) {
        myNode.firstChild.remove();
      }
      myNode.innerHTML = `<i class="fa fa-pause"></i></button>`;
      break;
    case YT.PlayerState.PAUSED:
      isPlay = false;
      var myNode = document.getElementById("contentSearch");
      while (myNode.firstChild) {
        myNode.firstChild.remove();
      }
      myNode.innerHTML = `<i class="fa fa-play"></i></button>`;
      break;
    default:
      break;
  }
}
function controlVideo(eventName) {
  switch (eventName) {
    case "Replay":
      console.log("Replay");
      break;
      
    case "Pause/Play":
      if (isPlay) player.pauseVideo();
      else player.playVideo();
      break;

    case "Next":
      nextVideo();
      break;

    case "Mute/Unmute":
      var myNode = document.getElementById("contentSearch");
      while (myNode.firstChild) {
        myNode.firstChild.remove();
      }
      if (player.isMuted()) {
        player.unMute();
        myNode.innerHTML = `<i class="fa fa-volume-up"></i>`;
      }
      else {
        player.mute();
        myNode.innerHTML = `<i class="fa fa-volume-mute"></i>`;
      }
      break;

    default:
      break;
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
      searchVideos = [];
      JSON.parse(rawResult)["items"].forEach((video) => {
        searchVideos.push({
          videoId: video["id"]["videoId"],
          title: video["snippet"]["title"],
          channelTitle: video["snippet"]["channelTitle"],
          image: video["snippet"]["thumbnails"]["default"]["url"]
        });
      });
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
    text += `<div onclick="addVideo(${index})">
        <img src="${value["image"]}"/>
        <h3>${value["title"]}</h3>
        <p>${value["channelTitle"]}</p>
      </div>\n`;
  }
}

function updateContentNext() {
  console.log(nextVideos)
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
    text += `<div class="nextItem" onclick="viewNavigationMenu(${index})">
        <img src="${value["image"]}"/>
        <h3>${value["title"]}</h3>
        <p>${value["channelTitle"]}</p>
      </div>\n`;
  }
}

var isHidenNavigationMenu = false;

$(document).bind("click", function (event) {
  if (isHidenNavigationMenu) document.getElementById("rmenu").className = "hide";
  isHidenNavigationMenu = true;
});

function viewNavigationMenu(index) {
  function mouseX(evt) {
    if (evt.pageX) return evt.pageX;
    else if (evt.clientX) return (evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft));
    else return null;
  }

  function mouseY(evt) {
    if (evt.pageY) return evt.pageY;
    else if (evt.clientY) return (evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop));
    else return null;
  }

  var temp_x = mouseX(window.event);
  var body_x = document.getElementsByTagName("body")[0].offsetWidth;
  temp_x = body_x - temp_x < 113 ? body_x - 113 : temp_x;

  document.getElementById("rmenu").className = "show";
  document.getElementById("rmenu").style.top = mouseY(window.event) + "px";
  document.getElementById("rmenu").style.left = temp_x + "px";

  // var index = event.currentTarget.attributes.name.value.split("_")[1];
  document.getElementById("rmenu_top").onclick = function () {
    console.log("Top");
    nextVideos.unshift(nextVideos.splice(index, 1)[0]);
    updateContentNext();
  };
  document.getElementById("rmenu_delete").onclick = function () {
    console.log("Delete");
    nextVideos.splice(index, 1);
    updateContentNext();
  };

  isHidenNavigationMenu = false;
}

nextVideos = [
  {
    "videoId": "qmD5zW1lfC0",
    "title": "Bài hát ABC cho trẻ  Học tiếng Anh bằng ABC Song",
    "channelTitle": "DreGGor",
    "image": "https://i.ytimg.com/vi/qmD5zW1lfC0/default.jpg"
  },
  {
    "videoId": "yqsux6Y1D1M",
    "title": "ABC Song - Bài hát ABC Tiếng Việt [ Full ] | Giúp Bé Học Chữ Cái Qua Bài hát | VOI TV",
    "channelTitle": "VOI TV",
    "image": "https://i.ytimg.com/vi/yqsux6Y1D1M/default.jpg"
  },
  {
    "videoId": "xY3Z8acE8ew",
    "title": "The ABC Song | CoComelon Nursery Rhymes &amp; Kids Songs",
    "channelTitle": "Cocomelon - Nursery Rhymes",
    "image": "https://i.ytimg.com/vi/xY3Z8acE8ew/default.jpg"
  },
  {
    "videoId": "hq3yfQnllfQ",
    "title": "Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with Sounds for Children",
    "channelTitle": "ChuChu TV Nursery Rhymes & Kids Songs",
    "image": "https://i.ytimg.com/vi/hq3yfQnllfQ/default.jpg"
  },
  {
    "videoId": "GgXlqcklJ7Y",
    "title": "Çfare fitoi Irma Libohova nga Kenga Magjike? Ne &#39;Abc e pasdites&#39; diva: A do duhet ze per te kenduar?",
    "channelTitle": "ABC News Albania",
    "image": "https://i.ytimg.com/vi/GgXlqcklJ7Y/default.jpg"
  }
]
updateContentNext();