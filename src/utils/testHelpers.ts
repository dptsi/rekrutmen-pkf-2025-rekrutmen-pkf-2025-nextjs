/**
 * This file contains utility functions to help with testing,
 * especially for Cypress integration tests.
 */

// Initialize globally available event flags for Cypress intercepts
export const initCypressEvents = (): void => {
  if (typeof window !== 'undefined') {
    // Set up a global object for Cypress intercepts
    (window as any).cypressEvents = {
      createTodoRequest: false,
      updateTodoStatusRequest: false,
      deleteTodoRequest: false,
      bulkDeleteTodoRequest: false
    };

    // Create a global function to reset all events
    (window as any).resetCypressEvents = () => {
      (window as any).cypressEvents = {
        createTodoRequest: false,
        updateTodoStatusRequest: false,
        deleteTodoRequest: false,
        bulkDeleteTodoRequest: false
      };
    };
  }
};

// Helper for triggering events that Cypress can intercept
export const triggerCypressEvent = (eventName: string): void => {
  if (
    typeof window !== 'undefined' &&
    (window as any).Cypress &&
    (window as any).cypressEvents
  ) {
    (window as any).cypressEvents[eventName] = true;
  }
};

// Helper for checking if we're in a Cypress test environment
export const isCypressTest = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).Cypress;
}; 