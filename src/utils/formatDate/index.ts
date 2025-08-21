/**
 * ### FormatDate
 * Format Date to string friendly
 * @example
 * ```js
 * formatDate("2021-01-01T00:00:00Z") // returns: "01/01/2021"
 * formatDate(null as unknown as Date) // returns: ""
 * ```
 */
export function formatDate(date: Date): string {
	try {
		return new Intl.DateTimeFormat('pt-BR', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		}).format(new Date(date));
	} catch {
		return '';
	}
}