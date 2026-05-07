export function setCookie(name: string, value: string | boolean, hours: number = 1) {
  if (typeof document === "undefined") return // 🛑 prevent SSR crash
  
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

export function isSystemActive() {
  return getCookie("toggleState") === "true"
}

export function getCookie(name: string): string {
  if (typeof document === "undefined") return "" // 🛑 prevent SSR crash
  
  const cname = name + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")

  for (let c of ca) {
    while (c.charAt(0) === " ") c = c.substring(1)
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length)
    }
  }
  return ""
}