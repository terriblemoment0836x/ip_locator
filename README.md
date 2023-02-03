# ip_locator 
Web app that fetchs information such as (isp, location) about an ip address (a [frontendmentor](www.frontendmentor.io) challenge).

Live version: [geoip-github.vercel.app](https://geoip-github.vercel.app/)

Solution page [https://www.frontendmentor.io/solutions/ip-address-tracker-GlFe9DE6Xg](https://www.frontendmentor.io/solutions/ip-address-tracker-GlFe9DE6Xg)

## Screenshot:

![Preview](https://github.com/terriblemoment0836x/ip_locator/raw/main/preview/sc1.png)


## Running it:
```bash 
 git clone https://github.com/terriblemoment0836x/ip_locator.git
 cd ip_locator
 yarn add lite-server scss npm-run-all
 yarn run live
```

### Setting your api key:
- Get an api key from [ipify](https://ipify.org).
- Edit the two first lines of [src/main.js](https://github.com/terriblemoment0836x/ip_locator/blob/main/src/main.js)
 ```javascript
const API_KEY = ""; // put your API key here
const DEBUGGIN = false; // set DEBUGGIN to false
```

