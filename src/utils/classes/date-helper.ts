type Units = {
	days?: number;
	weeks?: number;
	months?: number;
	years?: number;
};

type DateValue = string | number | Date;

type Constructor = {
	date: DateValue;
	weekStart: number;
};

type DateInfo = {
	isWeekend: boolean;
	isInCurrentMonth: boolean;
	isInCurrentYear: boolean;
	isBeforeMonthStart: boolean;
	isAfterMonthEnd: boolean;
	isToday: boolean;
	isBeforeToday: boolean;
	date: Date;
};

export class DateHelper {
	private weekStart: number;
	private date: Date;

	constructor(data?: Partial<Constructor>) {
		this.date = data?.date ? DateHelper.toDateObject(data.date) : new Date();
		this.weekStart = data?.weekStart ?? 0;
	}

	get raw(): Date {
		return new Date(this.date);
	}

	add(units: Partial<Units>): Date {
		const d = new Date(this.date);
		if (units.days) d.setDate(d.getDate() + units.days);
		if (units.weeks) d.setDate(d.getDate() + units.weeks * 7);
		if (units.months) d.setMonth(d.getMonth() + units.months);
		if (units.years) d.setFullYear(d.getFullYear() + units.years);
		return d;
	}

	sub(units: Partial<Units>): Date {
		const inverted: Units = {};
		if (units.days) inverted.days = -units.days;
		if (units.weeks) inverted.weeks = -units.weeks;
		if (units.months) inverted.months = -units.months;
		if (units.years) inverted.years = -units.years;
		return this.add(inverted);
	}

	addDays(days: number) {
		return this.add({ days });
	}
	addWeeks(weeks: number) {
		return this.add({ weeks });
	}
	addMonths(months: number) {
		return this.add({ months });
	}
	addYears(years: number) {
		return this.add({ years });
	}

	subDays(days: number) {
		return this.sub({ days });
	}
	subWeeks(weeks: number) {
		return this.sub({ weeks });
	}
	subMonths(months: number) {
		return this.sub({ months });
	}
	subYears(years: number) {
		return this.sub({ years });
	}

	ISO() {
		return DateHelper.ISO(this.date);
	}
	ISODate() {
		return DateHelper.ISODate(this.date);
	}
	ISOMonth() {
		return DateHelper.ISOMonth(this.date);
	}
	static ISO(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return d.toISOString();
	}
	static ISODate(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return d.toISOString().substring(0, 10);
	}
	static ISOMonth(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return d.toISOString().substring(0, 7);
	}

	getMonthMatrix(): DateInfo[][] {
		const year = this.date.getFullYear();
		const month = this.date.getMonth();

		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);

		const matrix: DateInfo[][] = [];
		const current = new Date(firstDay);

		const day = current.getDay();
		const diff = (day - this.weekStart + 7) % 7;
		current.setDate(current.getDate() - diff);

		do {
			const week: DateInfo[] = [];
			for (let i = 0; i < 7; i++) {
				const d = new Date(current);
				week.push(this.getDateInfo(d));
				current.setDate(current.getDate() + 1);
			}
			matrix.push(week);
		} while (current <= lastDay || current.getDay() !== this.weekStart);

		return matrix;
	}

	static stripTime(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), d.getMonth(), d.getDate());
	}
	stripTime() {
		return DateHelper.stripTime(this.date);
	}

	getDateInfo(date: DateValue): DateInfo {
		const d = DateHelper.toDateObject(date);
		const today = DateHelper.stripTime(new Date());
		const currentMonth = this.date.getMonth();
		const currentYear = this.date.getFullYear();

		const monthStart = new Date(currentYear, currentMonth, 1);
		const monthEnd = new Date(currentYear, currentMonth + 1, 0);

		const clean = DateHelper.stripTime(d);

		return {
			isWeekend: clean.getDay() === 0 || clean.getDay() === 6,
			isInCurrentMonth: clean.getMonth() === currentMonth,
			isInCurrentYear: clean.getFullYear() === currentYear,
			isBeforeMonthStart: clean < monthStart,
			isAfterMonthEnd: clean > monthEnd,
			isToday: clean.getTime() === today.getTime(),
			isBeforeToday: clean < today,
			date: clean,
		};
	}

	static range(start: Date, end: Date, step: 'day' | 'week' | 'month' = 'day'): Date[] {
		const dates: Date[] = [];
		const current = new Date(start);
		while (current <= end) {
			dates.push(new Date(current));
			if (step === 'day') current.setDate(current.getDate() + 1);
			if (step === 'week') current.setDate(current.getDate() + 7);
			if (step === 'month') current.setMonth(current.getMonth() + 1);
		}
		return dates;
	}
	isWeekend() {
		return DateHelper.isWeekend(this.date);
	}
	static isWeekend(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return d.getDay() === 0 || d.getDay() === 6;
	}
	isWeekday() {
		return DateHelper.isWeekday(this.date);
	}
	static isWeekday(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return !DateHelper.isWeekend(d);
	}
	daysInMonth() {
		return DateHelper.daysInMonth(this.date);
	}
	static daysInMonth(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
	}
	startOfMonth() {
		return DateHelper.startOfMonth(this.date);
	}
	static startOfMonth(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), d.getMonth(), 1);
	}
	endOfMonth() {
		return DateHelper.endOfMonth(this.date);
	}
	static endOfMonth(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), d.getMonth() + 1, 0);
	}
	startOfYear() {
		return DateHelper.startOfYear(this.date);
	}
	static startOfYear(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), 0, 1);
	}
	endOfYear() {
		return DateHelper.endOfYear(this.date);
	}
	static endOfYear(date: DateValue) {
		const d = DateHelper.toDateObject(date);
		return new Date(d.getFullYear(), 11, 31);
	}
	startOfWeek() {
		return DateHelper.startOfWeek(this.date, this.weekStart);
	}
	static startOfWeek(date: DateValue, firstDay: number = 0) {
		const d = new Date(DateHelper.toDateObject(date));
		const diff = (d.getDay() - firstDay + 7) % 7;
		d.setDate(d.getDate() - diff);
		return d;
	}
	endOfWeek() {
		return DateHelper.endOfWeek(this.date, this.weekStart);
	}
	static endOfWeek(date: DateValue, firstDay: number = 0) {
		const start = DateHelper.startOfWeek(date, firstDay);
		start.setDate(start.getDate() + 6);
		return start;
	}
	diff(other: DateValue, unit: 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y' = 'ms'): number {
		return DateHelper.diff(this.date, other, unit);
	}
	static diff(d1: DateValue, d2: DateValue, unit: 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y' = 'ms') {
		const dt1 = DateHelper.toDateObject(d1);
		const dt2 = DateHelper.toDateObject(d2);
		const ms = dt1.getTime() - dt2.getTime();
		switch (unit) {
			case 'ms':
				return ms;
			case 's':
				return ms / 1000;
			case 'm':
				return ms / 1000 / 60;
			case 'h':
				return ms / 1000 / 60 / 60;
			case 'd':
				return ms / 1000 / 60 / 60 / 24;
			case 'w':
				return ms / 1000 / 60 / 60 / 24 / 7;
			case 'M':
				return (dt1.getFullYear() - dt2.getFullYear()) * 12 + (dt1.getMonth() - dt2.getMonth());
			case 'y':
				return dt1.getFullYear() - dt2.getFullYear();
			default:
				return ms;
		}
	}
	static isValid(date: DateValue) {
		const d = date instanceof Date ? date : new Date(date);
		return !isNaN(d.getTime());
	}
	static toDateObject(date: DateValue) {
		const d = date instanceof Date ? date : new Date(date);
		if (!DateHelper.isValid(d)) {
			throw new Error('Invalid date');
		}
		return d;
	}
	static compare(dateA: DateValue, dateB: DateValue, unit: 'weekday' | 'month' | 'year' | 'date' = 'date'): boolean {
		const a = DateHelper.toDateObject(dateA);
		const b = DateHelper.toDateObject(dateB);

		if (unit === 'weekday') {
			return a.getDay() === b.getDay();
		}
		if (unit === 'month') {
			return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
		}
		if (unit === 'year') {
			return a.getFullYear() === b.getFullYear();
		}
		if (unit === 'date') {
			return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
		}
		return false;
	}
}
