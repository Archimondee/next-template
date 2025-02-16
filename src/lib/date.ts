import { add, format, parse } from "date-fns"
declare global {
	interface Date {
		datetimeZoned(): string
		timeZoned(): string
		timeZonedTime(): string
		zoneOnly(): string
		timeOnly(): string
		toMysql(): string
		toMysqlDate(): string
		dateOnly(): string
		dt(): string
		tm(): string
		dttm(): string
	}
}

// eslint-disable-next-line no-extend-native
Date.prototype.timeZoned = function () {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]
	const day = this.getDate()
	const monthIndex = this.getMonth()
	const monthName = monthNames[monthIndex]
	const year = this.getFullYear()
	const hour = `0${this.getHours()}`.slice(-2)
	const minute = `0${this.getMinutes()}`.slice(-2)
	const tz = this.toLocaleDateString("en-US", {
		day: "2-digit",
		timeZoneName: "short",
	}).slice(4)
	return `${day} ${monthName} ${year} ${hour}:${minute} ${tz}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.dttm = function () {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	]
	const day = this.getDate()
	const monthIndex = this.getMonth()
	const monthName = monthNames[monthIndex]
	const year = this.getFullYear()
	const hour = `0${this.getHours()}`.slice(-2)
	const minute = `0${this.getMinutes()}`.slice(-2)
	return `${day} ${monthName} ${year} ${hour}:${minute}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.tm = function () {
	const hour = `0${this.getHours()}`.slice(-2)
	const minute = `0${this.getMinutes()}`.slice(-2)
	return `${hour}:${minute}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.dt = function () {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	]
	const day = this.getDate()
	const monthIndex = this.getMonth()
	const monthName = monthNames[monthIndex]
	const year = this.getFullYear()
	return `${day} ${monthName} ${year}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.datetimeZoned = Date.prototype.timeZoned

// eslint-disable-next-line no-extend-native
Date.prototype.timeZonedTime = function () {
	const hour = `0${this.getHours()}`.slice(-2)
	const minute = `0${this.getMinutes()}`.slice(-2)
	const tz = this.toLocaleDateString("en-US", {
		day: "2-digit",
		timeZoneName: "short",
	}).slice(4)
	return `${hour}:${minute} ${tz}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.timeOnly = function () {
	const hour = `0${this.getHours()}`.slice(-2)
	const minute = `0${this.getMinutes()}`.slice(-2)
	const tz = this.toLocaleDateString("en-US", {
		day: "2-digit",
		timeZoneName: "short",
	}).slice(4)
	return `${hour}:${minute}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.zoneOnly = function () {
	const tz = this.toLocaleDateString("en-US", {
		day: "2-digit",
		timeZoneName: "short",
	}).slice(4)
	return `${tz}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.toMysql = function () {
	// const { format } = require('date-fns');
	const dt = format(this, "yyyy-MM-dd HH:mm:ss")
	return `${dt}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.toMysqlDate = function () {
	// const { format } = require('date-fns');
	const dt = format(this, "yyyy-MM-dd")
	return `${dt}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.dateOnly = function () {
	// const { format } = require('date-fns');
	const dt = format(this, "yyyy/MM/dd")
	return `${dt}`
}

function isValidDate(d: any) {
	return d instanceof Date
}

function calcAge(dob: Date) {
	const diff_ms = Date.now() - dob.getTime()
	const age_dt = new Date(diff_ms)
	return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export const DateFromISO = (str: string | undefined) => {
	// const { parse } = require('date-fns');
	const dt = parse(str ?? "", "yyyy-MM-dd HH:mm:ss", new Date())
	return dt
}

// Function to convert duration to date
export function convertDurationToDate(
	durationValue: number | null,
	durationUnit: string | null,
): string | null {
	const today = new Date()

	let date: Date

	if (durationValue && durationUnit) {
		if (durationUnit === "day") {
			date = add(today, { days: durationValue })
		} else if (durationUnit === "week") {
			date = add(today, { weeks: durationValue })
		} else if (durationUnit === "month") {
			date = add(today, { months: durationValue })
		} else if (durationUnit === "year") {
			date = add(today, { years: durationValue })
		} else {
			// throw new Error('Invalid duration unit');
			return new Date().toMysqlDate()
		}
	} else {
		return null
	}

	return date.toMysqlDate()
}

// Function to convert durationUnit to Indonesian Language
export function convertDurationToInd(
	durationValue: number | null,
	durationUnit: string | null,
): string {
	const today = new Date()

	if (durationValue && durationUnit) {
		if (durationUnit === "day") {
			return `${durationValue} Hari`
		}
		if (durationUnit === "week") {
			return `${durationValue} Minggu`
		}
		if (durationUnit === "month") {
			return `${durationValue} Bulan`
		}
		if (durationUnit === "year") {
			return `${durationValue} Tahun`
		}
		return "Unlimited"
	}
	return "Unlimited"
}

export function validDateTime(param: string): boolean {
	return param !== "0000-00-00 00:00:00"
}

export function validDate(param: string): boolean {
	return param !== "0000-00-00"
}

export const defaultDate = "0000-00-00"

export const defaultDateTime = "0000-00-00 00:00:00"

export { isValidDate, calcAge }
