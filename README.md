# ChessNitro
The way ChessNitro works is by getting the User's UUID of the chess.com player by using `https://www.chess.com/service/topplayers/chess/blitz?limit=50` (or `https://www.chess.com/callback/user/popup/test` for a specific player) endpoint to get the User's UUID.

Chess.com uses version 1 uuids to identify bots, players, and etc.

After getting the User's UUID, Then you'll have to get the promotional code by sending a request to `https://www.chess.com/rpc/chesscom.partnership_offer_codes.v1.PartnershipOfferCodesService/RetrieveOfferCode`, and the body should have the campaignId (The partnership they're doing, like Discord for example) & userUUID. Furthermore, when sending a request to this with a different UUID that isn't yours, it will still work, but it's not mean't to work whatsoever.

The codes aren't vaildated as the server doesn't check if they already claimed the code. So you'll have to self-vaildate the discord nitro promotional codes yourself.

With this vulnerability on chess.com's end, you aren't meant to redeem other chess.com players promotional codes. This can be also replaced besides claiming discord nitro promotionals with their next partnership they can do.

What the chess.com development team can do is require authentication on the endpoint and actually check if it's the User's UUID being used, if not, then it can easily deny access to the endpoint.

This vulnerabilty was noticed 10 hours after the promotion by Discord X chess.com was started. So far, 2 other people after that point noticed this issue, But other people are using account generators.

This project will be publicly archived when the issue is fixed, resolved, or leaked/used by others.

## Note
The author is not responsible for any malicious, harmful or illegal use of this project. This is to show that it's possible to do this vulnerability within chess.com and it needs to be resolved.

## How to use
1. Clone this repository.
2. Make a codes.json file with a empty array. (Optional if you don't want to use `npm run main`)
3. Run `npm i` (Optional if you don't want to use `npm run lookup`)

## Choose how to run
You have 3 ways you can run this. You can do the following below:

`npm run main` - Grabs the promotional code of 50 top players playing blitz mode.

`npm run lookup` - Lookup a chess.com username to get their promotional code.

You can also copy the `web.js` script and insert it into tampermonkey or such.

## Known Issues
### All Scripts
Not all Nitro codes will be unclaimed, and it can be claimed by the user already.

You could may be ratelimited faster.

Sometimes cloudflare's bot detection will go off when making requests.

### Web

When the request gets a different status, it won't return a alert.

## License
This project is licensed under The [Unlicense](LICENSE).