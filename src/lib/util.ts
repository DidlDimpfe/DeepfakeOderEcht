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

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage === totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
