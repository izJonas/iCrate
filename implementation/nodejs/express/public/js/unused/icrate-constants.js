export let icrateActiveSite = document.location.pathname;
if (icrateActiveSite === '/') {
    icrateActiveSite = 'login';
}

import jsonSiteIndex from '../json/icrate-site-index.json' assert { type: "json" };
console.log(jsonSiteIndex);

export const icrateSiteIndex = jsonSiteIndex;

window.icrateSiteIndex = icrateSiteIndex;