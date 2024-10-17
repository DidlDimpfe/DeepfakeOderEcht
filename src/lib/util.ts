export function generateUUID() {
  function getRandom16Bit() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    getRandom16Bit() +
    getRandom16Bit() +
    "-" +
    getRandom16Bit() +
    "-" +
    getRandom16Bit() +
    "-" +
    getRandom16Bit() +
    "-" +
    getRandom16Bit() +
    getRandom16Bit() +
    getRandom16Bit()
  );
}
