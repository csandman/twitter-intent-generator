function calcIntent(e) {
  e.preventDefault();
  var finalURL = "https://twitter.com/intent/tweet?text=";
  const tweet_val = document.getElementById("tweet-field").value;
  const hashtag_val = document.getElementById("hashtag-field").value;
  const url_val = document.getElementById("url-field").value;
  const via_val = document.getElementById("via-field").value;

  if (tweet_val.length > 0) {
    finalURL += encodeURIComponent(tweet_val.replace(/[\r\n]+/g, " "))
      .replace(/\*%7C/g, "*|URL:")
      .replace(/%7C\*/g, "|*");

    if (hashtag_val.length > 0) {
      finalURL +=
        "&hashtags=" + encodeURIComponent(hashtag_val.replace(/#/g, ""));
    }

    if (url_val.length > 0) {
      finalURL += "&url=" + encodeURIComponent(url_val);
    }

    if (via_val.length > 0) {
      finalURL += "&via=" + encodeURIComponent(via_val.replace(/@/g, ""));
    }

    document.getElementById("intent").innerText = finalURL;
  } else {
    document.getElementById("intent").innerText = "Your tweet is empty";
  }
}

function getRemainingChars() {
  const text_max = 280;
  let warning_msg = "";

  const tweet_len = document.getElementById("tweet-field").value.length;
  const hashtag_len = document.getElementById("hashtag-field").value.length;
  const url_len = document.getElementById("url-field").value.length;
  const via_len = document.getElementById("via-field").value.length;

  var text_remaining = text_max - tweet_len - hashtag_len - url_len - via_len;
  if (text_remaining < 0) {
    warning_msg = "- too long!";
    document.getElementById("character_remaining").classList.add("warning");
  } else {
    warning_msg = "";
    document.getElementById("character_remaining").classList.remove("warning");
  }
  document.getElementById("character_remaining").innerText =
    "Characters remaining: " + text_remaining + " " + warning_msg;
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("#character_remaining").innerText =
    "Characters remaining: 280";

  document.querySelector(".btn").addEventListener("click", calcIntent);

  const inputs = document.querySelectorAll(".form-control");
  Array.from(inputs).forEach(input => {
    input.addEventListener("keyup", getRemainingChars);
  });
});
