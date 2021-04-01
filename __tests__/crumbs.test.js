import Crumbs from '../src/main';

document.body.innerHTML = `<button class='edit-cookies'>Edit Cookies</button>`;

let cookies;

beforeEach(() => {
  cookies = new Crumbs({
    editCookieButton: document.querySelector('.edit-cookies'),
  });
});

test('Check the cookie name is returned', () => {
  const expectedValue = 'cookie_consent';
  jest.spyOn(cookies, 'getCookie').mockReturnValue(expectedValue);

  expect(cookies.getCookie()).toBe('cookie_consent');
});

test('Set a cookie', () => {
  const set = jest.spyOn(cookies, 'setCookie');
  cookies.setCookie('name', true, 1);
  expect(set).toHaveBeenCalledWith('name', true, 1);
});

afterEach(() => {
  jest.clearAllMocks();
});
