import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Create storage instance
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Set a value
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Get a value
  async get(key: string) {
    return await this._storage?.get(key);
  }

  // Remove a value
  async remove(key: string) {
    await this._storage?.remove(key);
  }

  // Clear all data
  async clear() {
    await this._storage?.clear();
  }
}
