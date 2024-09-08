const fs = require("fs");

let codes = require("./codes.json");

(async() => {
    const response = await fetch("https://www.chess.com/service/topplayers/chess/blitz?limit=50", {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
            "Accept": "*/*",
            "Accept-Language": "en-GB"
        }
    });

    const data = await response.json();

    await Promise.all(data.players.map(async player => {
        let body = {
            userUuid: player.id,
            campaignId: "4daf403e-66eb-11ef-96ab-ad0a069940ce"
        }

        return fetch("https://www.chess.com/rpc/chesscom.partnership_offer_codes.v1.PartnershipOfferCodesService/RetrieveOfferCode", {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
                "Accept": "*/*",
                "Accept-Language": "en-GB",
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(nitroCode => {
            if (!codes.includes(`https://discord.com/billing/promotions/${nitroCode.codeValue}`)) {
                codes.push(`https://discord.com/billing/promotions/${nitroCode.codeValue}`);
                console.log(`https://discord.com/billing/promotions/${nitroCode.codeValue}`);
            }
        });
    }));

    fs.writeFileSync("codes.json", JSON.stringify(codes, null, 2), (err) => {
        if (err) console.log(err);
    });
})();