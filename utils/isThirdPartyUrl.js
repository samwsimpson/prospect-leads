
export function isThirdPartyUrl(url) {
  const thirdPartyDomains = [
    'facebook.com',
    'instagram.com',
    'tripadvisor.com',
    'opentable.com',
    'grubhub.com',
    'doordash.com',
    'ubereats.com',
    'yelp.com',
    'menuu.com',
    'menupix.com',
    'zomato.com',
    'allmenus.com'
  ];
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    return thirdPartyDomains.some(domain => hostname.includes(domain));
  } catch (e) {
    return false;
  }
}
