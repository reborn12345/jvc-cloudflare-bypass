// ==UserScript==
// @name         JVC Cloudflare Bypass
// @namespace    https://jeuxvideo.com/
// @version      1.0
// @description  Vérifie si Cloudflare WARP est actif et propose de l'activer si nécessaire
// @author       HulkDu92
// @match        *://www.jeuxvideo.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function checkWarpStatus() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://cloudflare.com/cdn-cgi/trace",
            onload: function(response) {
                const warpActive = response.responseText.includes("warp=on");
                showButton(warpActive);
            }
        });
    }

    function showButton(warpActive) {
        let btn = document.createElement("button");
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.right = "20px";
        btn.style.padding = "10px";
        btn.style.backgroundColor = warpActive ? "green" : "red";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.innerText = warpActive ? "Cloudflare WARP actif" : "Activer 1.1.1.1";

        btn.onclick = function() {
            if (!warpActive) {
                window.open("https://1.1.1.1/", "_blank");
            } else {
                alert("Cloudflare WARP est déjà activé !");
            }
        };

        document.body.appendChild(btn);
    }

    checkWarpStatus();
})();
