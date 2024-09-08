// ==UserScript==
// @name         ChessNitro Web
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Shows Discord Nitro Code from chess.com username
// @author       kpxyy
// @match        https://www.chess.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @license      the-unlicense
// ==/UserScript==

(function() {
    'use strict';

    var $div = $('<div style="position: fixed; top: 0px; left: 0px; z-index: 9999; background: black; border-radius: 10px; padding: 5px; cursor: move; user-select: none; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;">' +
        '<h2 style="color: white; margin: 0; display: inline-block;">ChessNitro Web\n</h2>' +
        '<br>' + '<br>' +
    '</div>').appendTo('body');

    var $usernameInput = $('<input type="text" id="username" placeholder="Username" style="padding: 5px; border-radius: 5px; border: none; outline: none; width: 200px;">').appendTo($div);
    var $searchButton = $('<button id="sdnc-search" style="background: #4CAF50; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; margin: 0 4px;">Search</button>').appendTo($div);
    $div.append('<br>');
    $div.append('<br>');
    var $opponentButton = $('<button id="sdnc-opponent" style="background: #FF5252; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">Get Opponent</button>').appendTo($div);
    var $profileButton = $('<button id="sdnc-profile" style="background: #4285F4; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; margin: 0 4px;">Get Profile</button>').appendTo($div);

    $opponentButton.on('click', function() {
        var username = $('.user-username-component.user-username-white.user-username-link.user-tagline-username').first().text();

        $usernameInput.val(username);
    });

    $profileButton.on('click', function() {
        if (!window.location.pathname.includes('/member/')) return;

        var username = window.location.pathname.replace('/member/', '')

        $usernameInput.val(username);
    });

    var dragging = false;
    var offset = {x: 0, y: 0};

    $div.on('mousedown', function(e) {
        dragging = true;
        offset = {
            x: $div.offset().left - e.clientX,
            y: $div.offset().top - e.clientY
        };
    });

    $(document).on('mousemove', function(e) {
        if (dragging) {
            $div.offset({
                left: e.clientX + offset.x,
                top: e.clientY + offset.y
            });
        }
    });

    $(document).on('mouseup', function(e) {
        dragging = false;
    });

    $searchButton.on('click', function() {
        var username = $usernameInput.val();

        if (username) {
            fetch(`https://www.chess.com/callback/user/popup/${username}`, {
                "headers": {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-GB"
                },
                "referrer": `https://www.chess.com/member/${username}`,
                "method": "GET"
            }).then(response => response.json()).then(data => {
                let body = JSON.stringify({
                    userUuid: data.uuid,
                    campaignId: "4daf403e-66eb-11ef-96ab-ad0a069940ce"
                });

                fetch("https://www.chess.com/rpc/chesscom.partnership_offer_codes.v1.PartnershipOfferCodesService/RetrieveOfferCode", {
                    body: body,
                    method: "POST",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
                        "Accept": "*/*",
                        "Accept-Language": "en-GB",
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json()).then(nitroCode => {
                    if (nitroCode.codeValue) {
                        alert(`https://discord.com/billing/promotions/${nitroCode.codeValue}`);
                    }
                });
            });
        }
    });
})();