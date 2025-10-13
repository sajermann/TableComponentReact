import { describe, expect, it, vi } from 'vitest';
import { buildOptions, scrollToSection } from '.';

describe('components/RoutesConfig/Sidebar/TableOfContents/utils', () => {
  it('should build menu options from elements with data-tableofcontents attribute and set closest to header height as active', () => {
    // Setup: create elements with the needed attribute
    // Clean up the document before each test run
    document.body.innerHTML = '';
    const elem1 = document.createElement('section');
    elem1.setAttribute('data-tableofcontents', 'true');
    elem1.textContent = 'Section 1';

    const elem2 = document.createElement('section');
    elem2.setAttribute('data-tableofcontents', 'true');
    elem2.textContent = 'Section 2';

    document.body.appendChild(elem1);
    document.body.appendChild(elem2);

    // Mock getBoundingClientRect for both elements
    elem1.getBoundingClientRect = vi.fn(() => ({ top: 60 }) as DOMRect);
    elem2.getBoundingClientRect = vi.fn(() => ({ top: 90 }) as DOMRect);

    // Execute
    const result = buildOptions();

    // Expectations
    expect(result).toHaveLength(2);
    expect(result[0].active).toBe(true); // elem1 is closest to header height (goal = 72)
    expect(result[1].active).toBe(false);

    // The 'id' attribute should be set correctly
    expect(elem1.getAttribute('id')).toBe('0-SECTION-Section 1');
    expect(elem2.getAttribute('id')).toBe('1-SECTION-Section 2');
    // menu data integrity
    expect(result[0]).toMatchObject({
      type: 'SECTION',
      title: 'Section 1',
      anchor: '0-SECTION-Section 1',
      top: 60,
      active: true,
    });
    expect(result[1]).toMatchObject({
      type: 'SECTION',
      title: 'Section 2',
      anchor: '1-SECTION-Section 2',
      top: 90,
      active: false,
    });
  });

  it('should return an empty array when no matching elements are found', () => {
    document.body.innerHTML = '';
    const result = buildOptions();
    expect(result).toEqual([]);
  });

  it('should call scrollIntoView on the element with the provided ID', () => {
    document.body.innerHTML = '';
    const section = document.createElement('div');
    section.id = 'test-section';
    document.body.appendChild(section);

    // Mock scrollIntoView
    section.scrollIntoView = vi.fn();

    // Execute function
    scrollToSection('test-section');

    // Expectation: scrollIntoView has been called once
    expect(section.scrollIntoView).toHaveBeenCalledOnce();
  });

  it('should not throw or call scrollIntoView when element does not exist', () => {
    document.body.innerHTML = '';
    // No element with the given id
    expect(() => {
      scrollToSection('nonexistent-id');
    }).not.toThrow();
    // Nothing to assert about scrollIntoView as it is undefined
  });
});
