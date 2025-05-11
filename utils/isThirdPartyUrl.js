export function isThirdPartyUrl(url) {
  const thirdPartyPatterns = [
    /facebook\.com/i,
    /instagram\.com/i,
    /opentable\.com/i,
    /grubhub\.com/i,
    /ubereats\.com/i,
    /doordash\.com/i,
    /yelp\.com/i,
    /tripadvisor\.com/i
  ];
  return thirdPartyPatterns.some(pattern => pattern.test(url));
}