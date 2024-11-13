const unixToIso = (unixTimestamp) => {
  if (unixTimestamp > 9999999999) {
    unixTimestamp = Math.floor(unixTimestamp / 1000);
  }
  return new Date(unixTimestamp * 1000).toISOString();
};

export default unixToIso;
