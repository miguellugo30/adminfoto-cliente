import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  }

  getItemOne(key: string) {
    const data = localStorage.getItem(key);

    return data;
  }
  // Remove a value from local storage
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }

}
