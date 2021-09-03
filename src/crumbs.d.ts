declare module "krystal-crumbs" {
  interface Crumb {
    identifier: string;
    required: true;
    summary: string;
    title: string;
  }

  type types = Crumb[];
  type banner = HTMLElement;
  type cookieName = string;
  type domain = string;
  type days = number;
  type editAcceptButton = HTMLButtonElement;
  type editCookieButton = HTMLButtonElement;
  type editScreen = HTMLElement;
  type editSettingsButton = HTMLButtonElement;

  type focusable = Array<HTMLInputElement | HTMLButtonElement>;

  class Crumbs {
    constructor();

    render(): void;

    acceptCookies(): void;

    createTemplate(data: Crumb): HTMLDivElement;

    editSettings(element: HTMLButtonElement): void;

    trapFocus(evt: Event): void;

    getCookie(name: string): string;

    setCookie(name: string, days: number): void;
  }
}
