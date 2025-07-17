/**
 * 格式化日期
 * @param date
 * @param format 日期格式 默认：yyyy-MM-dd HH:mm:ss
 * @return {string}
 */
export const formatDate = (
  date: string | number | Date = new Date(),
  format: string = 'yyyy-MM-dd HH:mm:ss',
): string => {
  const _date: Date = new Date(date);
  const o = {
    'M+': _date.getMonth() + 1, // 月份
    'd+': _date.getDate(), // 日
    'H+': _date.getHours(), // 小时
    'm+': _date.getMinutes(), // 分
    's+': _date.getSeconds(), // 秒
    'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
    S: _date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const [k, v] of Object.entries(o)) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? '' + v : ('00' + v).substr(('' + v).length),
      );
    }
  }
  return format;
};
