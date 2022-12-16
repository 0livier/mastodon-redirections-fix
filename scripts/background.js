/* List extracted from https://joinmastodon.org/servers
 var names = [];

$('.b1.mb-2').each(function() {
  names.push($(this).text());
});

console.log(JSON.stringify(names));
 */

const safeUrls = [
  "https://ani.work",
  "https://aus.social",
  "https://awscommunity.social",
  "https://cloud-native.social",
  "https://computerfairi.es",
  "https://corteximplant.com",
  "https://creators.social",
  "https://cupoftea.social",
  "https://disabled.social",
  "https://discuss.systems",
  "https://epicure.social",
  "https://federated.press",
  "https://fosstodon.org",
  "https://glasgow.social",
  "https://hachyderm.io",
  "https://home.social",
  "https://hostux.social",
  "https://ieji.de",
  "https://indieweb.social",
  "https://infosec.exchange",
  "https://ioc.exchange",
  "https://is.nota.live",
  "https://kolektiva.social",
  "https://learningdisability.social",
  "https://libretooth.gr",
  "https://lor.sh",
  "https://machteburch.social",
  "https://maly.io",
  "https://mas.to",
  "https://masto.ai",
  "https://mastodon.au",
  "https://mastodon.green",
  "https://mastodon.ie",
  "https://mastodon.iow.social",
  "https://mastodon.nz",
  "https://mastodon.pirateparty.be",
  "https://mastodon.scot",
  "https://mastodon.sdf.org",
  "https://mastodon.world",
  "https://mastodonapp.uk",
  "https://mathstodon.xyz",
  "https://meow.social",
  "https://metalhead.club",
  "https://mindly.social",
  "https://mograph.social",
  "https://mstdn.ca",
  "https://mstdn.party",
  "https://newsie.social",
  "https://noc.social",
  "https://ohai.social",
  "https://peoplemaking.games",
  "https://phpc.social",
  "https://primarycare.app",
  "https://ravenation.club",
  "https://ruby.social",
  "https://seo.chat",
  "https://sfba.social",
  "https://socel.net",
  "https://social.bau-ha.us",
  "https://social.linux.pizza",
  "https://social.vivaldi.net",
  "https://sself.co",
  "https://tech.lgbt",
  "https://techhub.social",
  "https://theblower.au",
  "https://tilde.zone",
  "https://toot.community",
  "https://toot.funami.tech",
  "https://toot.io",
  "https://toot.site",
  "https://toot.wales",
  "https://uiuxdev.social",
  "https://union.place",
  "https://universeodon.com",
  "https://urbanists.social",
  "https://vmst.io",
  "https://x0r.be"
].sort();

// Look ma', a dichotomous search!
function isSafeUrl(url) {
  let start = 0;
  let end = safeUrls.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (url.startsWith(safeUrls[mid])) {
      return true;
    }
    if (safeUrls[mid] < url) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return false;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.startsWith("https://twitter.com/safety/unsafe_link_warning")) {
    // Extract the value of the unsafe_link parameter from the URL
    const urlParams = new URLSearchParams(tab.url.split("?")[1]);
    const presumablyUnsafeLink = urlParams.get("unsafe_link");
    if (isSafeUrl(presumablyUnsafeLink))
      chrome.tabs.update(tabId, { url: presumablyUnsafeLink });
    return;
  }
});
