var mobileStatus = false;
var watchStatus = false;
var glassesStatus = false;
var selectedVolunteer = undefined;
var setNew = true;
socket = io(api_path, {
  "Content-Type": "application/json",
});
function enterFullscreen() {
  document.getElementById("fullScreenBtn").style.display = "none";
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  document.getElementById("fullScreenBtn").style.display = "block";
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
(async function main() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/client/pages/login.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/client/pages/login.html";
  });

  socket.on("connect", () => {
    socket.emit("online", { userId: localStorage.getItem("userId") });
  });

  socket.on("newOrder", (data) => {
    console.log(data);
    alert("New Order");
    if (window.location.pathname.includes("kitchen.html")) {
      window.location.reload();
    }
  });

  //refresh every 5 seconds
})();
