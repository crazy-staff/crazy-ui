import '@testing-library/jest-dom/vitest';

// jsdom has no IntersectionObserver (motion's whileInView, scroll spies)
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver ??= IO as unknown as typeof IntersectionObserver;
