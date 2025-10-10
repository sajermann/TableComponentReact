import { TMenu } from '../types';

export function buildOptions(): TMenu[] {
  const menus: TMenu[] = [];
  const subs = document.querySelectorAll('[data-tableofcontents="true"]');
  for (let i = 0; i < subs.length; i += 1) {
    menus.push({
      type: subs[i].nodeName,
      title: subs[i].textContent || '',
      anchor: `${i}-${subs[i].nodeName}-${subs[i].textContent}`,
      top: subs[i].getBoundingClientRect().top,
      active: false,
    });
    subs[i].setAttribute(
      'id',
      `${i}-${subs[i].nodeName}-${subs[i].textContent}`,
    );
  }
  const goal = 72; /* Height Header */

  if (menus.length === 0) {
    return [];
  }
  const closest = menus.reduce((prev, curr) =>
    Math.abs(curr.top - goal) < Math.abs(prev.top - goal) ? curr : prev,
  );

  const menusWithActive = menus.map(item => {
    if (item.anchor === closest.anchor) {
      return { ...item, active: true };
    }
    return item;
  });

  return [...menusWithActive];
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView();
}
