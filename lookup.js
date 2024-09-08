const prompt = require("prompt-sync")();

(async () => {
    let selection = String(prompt("Username: "));

    if (selection === "null") process.exit(1);

    const profile = await fetch(`https://www.chess.com/callback/user/popup/${selection}`, {
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
            "Accept": "*/*",
            "Accept-Language": "en-GB"
        },
        "referrer": `https://www.chess.com/member/${selection}`,
        "method": "GET"
    });

    if (profile.status === 404) {
        console.log("Not found");
        process.exit(1);
    }

    const data = await profile.json();

    let body = JSON.stringify({
        userUuid: data.uuid,
        campaignId: "4daf403e-66eb-11ef-96ab-ad0a069940ce"
    });

    const response = await fetch("https://www.chess.com/rpc/chesscom.partnership_offer_codes.v1.PartnershipOfferCodesService/RetrieveOfferCode", {
        body: body,
        method: "POST",
        referrer: "https://www.chess.com/play/computer/discord-wumpus?utm_source=chesscom&utm_medium=homepagebanner&utm_campaign=discord2024",
        headers: {
            "Host": "www.chess.com",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/124.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.8",
            "cache-control": "no-cache",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Content-Type": "application/json",
            "Content-Length": body.length,
            "Origin": "https://www.chess.com",
            "Sec-GPC": "1",
            "pragma": "no-cache",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "DNT": "1",
            "Priority": "u=1, i"
        }
    })

    const code = await response.json();

    console.log('https://discord.com/billing/promotions/' + code.codeValue);
})();