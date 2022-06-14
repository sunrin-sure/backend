const getCookieTime = (time: string, type: 'expires' | 'maxage') => {
  const num = Number(time.replace(/[a-z]/gi, ''));
  const unit = time.replace(/[0-9]/g, '');

  let seconds: number;

  switch (unit) {
    case 'd': seconds = num * 3600 * 24; break;
    case 'h': seconds = num * 3600; break;
    case 'm': seconds = num * 60; break;
    case 's': seconds = num; break;
    default: return 0;
  }

  let result;
  if (type === 'expires') {
    result = new Date(Date.now() + (seconds * 1000));
  } else if (type === 'maxage') {
    result = seconds * 1000;
  }

  return result;
};

export default getCookieTime;
