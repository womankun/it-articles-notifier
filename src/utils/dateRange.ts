export const getYesterdayRangeJST = () => {
  const end = new Date();
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setDate(start.getDate() - 1);

  return { start, end };
};

export const getYesterdayRangeUTC = () => {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setUTCDate(start.getDate() - 1);

  return { start, end };
};
