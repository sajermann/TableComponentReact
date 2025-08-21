import { describe, expect, it } from 'vitest';
import { formatDate } from '.';

describe('Validate formatDate', () => {
	it('Must result correct Date in Format (DD/MM/YYYY) with parameter correct', () => {
		const fixture = '2021-01-01T15:00:00Z';
		const result = formatDate(new Date(fixture));
		expect(result).toEqual(
			new Intl.DateTimeFormat('pt-BR', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			}).format(new Date(fixture))
		);
	});

	it('Must result empty string with parameter incorrect', () => {
		const result = formatDate(new Date(''));
		expect(result).toEqual('');
	});
});
