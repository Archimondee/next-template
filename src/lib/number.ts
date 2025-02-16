import numeral from "numeral"

// ----------------------------------------------------------------------
;(() => {
	numeral.register("locale", "id", {
		delimiters: {
			thousands: ".",
			decimal: ",",
		},
		abbreviations: {
			thousand: "rb",
			million: "jt",
			billion: "m",
			trillion: "t",
		},
		ordinal: () => ".",
		currency: {
			symbol: "Rp",
		},
	})
	numeral.locale("id") // use new locale
})()

export function fCurrency(number: string | number) {
	return numeral(number).format(Number.isInteger(number) ? "$ 0,0" : "$ 0,0")
}

export function fPercent(number: number) {
	return numeral(number / 100).format("0.0%")
}

export function fNumber(number: string | number) {
	return numeral(number).format()
}

export function fShortenNumber(number: string | number) {
	return numeral(number).format("0.00a").replace(".00", "")
}

export function fData(number: string | number) {
	return numeral(number).format("0.0 b")
}
