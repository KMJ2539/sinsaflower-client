"use client";

export function setCookie(
  name: string,
  value: string,
  options: { path?: string; expires?: Date } = {}
) {
  let cookieStr = `${name}=${value};`;

  if (options.path) {
    cookieStr += ` path=${options.path};`;
  }
  if (options.expires) {
    cookieStr += ` expires=${options.expires.toUTCString()};`;
  }

  document.cookie = cookieStr;
}

export function deleteCookie(name: string, path = "/") {
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
