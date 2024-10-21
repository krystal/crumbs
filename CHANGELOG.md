# Changelog

## [0.2.0](https://github.com/krystal/crumbs/compare/v0.1.9...v0.2.0) (2024-10-21)


### ⚠ BREAKING CHANGES

* release

### Features

* allow consumer to declare which types of cookies their site uses ([069ca83](https://github.com/krystal/crumbs/commit/069ca83f0fcfd1b21f3cccc2cad19c95004aea76))
* cleanup outdated versions ([#11](https://github.com/krystal/crumbs/issues/11)) ([fbbd79e](https://github.com/krystal/crumbs/commit/fbbd79e9144534c686fd2ea22e87f5837848416c))
* clicking on backdrop closes the edit screen ([#8](https://github.com/krystal/crumbs/issues/8)) ([798ce37](https://github.com/krystal/crumbs/commit/798ce37a6e0b287676c845bde169cc3e47b34a09))
* release ([6455eda](https://github.com/krystal/crumbs/commit/6455edabfaa8867506f902f86abd6732daca503e))
* replace webpack with vite ([#12](https://github.com/krystal/crumbs/issues/12)) ([7e6a743](https://github.com/krystal/crumbs/commit/7e6a743d93388e8c8b38b55bbd6b076b6303c16f))


### Bug Fixes

* add secure tag in cookie name ([19ffc36](https://github.com/krystal/crumbs/commit/19ffc36bf589389cba3eff3cfc68f07a9d780404))
* changing const to let to avoid reassignment error ([97aa80e](https://github.com/krystal/crumbs/commit/97aa80ea75e1b796f053fd1e099588ed746f52e5))
* make sure we are able to scroll when cookies are accepted ([5a57874](https://github.com/krystal/crumbs/commit/5a5787413ff4fa284c1fe981ad9aa51b6f4e1ce7))
* no event listener was being added to the edit cookies button when page was refreshed ([9c2cda5](https://github.com/krystal/crumbs/commit/9c2cda5edc34d77a4d23dd56dd86620680c7c0f6))
* remember cookie selection in subsequent visits ([d8c8d4e](https://github.com/krystal/crumbs/commit/d8c8d4e058265dc79930e94195cf6d2009889401))
* removing buildEditScreen method as no longer required, setting accepted to equal the cookie types provided ([06c8e83](https://github.com/krystal/crumbs/commit/06c8e837e1ae682289ebdd4be5f1b1249ed609ea))
* removing event listener on edit acceptance when escape key is pressed ([58a7875](https://github.com/krystal/crumbs/commit/58a78756d8fd9da73b1fe11dfd4ac4510239abd7))
* set boolean value for each cookie ([aa1e6af](https://github.com/krystal/crumbs/commit/aa1e6af731a033255adb70d30f9ccdb7ba972b48))
* update variable name for cta background color ([50985a3](https://github.com/krystal/crumbs/commit/50985a391c4d079b40f451980a71545d16cc2c4d))
* wrong event listener being removed ([0dbd7d3](https://github.com/krystal/crumbs/commit/0dbd7d3d6281082fe39bc1d72ff174806f42a268))
