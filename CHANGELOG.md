# PWA Studio Release 12.7.0

**NOTE:**  
_This changelog only contains release notes for PWA Studio and Venia 12.7.0_  
_For older release notes, see_ [PWA Studio releases][].


## Highlights  
  
-   MISSING JIRA RELEASE NOTE — [PWA-2915][]  
-   MISSING JIRA RELEASE NOTE — [PWA-3001][]  
-   Story: [3791][] — Actions menu accessibility — All action menu functions can now be accessed using only the keyboard (Shopping Bag).  
-   Story: [3891][] — The search results read by screen readers have been improved.  
-   Story: [3792][] — Screen readers will now announce expanded and collapsed state of controls  
-   Story: [3798][] — Mega Menu is now accessible by keyboard.  
-   Story: [3864][] — When actionable elements receive focus, a visible focus indicator is present.  
-   Story: [3935][] — Screen reader announces the total items found in the searched result  
-   Story: [3903][] — Out-of-stock variations — The out-of-stock setting can now be applied to configurable product variations. This saves customer from having to select each product combination before they know which are out of stock.  
-   Bug: [][] — There is a known problem with a user session persisting after logout. If a new session is desired after user logs out, run the disable graphql session command.  
-   MISSING JIRA RELEASE NOTE — [PWA-2899][]  
-   Bug: [3936][] — The Logo component now renders the \`alt\` property  
-   Bug: [3969][] — The selected payment method now persists during the user session, when multiple payment methods are available.  
-   Bug: [3955][] — A permission error is now fixed during the compilation process initiated by Docker  
-   Bug: [3648][] — A typo is fixed for a component import name  
-   Bug: [3942][] — Fixes console warnings for invalid DOM property name  


| Type  | Description                                                                                                | GitHub PR | Jira Issue   |
| :---- | :--------------------------------------------------------------------------------------------------------- | :-------- | ------------ |
| Story | Enable using theme concept before v13 release                                                              | [155][]   | [PWA-2915][] |
| Story | Update magento compatibility table                                                                         | [3985][]  | [PWA-3001][] |
| Story | \[Issue] AC-2493::Items within actions menu are not operable for keyboard-only…                            | [3791][]  | [PWA-2814][] |
| Story | \[Issue] AC-3522::Product search result with items count is not being read by screen reader                | [3891][]  | [PWA-2640][] |
| Story | \[Issue] AC-2791::Current state of custom controls not announced. (Shopping Bag)                           | [3792][]  | [PWA-2813][] |
| Story | \[Issue] AC-2787 Keyboard only users are not able to access sub-navigation links                           | [3798][]  | [PWA-2811][] |
| Story | \[Issue] AC-2790::No visual indication of focus on buttons.                                                | [3864][]  | [PWA-2972][] |
| Story | \[Issue] AC-3522::Product search result with items count is not being read by …                            | [3935][]  | [PWA-2970][] |
| Story | Configurable product with Out of Stock variations                                                          | [3903][]  | [PWA-2482][] |
| Bug   | PWA keeps the same cart_id causes an error on checkout                                                     | [][]      | [PWA-2991][] |
| Bug   | \[bug]: Certain talons and hooks cannot be wrapped                                                         | [3874][]  | [PWA-2899][] |
| Bug   | \[Issue] Logo misses required alt property for image                                                       | [3936][]  | [PWA-2969][] |
| Bug   | \[bug]: Payment method always reverts to “Check / Money order” when there is an error with the transaction | [3969][]  | [PWA-2985][] |
| Bug   | \[bug]: Watch command failing during the compilation process initiated by docker                           | [3955][]  | [PWA-2982][] |
| Bug   | \[Issue] Fix typo in component import name; consolidate import                                             | [3648][]  | [PWA-2646][] |
| Bug   | \[bug]: AC-2481::Flyout panels do not trap focus while open                                                | [3942][]  | [PWA-2975][] |


[PWA-2915]: https://jira.corp.adobe.com/browse/PWA-2915  
[PWA-3001]: https://jira.corp.adobe.com/browse/PWA-3001  
[PWA-2814]: https://jira.corp.adobe.com/browse/PWA-2814  
[PWA-2640]: https://jira.corp.adobe.com/browse/PWA-2640  
[PWA-2813]: https://jira.corp.adobe.com/browse/PWA-2813  
[PWA-2811]: https://jira.corp.adobe.com/browse/PWA-2811  
[PWA-2972]: https://jira.corp.adobe.com/browse/PWA-2972  
[PWA-2970]: https://jira.corp.adobe.com/browse/PWA-2970  
[PWA-2482]: https://jira.corp.adobe.com/browse/PWA-2482  
[PWA-2991]: https://jira.corp.adobe.com/browse/PWA-2991  
[PWA-2899]: https://jira.corp.adobe.com/browse/PWA-2899  
[PWA-2969]: https://jira.corp.adobe.com/browse/PWA-2969  
[PWA-2985]: https://jira.corp.adobe.com/browse/PWA-2985  
[PWA-2982]: https://jira.corp.adobe.com/browse/PWA-2982  
[PWA-2646]: https://jira.corp.adobe.com/browse/PWA-2646  
[PWA-2975]: https://jira.corp.adobe.com/browse/PWA-2975  


[155]: https://github.com/AdobeDocs/commerce-pwa-studio/pull/155
[3985]: https://github.com/magento/pwa-studio/pull/3985
[3791]: https://github.com/magento/pwa-studio/pull/3791
[3891]: https://github.com/magento/pwa-studio/pull/3891
[3792]: https://github.com/magento/pwa-studio/pull/3792
[3798]: https://github.com/magento/pwa-studio/pull/3798
[3864]: https://github.com/magento/pwa-studio/pull/3864
[3935]: https://github.com/magento/pwa-studio/pull/3935
[3903]: https://github.com/magento/pwa-studio/pull/3903

[3874]: https://github.com/magento/pwa-studio/pull/3874
[3936]: https://github.com/magento/pwa-studio/pull/3936
[3969]: https://github.com/magento/pwa-studio/pull/3969
[3955]: https://github.com/magento/pwa-studio/pull/3955
[3648]: https://github.com/magento/pwa-studio/pull/3648
[3942]: https://github.com/magento/pwa-studio/pull/3942


[PWA Studio releases]: https://github.com/magento/pwa-studio/releases

