/**
 * A simple localStorage service with TypeScript support
 * Provides basic CRUD operations without any dependencies
 */

// Base item type that requires an id
export interface StorageItem {
  id: string;
  [key: string]: any;
}

export class LocalStorageService<T extends StorageItem> {
  private storageKey: string;

  /**
   * Creates a new storage service for a specific key
   * @param storageKey The key to use in localStorage
   */
  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  /**
   * Get all items from localStorage
   * @returns Array of items or empty array if nothing found
   */
  getItemList(): T[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error getting items from localStorage (${this.storageKey}):`, error);
    }
    return [];
  }

  /**
   * Set the entire list of items in localStorage
   * @param items Array of items to store
   */
  setItems(items: T[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error(`Error setting items in localStorage (${this.storageKey}):`, error);
      throw new Error(`Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a specific item by ID
   * @param id The ID of the item to retrieve
   * @returns The item if found, undefined otherwise
   */
  getItem(id: string): T | undefined {
    const items = this.getItemList();
    return items.find(item => item.id === id);
  }

  /**
   * Add a new item to storage
   * @param item The item to add
   * @returns The added item
   * @throws Error if item with same ID already exists
   */
  addItem(item: T): T {
    if (!item.id) {
      throw new Error("Item must have an ID property");
    }

    const items = this.getItemList();

    if (items.some(existingItem => existingItem.id === item.id)) {
      throw new Error(`Item with ID ${item.id} already exists`);
    }

    const updatedItems = [...items, item];
    this.setItems(updatedItems);

    return item;
  }

  deepMerge<U>(target: U, source: Partial<U>): U {
    const output = { ...target } as any;

    if (this.isObject(target) && this.isObject(source)) {
      Object
        .keys(source)
        .forEach(key => {
          if (this.isObject((source as any)[key])) {
            if (!(key in target)) {
              Object.assign(output, { [key]: (source as any)[key] });
            } else {
              output[key] = this.deepMerge(target[key], (source as any)[key]);
            }
          } else {
            Object.assign(output, { [key]: (source as any)[key] });
          }
        });
    }

    return output;
  }

  isObject(item: any): item is Record<string, any> {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Update an existing item by ID using either partial or full item data
   * @param id The ID of the item to update
   * @param partialOrFullItem Either a partial or complete item object
   * @param isMerged If true, deeply merges the update with existing data; if false, shallow merges (default: true)
   * @returns The updated item
   * @throws Error if item not found
   */
  updateItem<T extends { id: string }>(
    id: string,
    partialOrFullItem: Partial<T>,
    isMerged: boolean = true
  ): T {
    // Get all items
    const items = this.getItemList();

    // Find the item to update
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      throw new Error(`Item with ID ${id} not found`);
    }

    const existingItem = (items as any)[itemIndex] as T;
    let updatedItem: T;

    if (isMerged) {
      // Deep merge implementation
      updatedItem = this.deepMerge(existingItem, partialOrFullItem);
    } else {
      // Shallow merge (Object.assign behavior)
      updatedItem = { ...existingItem, ...partialOrFullItem };
    }

    // Ensure the ID stays the same
    updatedItem.id = id;

    // Update the items array
    (items as any)[itemIndex] = updatedItem;

    this.setItems(items);

    return updatedItem;
  }

  /**
   * Delete an item by ID
   * @param id The ID of the item to delete
   * @returns true if item was deleted, false if not found
   */
  deleteItem(id: string): boolean {
    const items = this.getItemList();
    const initialLength = items.length;

    const filteredItems = items.filter(item => item.id !== id);

    if (filteredItems.length !== initialLength) {
      this.setItems(filteredItems);
      return true;
    }

    return false;
  }

  /**
   * Check if an item exists
   * @param id The ID to check
   * @returns true if item exists, false otherwise
   */
  hasItem(id: string): boolean {
    const items = this.getItemList();
    return items.some(item => item.id === id);
  }

  /**
   * Delete all items from storage
   */
  clearItems(): void {
    this.setItems([]);
  }

  /**
   * Get the count of items in storage
   * @returns Number of items
   */
  count(): number {
    return this.getItemList().length;
  }
}