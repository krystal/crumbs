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

  export type callback = () => void;
  class Crumbs {
    constructor({}: CrumbsData);

    on(eventName: string, cb: callback): string[] | void;
  }
  export default Crumbs;
}
