import jsonLogic from 'json-logic-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  TComplexFilter,
  convertComplexFilterToJsonLogic,
  globalFilterFn,
} from './'; // Update with correct path

type Any = any;

describe('pages/TraditionalPattern/Filter/components/Complex/utils', () => {
  // Test custom json-logic operations
  describe('Custom json-logic operations', () => {
    it('should register and execute startsWith operation correctly', () => {
      // Test that startsWith operation works with valid strings
      const rule = { startsWith: ['hello world', 'hello'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(true);
    });

    it('should return false when startsWith receives non-matching prefix', () => {
      // Test startsWith with non-matching prefix
      const rule = { startsWith: ['hello world', 'world'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(false);
    });

    it('should return false when startsWith receives non-string arguments', () => {
      // Test type safety - should return false for invalid types
      const rule = { startsWith: [123, 'hello'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(false);
    });

    it('should register and execute endsWith operation correctly', () => {
      // Test that endsWith operation works with valid strings
      const rule = { endsWith: ['hello world', 'world'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(true);
    });

    it('should return false when endsWith receives non-matching suffix', () => {
      // Test endsWith with non-matching suffix
      const rule = { endsWith: ['hello world', 'hello'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(false);
    });

    it('should return false when endsWith receives non-string arguments', () => {
      // Test type safety - should return false for invalid types
      const rule = { endsWith: [null, 'test'] };
      const result = jsonLogic.apply(rule, {});
      expect(result).toBe(false);
    });
  });

  // Test convertComplexFilterToJsonLogic function
  describe('convertComplexFilterToJsonLogic', () => {
    it('should convert filter with "equals" type correctly', () => {
      // Test equals operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [{ type: 'equals', column: 'name', value: 'John' }] as Any,
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and).toHaveLength(2);
      expect(result.and[0]).toEqual({
        '==': [{ var: 'name' }, 'John'],
      });
    });

    it('should convert filter with "different" type correctly', () => {
      // Test not-equals operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [
          { type: 'different', column: 'status', value: 'inactive' },
        ] as Any,
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and[0]).toEqual({
        '!=': [{ var: 'status' }, 'inactive'],
      });
    });

    it('should convert filter with "bigger" type correctly', () => {
      // Test greater-than operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [{ type: 'bigger', column: 'age', value: 18 } as Any],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and[0]).toEqual({
        '>': [{ var: 'age' }, 18],
      });
    });

    it('should convert filter with "smaller" type correctly', () => {
      // Test less-than operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [{ type: 'smaller', column: 'age', value: 65 } as Any],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and[0]).toEqual({
        '<': [{ var: 'age' }, 65],
      });
    });

    it('should convert filter with "starts" type correctly', () => {
      // Test startsWith operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [{ type: 'starts', column: 'email', value: 'admin' } as Any],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and[0]).toEqual({
        startsWith: [{ var: 'email' }, 'admin'],
      });
    });

    it('should convert filter with "ends" type correctly', () => {
      // Test endsWith operator conversion
      const filter: TComplexFilter = {
        input: '',
        custom: [{ type: 'ends', column: 'email', value: '@test.com' } as Any],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      expect(result.and[0]).toEqual({
        endsWith: [{ var: 'email' }, '@test.com'],
      });
    });

    it('should convert filter with "contains" type with reversed operand order', () => {
      // Test contains operator - note the reversed order of operands
      const filter: TComplexFilter = {
        input: '',
        custom: [
          { type: 'contains', column: 'description', value: 'test' } as Any,
        ],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      // Contains type reverses the operand order
      expect(result.and[0]).toEqual({
        in: ['test', { var: 'description' }],
      });
    });

    it('should handle multiple custom filters combined with AND logic', () => {
      // Test multiple filters are combined correctly
      const filter: TComplexFilter = {
        input: 'search',
        custom: [
          { type: 'equals', column: 'status', value: 'active' },
          { type: 'bigger', column: 'age', value: 21 },
        ] as Any,
      };

      const result = convertComplexFilterToJsonLogic(filter);

      // Should have 2 custom filters + 1 OR clause for input = 3 total
      expect(result.and).toHaveLength(3);
      expect(result.and[0]).toEqual({ '==': [{ var: 'status' }, 'active'] });
      expect(result.and[1]).toEqual({ '>': [{ var: 'age' }, 21] });
    });

    it('should always add OR clause for email and friends input filter', () => {
      // Test that input filter is always added to search email and friends
      const filter: TComplexFilter = {
        input: 'john',
        custom: [],
      };

      const result = convertComplexFilterToJsonLogic(filter);

      // Should have only the OR clause
      expect(result.and).toHaveLength(1);
      expect(result.and[0]).toEqual({
        or: [
          { in: ['john', { var: 'email' }] },
          { in: ['john', { var: 'friends' }] },
        ],
      });
    });
  });

  // Test globalFilterFn
  describe('globalFilterFn', () => {
    let mockRow: Any;
    let consoleLogSpy: Any;

    beforeEach(() => {
      // Create a mock row with typical person data
      mockRow = {
        original: {
          id: 1,
          email: 'john.doe@example.com',
          name: 'John Doe',
          age: 30,
          friends: [{ name: 'Alice' }, { name: 'Bob' }],
        },
      };

      // Spy on console.log to verify error logging
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should return true when filter matches email', () => {
      // Test email field filtering
      const filters: TComplexFilter = {
        input: 'john.doe',
        custom: [],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should return true when filter matches friends', () => {
      // Test friends field filtering (joined with pipe separator)
      const filters: TComplexFilter = {
        input: 'Alice',
        custom: [],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should return false when no fields match the input filter', () => {
      // Test when input does not match any field
      const filters: TComplexFilter = {
        input: 'nonexistent',
        custom: [],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(false);
    });

    it('should apply custom filter with equals condition', () => {
      // Test custom filter logic with equals
      const filters: TComplexFilter = {
        input: '',
        custom: [{ type: 'equals', column: 'name', value: 'John Doe' } as Any],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should apply custom filter with bigger condition', () => {
      // Test numeric comparison (greater than)
      const filters: TComplexFilter = {
        input: '',
        custom: [{ type: 'bigger', column: 'age', value: 25 } as Any],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should return false when custom filter does not match', () => {
      // Test failed filter condition
      const filters: TComplexFilter = {
        input: '',
        custom: [{ type: 'equals', column: 'age', value: 40 } as Any],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(false);
    });

    it('should combine input filter and custom filters with AND logic', () => {
      // Test that both input and custom filters must match
      const filters: TComplexFilter = {
        input: 'john',
        custom: [{ type: 'bigger', column: 'age', value: 25 } as Any],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should return false when input matches but custom filter fails', () => {
      // Test AND logic - all conditions must be true
      const filters: TComplexFilter = {
        input: 'john',
        custom: [{ type: 'smaller', column: 'age', value: 20 } as Any],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(false);
    });

    it('should properly join friends array with pipe separator', () => {
      // Verify friends are formatted correctly for searching
      const filters: TComplexFilter = {
        input: 'Alice | Bob',
        custom: [],
      };

      const result = globalFilterFn(mockRow, null, filters);

      expect(result).toBe(true);
    });

    it('should return true and log error when json-logic throws exception', () => {
      // Test error handling - should not crash and return true
      const filters: TComplexFilter = {
        input: 'test',
        custom: [
          { type: 'equals', column: 'invalidColumn', value: undefined } as Any,
        ],
      };

      const result = globalFilterFn({ potato: [] } as Any, null, filters);

      // Should return true on error to avoid hiding rows
      expect(result).toBe(true);
    });

    it('should return true when json-logic result is undefined', () => {
      // Test undefined result handling (treats as true)
      // Create a scenario where result might be undefined
      const filters: TComplexFilter = {
        input: '',
        custom: [],
      };

      const result = globalFilterFn(mockRow, null, filters);

      // Empty filters with no input should return true
      expect(result).toBe(true);
    });

    it('should handle empty friends array correctly', () => {
      // Test with row that has no friends
      const rowWithoutFriends = {
        original: {
          id: 2,
          email: 'solo@example.com',
          friends: [],
        },
      } as Any;

      const filters: TComplexFilter = {
        input: 'solo',
        custom: [],
      };

      const result = globalFilterFn(rowWithoutFriends, null, filters);

      expect(result).toBe(true);
    });
  });
});
