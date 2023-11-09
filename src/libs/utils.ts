import dayjs from "dayjs";

const utils = {
  /**
   * 时间戳转换为制定格式的字符串
   * @param timestamp 时间戳
   * @param format 格式
   */
  convertTimestamp: (timestamp: number, format = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(timestamp).subtract(8, "hour").format(format);
  },

  /**
   * 返回上一个页面
   */
  backToPrevPage: () => {
    window.history.back();
  },
};

export default utils;
