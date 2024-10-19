import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user?.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserModel | null {
    const token = window.localStorage.getItem(USER_KEY);
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const user: UserModel = JSON.parse(this.b64DecodeUnicode(base64));
    return user;
  }

  // b64DecodeUnicode(str) {
  //   return decodeURIComponent(
  //     Array.prototype.map
  //       .call(atob(str), function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );
  // }
  b64DecodeUnicode(str) {
    try {
      // Kiểm tra xem chuỗi có hợp lệ không trước khi giải mã
      if (this.isValidBase64(str)) {
        return decodeURIComponent(
          Array.prototype.map
            .call(atob(str), function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
      } else {
        console.error('Invalid Base64 string');
        return null;
      }
    } catch (e) {
      console.error('Error decoding Base64:', e);
      return null;
    }
  }

  // Hàm kiểm tra chuỗi có phải Base64 hợp lệ không
  isValidBase64(str) {
    try {
      // Chuỗi phải có độ dài chia hết cho 4 và chỉ chứa các ký tự hợp lệ
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }
}
