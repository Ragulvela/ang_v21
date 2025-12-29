import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private readonly apiUrl = '/api/users';

  // 🔹 STATE (private)
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // 🔹 READ-ONLY STATE (public)
  users = computed(() => this._users());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  constructor(private http: HttpClient) {}

  // 📥 READ
  async loadUsers() {
    this._loading.set(true);
    this._error.set(null);

    try {
      const users = await firstValueFrom(
        this.http.get<User[]>(this.apiUrl)
      );
      this._users.set(users);
    } catch (e) {
      this._error.set('Failed to load users');
    } finally {
      this._loading.set(false);
    }
  }

  // ➕ CREATE
  async addUser(user: User) {
    try {
      const newUser = await firstValueFrom(
        this.http.post<User>(this.apiUrl, user)
      );
      this._users.update(u => [...u, newUser]);
    } catch {
      this._error.set('Failed to add user');
    }
  }

  // ✏️ UPDATE
  async updateUser(user: User) {
    try {
      const updated = await firstValueFrom(
        this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
      );
      this._users.update(u =>
        u.map(x => x.id === updated.id ? updated : x)
      );
    } catch {
      this._error.set('Failed to update user');
    }
  }

  // ❌ DELETE
  async deleteUser(id: number) {
    try {
      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/${id}`)
      );
      this._users.update(u => u.filter(x => x.id !== id));
    } catch {
      this._error.set('Failed to delete user');
    }
  }
}
