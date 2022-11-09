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
    player.loadVideoById("kPhpHvnnn0Q");
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

function searchYoutube() {
  var myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Accept-Language", "en-US,en;q=0.5");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Youtube-Bootstrap-Logged-In", "false");
  myHeaders.append("X-Youtube-Client-Name", "1");
  myHeaders.append("X-Youtube-Client-Version", "2.20221026.05.00");
  myHeaders.append("Origin", "https://www.youtube.com");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "same-origin");
  myHeaders.append("Sec-Fetch-Site", "same-origin");
  myHeaders.append("Referer", "https://www.youtube.com/");
  myHeaders.append("Alt-Used", "www.youtube.com");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("TE", "trailers");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append('Access-Control-Allow-Credentials', 'true');

  var raw = JSON.stringify({
    context: {
      client: {
        hl: "en",
        gl: "VN",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0,gzip(gfe)",
        clientName: "WEB",
        clientVersion: "2.20221026.05.00",
        osName: "Windows",
        osVersion: "10.0",
        originalUrl: "https://www.youtube.com/results?search_query=perfect",
        platform: "DESKTOP",
        browserName: "Firefox",
        browserVersion: "106.0",
        acceptHeader:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        utcOffsetMinutes: 420,
        timeZone: "Asia/Bangkok"
      }
    },
    query: "perfect"
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    mode: 'no-cors'
  };

  fetch("https://www.youtube.com/youtubei/v1/search", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
