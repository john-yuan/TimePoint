const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.parse', () => {

    it(`TimePoint.parse('2018-10-01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.parse('2018-10-01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.parse('2018/10/01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.parse('2018/10/01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.parse('2018-10-1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.parse('2018-10-1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.parse('2018/10/1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.parse('2018/10/1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.parse('2018-10-01 12:30:00').getTime() === 1538368200000`, () => {
        const t = TimePoint.parse('2018-10-01 12:30:00')
        const d = new Date(0)

        d.setFullYear(2018)
        d.setMonth(9) // month = 10 - 1
        d.setDate(1)
        d.setHours(12)
        d.setMinutes(30)
        d.setSeconds(0)

        assert.equal(t.getTime(), d.getTime())
    })

    it(`TimePoint.parse(1538368200000).getTime() === 1538368200000`, () => {
        const time = TimePoint.parse(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.parse('1538368200000').getTime() === 1538368200000`, () => {
        const time = TimePoint.parse(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.parse('2018-10-01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.parse('2018-10-01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`TimePoint.parse('2018/10/01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.parse('2018/10/01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`create TimePoint instance from a TimePoint instance`, () => {
        const t1 = new TimePoint()

        const d1 = Date.now();

        while ( ( Date.now() - d1 ) < 10 ) {
            // sleep 10ms
        }

        const t2 = new TimePoint(t1)

        assert.equal(t1.getTime(), t2.getTime())
    })

    it(`create TimePoint instance from a Date instance`, () => {
        const d = new Date()
        const t = new TimePoint(d)

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.parse() is the current time`, () => {
        const d = new Date()
        const t = new TimePoint()

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.parse(NaN).getTime() === TimePoint.parse().getTime()`, () => {
        const t1 = TimePoint.parse(NaN).getTime()
        const t2 = TimePoint.parse().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.parse(null).getTime() === TimePoint.parse().getTime()`, () => {
        const t1 = TimePoint.parse(null).getTime()
        const t2 = TimePoint.parse().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.parse(false).getTime() === TimePoint.parse().getTime()`, () => {
        const t1 = TimePoint.parse(false).getTime()
        const t2 = TimePoint.parse().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.parse(0).getTime() === new Date(0).getTime()`, () => {
        const t = TimePoint.parse(0)
        const d = new Date(0);

        assert.equal(t.getTime(), d.getTime())
    })

})