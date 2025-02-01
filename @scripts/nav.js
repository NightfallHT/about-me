"use strict";
const infoElement = document.getElementById("nav-info");
const crtScreen = document.getElementById("crt-video");
const storedChannel = sessionStorage.getItem("channel");
let date = new Date(Date.now());
let currentChannel = 0;
if (storedChannel != null) {
    currentChannel = parseInt(storedChannel);
}
const maxChannels = 3;
const dateTimeWrapper = document.createElement("div");
const dateInfo = document.createElement("div");
const timeInfo = document.createElement("div");
const channelMenu = document.createElement("div");
const channelDecrease = document.createElement("button");
const channelIncrease = document.createElement("button");
const channelInfo = document.createElement("div");
channelInfo.id = "channel-info";
channelMenu.id = "channel-menu";
channelDecrease.classList.add("channel-menu-button");
channelIncrease.classList.add("channel-menu-button");
dateTimeWrapper.classList.add("flex-column");
channelDecrease.innerText = "◀";
channelIncrease.innerText = "▶";
updateChannel(currentChannel);
updateTime();
channelDecrease.addEventListener("click", () => {
    changeChannel(-1, maxChannels);
});
channelIncrease.addEventListener("click", () => {
    changeChannel(1, maxChannels);
});
dateInfo.innerHTML = `${date.getDate()} ${date.toLocaleDateString("default", { month: "short" })}, ${date.getFullYear()}`;
if (infoElement != null) {
    infoElement.insertAdjacentElement("afterbegin", dateTimeWrapper);
    dateTimeWrapper.appendChild(dateInfo);
    dateTimeWrapper.appendChild(timeInfo);
    infoElement.appendChild(channelMenu);
    channelMenu.appendChild(channelDecrease);
    channelMenu.appendChild(channelInfo);
    channelMenu.appendChild(channelIncrease);
}
setInterval(() => {
    updateTime();
}, 6000);
function changeChannel(change, maxChannel) {
    currentChannel += change;
    if (currentChannel > maxChannel) {
        currentChannel = 0;
    }
    if (currentChannel < 0) {
        currentChannel = maxChannel;
    }
    sessionStorage.setItem("channel", currentChannel.toString());
    updateChannel(currentChannel);
}
function updateChannel(channelIndex) {
    channelInfo.innerText = `Channel 0${channelIndex}`;
    document.documentElement.style.setProperty("--current-channel", `url(./@media/channel${channelIndex}.gif)`);
}
function updateTime() {
    let currentTime = new Date(Date.now()).toLocaleString("default", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    timeInfo.innerHTML = `${currentTime}`;
}
