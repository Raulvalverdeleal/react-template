import { StateOptions, BookingData, Product, ContactDetail, Shift } from '@types';
import { State, parseDate } from '@utils';
import { mocks } from '@assets';

export class Booking extends State<BookingData> {
	constructor(booking: Partial<BookingData>, options?: StateOptions) {
		super({ ...(mocks.default.booking as BookingData), ...booking }, options);

		if (!this.data.locator) {
			this.setData({ locator: this.generateLocator() });
		}
	}

	get locator() {
		return this.data.locator;
	}

	get date() {
		return this.data.date;
	}

	getDate(): Date | undefined {
		if (!this.data.date) return undefined;
		return new Date(this.data.date);
	}

	get shift() {
		return this.data.shift;
	}

	get amount() {
		return this.data.amount;
	}

	get lines() {
		return this.data.lines;
	}

	get name() {
		return this.data.name;
	}

	get email() {
		return this.data.email;
	}

	get acceptTerms() {
		return this.data.acceptTerms;
	}

	getLine(productId: number) {
		return this.lines.find((line) => line.productId === productId) ?? null;
	}

	private generateLocator(): string {
		const today = new Date();
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
		const letters = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
		const year = today.getFullYear().toString().slice(-2);
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${letters}-${year}${month}${day}`;
	}

	setDate(date?: Date | string | number) {
		if (!date) return this;

		const dateObj = date instanceof Date ? date : new Date(date);
		if (isNaN(dateObj.getTime()) || dateObj < new Date()) {
			this.setData({ date: null, shift: null, lines: [] });
			return this;
		}

		this.setData({
			date: parseDate('YYYY-MM-DD', dateObj),
			shift: null,
			lines: [],
		});

		return this;
	}

	setShift(shift: Omit<Shift, 'open'> | null) {
		this.setData({ shift, lines: [] });
		return this;
	}

	add(...products: Product[]) {
		const linesCopy = [...this.lines];
		for (const product of products) {
			const existing = linesCopy.find((line) => line.productId === product.id);
			if (existing) {
				existing.qty += 1;
			} else {
				linesCopy.push({
					productId: product.id,
					price: product.price,
					name: product.name,
					qty: 1,
				});
			}
		}
		this.setData({ lines: linesCopy });
		this.updateAmount();
		return this;
	}

	remove(...products: Product[]) {
		let linesCopy = [...this.lines];
		for (const product of products) {
			const line = linesCopy.find((line) => line.productId === product.id);
			if (line) {
				line.qty -= 1;
				if (line.qty <= 0) {
					linesCopy = linesCopy.filter((l) => l.productId !== product.id);
				}
			}
		}
		this.setData({ lines: linesCopy });
		this.updateAmount();
		return this;
	}

	setProduct(product: Product, qty: number) {
		let linesCopy = [...this.lines];
		const existingIndex = linesCopy.findIndex((line) => line.productId === product.id);

		if (qty <= 0) {
			linesCopy = linesCopy.filter((line) => line.productId !== product.id);
		} else if (existingIndex >= 0) {
			linesCopy[existingIndex].qty = qty;
		} else {
			linesCopy.push({
				productId: product.id,
				price: product.price,
				name: product.name,
				qty,
			});
		}
		this.setData({ lines: linesCopy });
		this.updateAmount();
		return this;
	}

	updateAmount() {
		const totalAmount = this.lines.reduce((acc, line) => acc + line.price * line.qty, 0);
		this.setData({ amount: totalAmount });
		return this;
	}

	setContactDetail(key: ContactDetail, value?: string) {
		const text = (value ?? '').substring(0, 250);
		this.setData({ [key]: text });
		return this;
	}

	setAcceptTerms(acceptTerms?: boolean) {
		this.setData({ acceptTerms: !!acceptTerms });
		return this;
	}

	setContactDetails(contactDetails: Record<ContactDetail, string>) {
		for (const [key, value] of Object.entries(contactDetails)) {
			if (Booking.isContactDetailKey(key)) {
				const text = value.substring(0, 250);
				this.setContactDetail(key, text);
			}
		}
		return this;
	}

	restart() {
		this.setData(mocks.default.booking as BookingData);
		return this;
	}

	load(data: Partial<BookingData>) {
		this.restart();
		this.setData(data);
		if (!this.data.locator) {
			this.setData({ locator: this.generateLocator() });
		}
		return this;
	}

	entries(): [string, string][] {
		const excluded = ['locator', 'amount', 'lines', 'shift'];
		const keys = Object.keys(this.data).filter((k) => !excluded.includes(k)) as (keyof typeof this.data)[];
		const productsRecord: Record<string, string> = {};
		const bookingRecord: Record<string, string> = {};

		for (const line of this.lines) {
			productsRecord[line.productId] = String(line.qty);
		}
		for (const key of keys) {
			bookingRecord[key] = String(this.data[key] ?? '');
		}
		if (this.shift) {
			bookingRecord['shiftId'] = String(this.shift.id);
			bookingRecord['shiftTime'] = this.shift.time;
		}
		return Object.entries({ ...bookingRecord, ...productsRecord });
	}

	toJSON() {
		return this.data;
	}

	toString() {
		const dateStr = this.date ?? 'N/A';
		const timeStr = this.shift ? this.shift.time : 'N/A';
		const name = this.name || 'N/A';
		const email = this.email || 'N/A';
		const linesDesc = this.lines.length
			? this.lines.map((line) => `- x${line.qty} ${line.name}`).join('\n')
			: '- No tickets selected';
		const total = this.amount ? `${this.amount}€` : '0€';

		return [
			`Booking Locator: ${this.locator}`,
			`Name: ${name}`,
			`Email: ${email}`,
			`Date: ${dateStr}`,
			`Time: ${timeStr}`,
			`Tickets:\n${linesDesc}`,
			`Total: ${total}`,
		].join('\n');
	}

	static isContactDetailKey(str: string): str is ContactDetail {
		const contactDetails = ['name', 'email'];
		return contactDetails.includes(str);
	}

	[Symbol.iterator]() {
		return this.entries()[Symbol.iterator]();
	}
}

export const booking = new Booking(mocks.default.booking as BookingData);
