"use strict";
const osChoices = [
    "Windows 95",
    "Windows 98",
    "Windows XP",
    "Windows 7",
    "Windows 10",
    "Windows 11",
    "Linux Mint",
    "Ubuntu",
    "Arch Linux",
    "Debian GNU/Linux",
    "Gentoo",
    "Fedora",
    "openSUSE",
    "CentOS",
    "FreeBSD",
    "Kali Linux",
    "Pop!_OS",
    "Red Hat Enterprise Linux",
    "Manjaro",
    "Zorin OS",
    "MacOS",
];
$(() => {
    $("#os-dropdown")
        .autocomplete({
        source: osChoices,
    })
        .tooltip({
        tooltipClass: "submit-tooltip",
    });
    $("#os-picker").css("display", "none");
    $("#system-autocomplete").css("display", "flex");
});
