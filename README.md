# node-lol

This is a Node.js client to the official League of Legends API by Riot Games. For more information please visit https://developer.riotgames.com.

# Example Usage

In order to use this library you need to obtain an API key by registering on the Riot Games Developer website (https://developer.riotgames.com).

## Getting information about recent games for a summoner

```javascript
	var lol = require('node-lol-client');
	var format = require('util').format;

	var config = {
		"url": "https://prod.api.pvp.net",
		"region": "na",
		"apiKey": "<YOUR_API_KEY>"
	};

	var client = lol.createClient(config);
	var summonerId;

	// Get summonerId by summoner name
	client.summonerByName([ 'dyrus' ], onSummoner);

	function onSummoner(err, summoners) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
    	summonerId = summoners['dyrus'].id;

		// Get recent games by summonerId
		client.gameBySummoner(summonerId, function (err2, obj) {
			if (err2) {
				console.error(err2);
				process.exit(1);
			}
			var games = obj.games;

			console.log('GAME ID     GAME TYPE     GAME SUBTYPE     WIN?');
			games.forEach(function (game) {
				console.log(format('%d  %s  %s  %s', game.gameId, game.gameType,
					game.subType, game.stats.win));
			});

		    lol.close();
		});
	}
```

# Client Reference

The following is the list of supported versions per API endpoint:

```
CHAMPION_VERSION = 'v1.1';
GAME_VERSION = 'v1.3';
LEAGUE_VERSION = 'v2.3';
STATS_VERSION = 'v1.2';
SUMMONER_VERSION = 'v1.3';
STATIC_VERSION = 'v1';
```

### Conventions

- Response objects are not modified by this client. For this reason you can refer to the official website for the response formats of every function
- Every callback invoked by this client is in the form of cb(err, object). As noted above, the format of the object is subject to the official API documentation
- Every function tries to be consistent with each endpoint in terms of singular and plural word usage. For this reason there are functiones such as gameBySummoner() instead of gamesBySummoner(), as they directly match the "/game/by-summoner/{version/recent endpoint". But, suggestions are welcome!

## client.champion(options, cb)

Retrieve all champions that exist in the game.

- `options`: This argument is the equivalent to the query parameters documented
		   in the API

## client.gameBySummoner(id, cb)

Retrieve all recent games by summonerId.

- `id`: summonerId

### TODO

Finish functions documentation

# Installation

```javascript
npm install node-lol-client
```

## License

The MIT License (MIT)

Copyright (c) 2013 Andres Rodriguez

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

