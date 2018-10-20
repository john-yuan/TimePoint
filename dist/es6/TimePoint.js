var TimePoint = (function () {
    'use strict';

    // 时间单位常量
    var DAY = 86400000;
    var HOUR = 3600000;
    var MINUTE = 60000;
    var SECOND = 1000;

    /**
     * TimePoint 类
     *
     * @class
     * @param {string|number|Date|TimePoint} [time=null]
     * @returns {TimePoint}
     */
    var TimePoint = function (time) {
        this._time = TimePoint.parseTime(time);
    };

    /**
     * 获取对应的毫秒数
     *
     * @returns {number}
     */
    TimePoint.prototype.getTime = function () {
        return this._time;
    };

    /**
     * 获取对应的日期对象
     *
     * @returns {Date}
     */
    TimePoint.prototype.getDate = function () {
        return new Date(this.getTime());
    };

    /**
     * 克隆当前对象
     *
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.clone = function () {
        return new TimePoint(this.getTime());
    };

    /**
     * clone 函数的别名
     *
     * @see TimePoint#clone
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.copy = function () {
        return this.clone();
    };

    /**
     * 移除当前时间点的毫秒部分
     *
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.clearMs = function () {
        var date = this.getDate();

        date.setMilliseconds(0);

        return new TimePoint(date.getTime());
    };

    /**
     * 添加毫秒数
     *
     * @param {number} sec 需要添加的毫秒数，可以为负数
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.addMs = function (ms) {
        ms = parseInt(ms, 10);
        ms = isNaN(ms) ? 0 : ms;
        return new TimePoint( this.getTime() + ms );
    };

    /**
     * 添加秒数
     *
     * @param {number} sec 需要添加的秒数，可以为负数
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.addSec = function (sec) {
        sec = parseInt(sec, 10);
        sec = isNaN(sec) ? 0 : sec;
        return new TimePoint( this.getTime() + ( sec * SECOND ) );
    };

    /**
     * 添加分钟数
     *
     * @param {number} min 需要添加的分钟数，可以为负数
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.addMin = function (min) {
        min = parseInt(min, 10);
        min = isNaN(min) ? 0 : min;
        return new TimePoint( this.getTime() + ( min * MINUTE ) );
    };

    /**
     * 添加小时数
     *
     * @param {number} hour 需要添加的小时数，可以为负数
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.addHour = function (hour) {
        hour = parseInt(hour, 10);
        hour = isNaN(hour) ? 0 : hour;
        return new TimePoint( this.getTime() + ( hour * HOUR ) );
    };

    /**
     * 添加天数
     *
     * @param {number} day 需要添加的天数，可以为负数
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.addDay = function (day) {
        day = parseInt(day, 10);
        day = isNaN(day) ? 0 : day;
        return new TimePoint( this.getTime() + ( day * DAY ) );
    };

    /**
     * 获取下一天
     *
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.nextDay = function () {
        return this.addDay(1);
    };

    /**
     * 获取前一天
     *
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.prevDay = function () {
        return this.addDay(-1);
    };

    /**
     * 根据当前 TimePoint 创建指定时间的新对象
     *
     * 此函数会保留当前日期的年、月、日部分，并根据传入的值设置时、分、秒，
     * 如果没有时、分、秒则默认设置为 0，毫秒值永远为 0。
     *
     * @example timePoint.at('12:00:00')
     * @param {string} time
     * @returns {TimePoint} 一个新的 TimePoint 实例
     */
    TimePoint.prototype.at = function (time) {
        var date = this.getDate();

        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        // 1. '12:30:59'
        // 2. '12:30'
        // 3. '12' 或者 12
        time = ('' + (time || 0)).replace(/^\s+|\s+$/, '').split(':');

        var hour = parseInt(time[0], 10);
        var minute = parseInt(time[1], 10);
        var second = parseInt(time[2], 10);

        if (!isNaN(hour)) {
            date.setHours(hour);
        }

        if (!isNaN(minute)) {
            date.setMinutes(minute);
        }

        if (!isNaN(second)) {
            date.setSeconds(second);
        }

        return new TimePoint(date.getTime());
    };

    /**
     * 解析当前时间，并返回时间组件的映射表
     *
     * @returns {object} 时间组件映射表
     */
    TimePoint.prototype.map = function () {
        var date = new Date(this.getTime());
        var YYYY = date.getFullYear();
        var YY   = (YYYY + '').substr(-2);
        var M    = date.getMonth() + 1;
        var MM   = M < 10 ? ('0' + M) : M;
        var D    = date.getDate();
        var DD   = D < 10 ? ('0' + D) : D;
        var h    = date.getHours();
        var hh   = h < 10 ? ('0' + h) : h;
        var m    = date.getMinutes();
        var mm   = m < 10 ? ('0' + m) : m;
        var s    = date.getSeconds();
        var ss   = s < 10 ? ('0' + s) : s;
        var S    = date.getMilliseconds();
        var SS   = S < 10 ? ('0' + S) : S;
        var SSS  = S < 100 ? ('0' + SS) : S;

        return {
            YYYY: '' + YYYY,
            YY: '' + YY,
            M: '' + M,
            MM: '' + MM,
            D: '' + D,
            DD: '' + DD,
            h: '' + h,
            hh: '' + hh,
            m: '' + m,
            mm: '' + mm,
            s: '' + s,
            ss: '' + ss,
            S: '' + S,
            SS: '' + SS,
            SSS: '' + SSS
        };
    };

    /**
     * 格式化当前时间
     *
     * @param {string} [format='YYYY-MM-DD hh:mm:ss']
     * @returns {string}
     */
    TimePoint.prototype.format = function (format) {
        if (typeof format !== 'string') {
            format = 'YYYY-MM-DD hh:mm:ss';
        }

        var map = this.map();

        format = format.replace(/YYYY/g, map.YYYY);
        format = format.replace(/YY/g, map.YY);
        format = format.replace(/MM/g, map.MM);
        format = format.replace(/M/g, map.M);
        format = format.replace(/DD/g, map.DD);
        format = format.replace(/D/g, map.D);
        format = format.replace(/hh/g, map.hh);
        format = format.replace(/h/g, map.h);
        format = format.replace(/mm/g, map.mm);
        format = format.replace(/m/g, map.m);
        format = format.replace(/ss/g, map.ss);
        format = format.replace(/s/g, map.s);

        return format;
    };

    /**
     * format 函数的别名
     *
     * @see TimePoint#format
     * @param {string} [format='YYYY-MM-DD hh:mm:ss']
     * @returns {string}
     */
    TimePoint.prototype.toString = function (format) {
        return this.format(format);
    };

    ///////////////////////////////////////////////////////////////////////////

    /**
     * 创建一个新的 TimePoint 对象
     *
     * @param {string|number|Date|TimePoint} [time=null]
     * @returns {TimePoint}
     */
    TimePoint.create = function (time) {
        return new TimePoint(time);
    };

    /**
     * 获取本地当前时间对应的毫秒数
     *
     * @returns {number}
     */
    TimePoint.now = function () {
        return (new Date()).getTime();
    };

    /**
     * 获取今天的某个时间点对应的 TimePoint
     *
     * @see TimePoint#at
     * @param {string} time
     * @returns {TimePoint}
     */
    TimePoint.at = function (time) {
        return TimePoint.create().at(time);
    };

    /**
     * 获取两个时间之间的毫秒差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.timeDiff = function (start, end) {
        var t1 = new TimePoint(start);
        var t2 = new TimePoint(end);

        return t2.getTime() - t1.getTime();
    };

    /**
     * 获取两个时间之间的秒差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.secDiff = function (start, end) {
        return TimePoint.timeDiff(start, end) / SECOND;
    };

    /**
     * 获取两个时间之间的分钟差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.minDiff = function (start, end) {
        return TimePoint.timeDiff(start, end) / MINUTE;
    };

    /**
     * 获取两个时间之间的小时差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.hourDiff = function (start, end) {
        return TimePoint.timeDiff(start, end) / HOUR;
    };

    /**
     * 获取两个时间之间的天数差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.dayDiff = function (start, end) {
        return TimePoint.timeDiff(start, end) / DAY;
    };

    /**
     * 获取两个时间之间的天数差
     *
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {number}
     */
    TimePoint.dayDiffWithoutTime = function (start, end) {
        var t1 = new TimePoint(start);
        var t2 = new TimePoint(end);

        t1 = t1.at('08:00:00');
        t2 = t2.at('08:00:00');

        return TimePoint.dayDiff(t1, t2);
    };

    /**
     * 获取时间差的详细信息
     *
     * @see TimePoint#timeDiff
     * @see TimePoint#parseTimeDiff
     * @param {number|string|Date|TimePoint} start
     * @param {number|string|Date|TimePoint} end
     * @returns {Object}
     */
    TimePoint.timeDiffDetail = function (start, end) {
        return TimePoint.parseTimeDiff(TimePoint.timeDiff(start, end));
    };

    /**
     * 解析时间差的详细信息
     *
     * @param {number} diff
     * @returns {Object}
     */
    TimePoint.parseTimeDiff = function (diff) {
        diff = parseInt(diff, 10);
        diff = isNaN(diff) ? 0 : diff;

        var sign = 0;

        if (diff > 0) {
            sign = 1;
        } else if (diff < 0) {
            sign = -1;
            diff = -diff;
        }

        var day = Math.floor(diff / DAY);

        diff = diff - day * DAY;

        var hour = Math.floor(diff / HOUR);

        diff = diff - hour * HOUR;

        var min = Math.floor(diff / MINUTE);

        diff = diff - min * MINUTE;

        var sec = Math.floor(diff / SECOND);

        diff = diff - sec * SECOND;

        var ms = diff;

        return {
            day: day,
            hour: hour,
            min: min,
            sec: sec,
            ms: ms,
            sign: sign
        };
    };

    /**
     * 检查指定年份是不是闰年
     *
     * @param {number} year 年份
     * @returns {boolean} 如果是闰年则返回 true，否则返回 false
     */
    TimePoint.isLeapYear = function (year) {
        year = parseInt(year, 10);
        year = isNaN(year) ? 0 : year;

        if (year % 100 === 0) {
            return year % 400 === 0;
        } else {
            return year % 4 === 0;
        }
    };

    /**
     * 查询指定月份的最后一天
     *
     * @param {number} year
     * @param {number} month
     * @returns {number}
     */
    TimePoint.lastDayInMonth = function (year, month) {
        year = parseInt(year, 10);
        year = isNaN(year) ? 0 : year;

        month = parseInt(month, 10);
        month = isNaN(month) ? 0 : (month - 1);

        var dayMap = {
            0: 31,
            1: TimePoint.isLeapYear(year) ? 29 : 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        };

        return dayMap[month];
    };

    /**
     * 将时间字符串、数字、Date 或者 TimePoint 转换为对应的毫秒数。
     *
     * @param {number|string|Date|TimePoint} [time=null]
     * @returns {number}
     */
    TimePoint.parseTime = function (time) {
        var type = typeof time;

        // 检查是不是日期字符串
        // 1. '1538366400000'
        // 2. '2018-10-01 12:00:00' 或 '2018-10-1 12:0:0'
        // 3. '2018/10/01 12:00:00' 或 '2018/10/1 12:0:0'
        // 4. '2018-10-01' 或 '2018/10/01'
        if (type === 'string') {
            var num = 0;
            var isNumberString = false;

            // 移除首尾空白字符
            time = time.replace(/^\s+|\s+$/g, '');

            // 检查是不是数字字符串，比如：'1538366400000'
            if (/^[0-9]+$/.test(time)) {
                num = parseInt(time, 10);
                isNumberString = !isNaN(num);
            }

            if (isNumberString) {
                time = num;
            } else {
                // 移除 -、/、: 周围的空格
                time = time.replace(/\s*\-\s*/g, '-');
                time = time.replace(/\s*\/\s*/g, '/');
                time = time.replace(/\s*\:\s*/g, ':');
                // 将日期字符串拆分为数组
                time = time.split(/\s+|\-|\/|\:/);

                var year = parseInt(time[0], 10);
                var month = parseInt(time[1], 10);
                var day = parseInt(time[2], 10);
                var hour = parseInt(time[3], 10);
                var minute = parseInt(time[4], 10);
                var second = parseInt(time[5], 10);

                var date = new Date(0);

                date.setHours(0);

                if (!isNaN(year)) {
                    date.setFullYear(year);
                }

                if (!isNaN(month)) {
                    date.setMonth(month - 1);
                }

                if (!isNaN(day)) {
                    date.setDate(day);
                }

                if (!isNaN(hour)) {
                    date.setHours(hour);
                }

                if (!isNaN(minute)) {
                    date.setMinutes(minute);
                }

                if (!isNaN(second)) {
                    date.setSeconds(second);
                }

                time = date.getTime();
            }
        // 如果类型为数字则什么都不做
        } else if (type === 'number') {
            // 什么都不做
        // 检查是不是 Date 对象
        } else if (time instanceof Date) {
            try {
                time = time.getTime();
            } catch (e) {
                time = 0;
            }
        // 检查是不是 TimePoint 对象
        } else if (time && typeof time._time === 'number') {
            time = time._time;
        // 如果以上都不是则返回当前时间
        } else {
            time = TimePoint.now();
        }

        return isNaN(time) ? TimePoint.now() : time;
    };

    // 导出接口
    return TimePoint;
})();

export default TimePoint;