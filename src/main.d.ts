declare module "krystal-crumbs" {
  export type Crumb = {
    identifier: string;
    required: boolean;
    summary: string;
    title: string;
  };

  export type CrumbsData = {
    cookieName?: string;
    domain: string;
    days: number;
    editCookieButton: HTMLButtonElement;
    types: Crumb[];
  };

  class Crumbs {
    constructor({}: CrumbsData);

    render(): void;

    acceptCookies(): void;

    createTemplate(data: Crumb): HTMLDivElement;

    editSettings(element: HTMLButtonElement): void;

    trapFocus(evt: KeyboardEvent): void;

    getCookie(name: string): string;

    setCookie(name: string, days: number): void;
  }
  export default Crumbs;
}
