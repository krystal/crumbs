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

  export type callback = (preferences?: string[]) => void;
  class Crumbs {
    constructor({}: CrumbsData);

    on(eventName: string, callback: callback): string[] | void;
  }

  export default Crumbs;
}
