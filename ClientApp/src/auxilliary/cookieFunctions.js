import Cookies from "js-cookie";

export const getCookie = (cookieName, cookiePart) => {
  let wholeCookie = Cookies.getJSON(cookieName);
  if (wholeCookie === undefined) return "";
  let requiredCookieValue = wholeCookie.map(cookie => {
    let eachCookie = cookie.split(":");
    if (eachCookie[0] === cookiePart) return eachCookie[1];
  });
  return requiredCookieValue.filter(element => element !== undefined).toString();
}

export const setCookie = (cookieObject) => {
  let localCookieArray = ["userName:" + cookieObject.userName, "fullName:"
    + cookieObject.fullName, "isLoggedIn:" + cookieObject.isLoggedIn];
  Cookies.set('user', localCookieArray, { expires: cookieObject.expireDays, path: "/" });
}
