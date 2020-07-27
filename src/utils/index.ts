// 是否为开发模式
const isDev: boolean = process.env.NODE_ENV === "development";

/**
 * @name randomStr
 * @desc 随机字符串
 * @param {number} len - 字符串长度
 */
function randomStr(len: number = 16): string {
  const string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l = string.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    const index = Math.floor((Math.random() * 100 * l) % l);
    str += string.charAt(index);
  }
  return str;
}

export { isDev, randomStr };
