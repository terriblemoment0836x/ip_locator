const API_KEY = "";
const DEBUGGIN = true;

const header = document.getElementsByClassName("header__title")[0];
if (API_KEY === "") header.innerText += " (NO API KEY FOUND)";
if (DEBUGGIN) header.innerText += " (DEBUG=true: NO API REQUESTS ARE MADE)";

const infoSpinner = document.getElementsByClassName("ip-info__spinner")[0];
let map;

function setupMap(lag, lat) {
    if (map != undefined) map.remove();
    map = L.map('map').setView([Number(lag), Number(lat)], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([Number(lag), Number(lat)]).addTo(map);
}

class IpInfo {

    #ip;
    validIp;
    #debug;
    #data;

    #debugData = {
                    "ip": "8.8.8.8",
                    "location": {
                        "country": "US",
                        "region": "California",
                        "city": "Mountain View",
                        "lat": 37.40599,
                        "lng": -122.078514,
                        "postalCode": "94043",
                        "timezone": "-07:00",
                        "geonameId": 5375481
                    },
                    "domains": [
                        "0d2.net",
                        "003725.com",
                        "0f6.b0094c.cn",
                        "007515.com",
                        "0guhi.jocose.cn"
                    ],
                    "as": {
                        "asn": 15169,
                        "name": "Google LLC",
                        "route": "8.8.8.0/24",
                        "domain": "https://about.google/intl/en/",
                        "type": "Content"
                    },
                    "isp": "Google Lorem recusandae similique numquam nobis consequatur Ab sit unde est ad enim. Tempora quae totam id consequuntur ipsam Iusto iure sed minus quod ab Obcaecati molestias natus earum placeat quaerat LLC"
                };

    constructor(ip = "local", debug = DEBUGGIN) {
        this.#ip = ip;
        this.validIp = this.#checkIp();
        this.#debug = debug;
    }

    #checkIp() {
        if (this.#ip === "local") return true
        if (this.#ip.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/) === null ) return false;
        return true
    }


    #getOptions() {
        if (this.#ip === "local") return "";
        return `&ipAddress=${this.#ip}`;
    }

    async fetchInfo()
    {
        if (!this.validIp) return null;

        if (this.#debug) console.log("sending request");

        if (! this.#debug)
        {
            const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=" + API_KEY + this.#getOptions());
            if (response.status != 200) {
                throw new Error("Api key is wrong");
            }
            const data = await response.json();
            return data;
        } else {
            return this.#debugData;
        }
    }

}




function populate(data) {

    const infoList = document.getElementsByClassName("ip-info__value");
    const ip = infoList[0];
    const loc = infoList[1];
    const zone = infoList[2];
    const isp = infoList[3];

    ip.innerText = data.ip;
    loc.innerText = `${data.location.region} , ${data.location.city} \n ${data.location.postalCode}`;
    zone.innerText = `UTC${data.location.timezone}`;
    isp.innerText = data.isp;

    setupMap(data.location.lat, data.location.lng);
}

const hostInfo = new IpInfo();
const hostInfoReq = hostInfo.fetchInfo();
hostInfoReq.then( (data) => populate(data) )
    .catch(alert)
    .finally(() => {infoSpinner.classList.add("ip-info__spinner--hidden");});

const ipBtn = document.getElementsByClassName("ip-input__btn")[0];
const ipInput = document.getElementsByClassName("ip-input__input")[0];
const ipInputCtn = document.getElementsByClassName("ip-input")[0];

ipBtn.addEventListener("click", (e) => {
    // debugger;
    const hostInfo = new IpInfo(ipInput.value);
    if (hostInfo.validIp) {
        infoSpinner.classList.remove("ip-info__spinner--hidden");
        const hostInfoReq = hostInfo.fetchInfo();
        hostInfoReq.then( (data) => populate(data) )
            .catch(alert)
            .finally(() => {infoSpinner.classList.add("ip-info__spinner--hidden");});
        ipInput.value = "";
    } else {

        ipInputCtn.classList.add("animate__animated", "animate__shakeX");
        ipInput.classList.add("ip-input__input--invalid")
        ipInputCtn.style.setProperty("--animate-duration", "0.7s");
        ipInputCtn.addEventListener("animationend", () => {
            ipInputCtn.classList.remove("animate__shakeX");
            ipInput.classList.remove("ip-input__input--invalid")
        });

        console.log("ip is invalid");
    }
})

// setupMap();

