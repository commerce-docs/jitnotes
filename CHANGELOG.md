# PWA Studio Release 13.2.0

**NOTE:**
_This changelog only contains release notes for PWA Studio and Venia 13.2.0_
_For older release notes, see_ [PWA Studio releases][].

## Highlights

*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3111][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3112][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3118][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3110][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3108][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3107][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3109][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3084][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3051][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3090][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3139][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3155][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3134][]
*   The screen reader now reads the appropriate message as expected when a shopper clicks Return to  apply a gift card on the cart page without entering a gift card number. (GitHub PR: [4104][])
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3121][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3093][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3087][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3047][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3080][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3057][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-3029][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-2980][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-2615][]
*   ADD MISSING RELEASE NOTE ENTRY HERE --> [PWA-2967][]


## Code changes

| Type  | Description                                                                                                                                             | GitHub PR(s)         | Jira Issue   |
| :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------- | ------------ |
| Story | The button seems to not be working with the keyboard. When the ENTER key is pressed, nothing is happening                                               | [4120][], [][],      | [PWA-3111][] |
| Story | The link seems not to be working with the keyboard. When the ENTER key is pressed, nothing is happening                                                 | [4094][]             | [PWA-3112][] |
| Story | Update eventing system to stay compatible with latest AEP schema                                                                                        | [4103][], [4086][],  | [PWA-3118][] |
| Story | The button seems to not be working with the keyboard. When the ENTER key is pressed, nothing is happening                                               | [4112][]             | [PWA-3110][] |
| Story | When the button "forget password" is pressed, there's no message to convey the information that the content has been refreshed for screen reader users. | [4092][]             | [PWA-3108][] |
| Story | There's no message to inform the user the page refreshed its content by clicking/pressing either one of the 2 buttons.                                  | [4100][]             | [PWA-3107][] |
| Story | The button seems to not be working with the keyboard. When the ENTER key is pressed, nothing is happening                                               | [4111][]             | [PWA-3109][] |
| Story | \[Issue] Adding Dev Container config                                                                                                                    | [4040][]             | [PWA-3084][] |
| Story | Update to latest @adobe/magento-storefront-event-collector                                                                                              | [4086][]             | [PWA-3051][] |
| Bug   | \[bug]: Pagebuilder slider show white space when scrolling new slide for the first time                                                                 | [][]                 | [PWA-3090][] |
| Bug   | Region is required in PWA although this option is disabled in Magento , and is not required on normal storefront .                                      | [4124][]             | [PWA-3139][] |
| Bug   | Magento2 Backend URL                                                                                                                                    | [4123][], [134][],   | [PWA-3155][] |
| Bug   | The 'signout' event is not captured                                                                                                                     | [4121][]             | [PWA-3134][] |
| Bug   | System does not read displayed error message for accessibil users, if User press Return Button with blank Gift card number                              | [4104][]             | [PWA-3122][] |
| Bug   | system is getting crashed with unexpected error when pressed Retrun button with invalid Gift card number                                                | [4104][]             | [PWA-3121][] |
| Bug   | Url Rewrite to external URL does not work on PWA                                                                                                        | [4109][], [8110][],  | [PWA-3093][] |
| Bug   | PWA shows 404 when having store code in URL                                                                                                             | [4114][]             | [PWA-3087][] |
| Bug   | \[bug]: PWA Scaffolding Tool uses old version                                                                                                           | [4118][]             | [PWA-3047][] |
| Bug   | \[bug]: When you click on Thumbnail, Add to cart works                                                                                                  | [4102][]             | [PWA-3080][] |
| Bug   | \[bug]: Search auto populate results not accessible with tab or up/down keys.                                                                           | [4060][]             | [PWA-3057][] |
| Bug   | \[bug]: Selecting payment method causing graphql error                                                                                                  | [4115][], [][],      | [PWA-3029][] |
| Bug   | No results when filtering a category with a composite attribute from layered navigation                                                                 | [4083][]             | [PWA-2980][] |
| Bug   | Venia header/layout broken in offline mode                                                                                                              | [4075][]             | [PWA-2615][] |
| Bug   | \[bug]: useLink operations empty object destructuring                                                                                                   | [4084][]             | [PWA-2967][] |


## Documentation changes

**[ADD DOCUMENTATION CHANGES AND ADDITIONS]**

## Known issues

**[ADD KNOWN ANY ISSUES FOR THIS RELEASE]**

## 13.2.0 Lighthouse scores

With each new release of PWA Studio, we perform Lighthouse audits of four Venia page types, each representing a different level of complexity. Shown below are the Lighthouse scores for the 13.2.0 release of these pages on desktop and mobile devices.

### Desktop scores

|                |            Home Page            |          Product Category           |          Product Details           |          Search Results           |
|---------------:|:-------------------------------:|:-----------------------------------:|:----------------------------------:|:---------------------------------:|
|    **Desktop** | ![](images/venia_page_home.png) | ![](images/venia_page_category.png) | ![](images/venia_page_details.png) | ![](images/venia_page_search.png) |
|    Performance |    ![](images/score_88.svg)     |      ![](images/score_94.svg)       |      ![](images/score_63.svg)      |     ![](images/score_96.svg)      |
|  Accessibility |    ![](images/score_100.svg)    |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
| Best Practices |    ![](images/score_100.svg)    |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
|            SEO |    ![](images/score_100.svg)    |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
|            PWA |   ![](images/pwa_perfect.svg)   |     ![](images/pwa_perfect.svg)     |    ![](images/pwa_perfect.svg)     |    ![](images/pwa_perfect.svg)    |

### Mobile scores

|                | &nbsp;&nbsp;Home Page&nbsp;&nbsp; |          Product Category           |          Product Details           |          Search Results           |
|---------------:|:---------------------------------:|:-----------------------------------:|:----------------------------------:|:---------------------------------:|
|     **Mobile** |  ![](images/venia_page_home.png)  | ![](images/venia_page_category.png) | ![](images/venia_page_details.png) | ![](images/venia_page_search.png) |
|    Performance |     ![](images/score_23.svg)      |      ![](images/score_34.svg)       |      ![](images/score_27.svg)      |     ![](images/score_39.svg)      |
|  Accessibility |     ![](images/score_100.svg)     |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
| Best Practices |     ![](images/score_100.svg)     |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
|            SEO |     ![](images/score_100.svg)     |      ![](images/score_100.svg)      |     ![](images/score_100.svg)      |     ![](images/score_100.svg)     |
|            PWA |    ![](images/pwa_perfect.svg)    |    ![](images/pwa_imperfect.svg)    |   ![](images/pwa_imperfect.svg)    |    ![](images/pwa_perfect.svg)    |

## Upgrading from a previous version

Use the steps outlined in this section to update your [scaffolded project][] from 13.1.0 to 13.2.0.
See [Upgrading versions][] for more information about upgrading between PWA Studio versions.

[scaffolded project]: https://developer.adobe.com/commerce/pwa-studio/tutorials/
[upgrading versions]: https://developer.adobe.com/commerce/pwa-studio/guides/upgrading-versions/

### Updated package dependencies

Open your `package.json` file and update the PWA Studio package dependencies to the versions associated with this release.
The following table lists the latest versions of each package as of 13.2.0. The **bolded** versions with an asterisk (*) are the packages that were updated from PWA Studio 13.1.0.

**NOTE:**
Your project may not depend on some packages listed in this table.

**[UPDATE THIS TABLE WITH THE LATEST VERSIONS OF EACH PACKAGE]**

| Package                                | Latest version |
|----------------------------------------|----------------|
| `babel-preset-peregrine`               | 1.2.2          |
| `create-pwa`                           | **2.3.5***     |
| `experience-platform-connector`        | **1.0.4***     |
| `upward-security-headers`              | **1.0.13***    |
| `venia-sample-backends`                | 0.0.9          |
| `venia-sample-eventing`                | **0.0.5***     |
| `venia-sample-language-packs`          | **0.0.13***    |
| `venia-sample-payments-checkmo`        | **0.0.11***    |
| `pagebuilder`                          | **8.1.0***     |
| `peregrine`                            | **13.1.0***    |
| `pwa-buildpack`                        | 11.4.1         |
| `pwa-theme-venia`                      | 1.4.0          |
| `upward-js`                            | 5.3.2          |
| `upward-spec`                          | 5.3.1          |
| `venia-concept`                        | **13.1.0***    |
| `venia-ui`                             | **10.1.0***    |
| `magento2-pwa`                         | 0.3.0          |
| `magento2-pwa-commerce`                | 0.0.2          |
| `magento-venia-sample-data-modules`    | 0.0.3          |
| `magento-venia-sample-data-modules-ee` | 0.0.2          |
| `magento2-upward-connector`            | 2.0.1          |
| `upward-php`                           | 2.0.1          |


[PWA-3111]: https://jira.corp.adobe.com/browse/PWA-3111
[PWA-3112]: https://jira.corp.adobe.com/browse/PWA-3112
[PWA-3118]: https://jira.corp.adobe.com/browse/PWA-3118
[PWA-3110]: https://jira.corp.adobe.com/browse/PWA-3110
[PWA-3108]: https://jira.corp.adobe.com/browse/PWA-3108
[PWA-3107]: https://jira.corp.adobe.com/browse/PWA-3107
[PWA-3109]: https://jira.corp.adobe.com/browse/PWA-3109
[PWA-3084]: https://jira.corp.adobe.com/browse/PWA-3084
[PWA-3051]: https://jira.corp.adobe.com/browse/PWA-3051
[PWA-3090]: https://jira.corp.adobe.com/browse/PWA-3090
[PWA-3139]: https://jira.corp.adobe.com/browse/PWA-3139
[PWA-3155]: https://jira.corp.adobe.com/browse/PWA-3155
[PWA-3134]: https://jira.corp.adobe.com/browse/PWA-3134
[PWA-3122]: https://jira.corp.adobe.com/browse/PWA-3122
[PWA-3121]: https://jira.corp.adobe.com/browse/PWA-3121
[PWA-3093]: https://jira.corp.adobe.com/browse/PWA-3093
[PWA-3087]: https://jira.corp.adobe.com/browse/PWA-3087
[PWA-3047]: https://jira.corp.adobe.com/browse/PWA-3047
[PWA-3080]: https://jira.corp.adobe.com/browse/PWA-3080
[PWA-3057]: https://jira.corp.adobe.com/browse/PWA-3057
[PWA-3029]: https://jira.corp.adobe.com/browse/PWA-3029
[PWA-2980]: https://jira.corp.adobe.com/browse/PWA-2980
[PWA-2615]: https://jira.corp.adobe.com/browse/PWA-2615
[PWA-2967]: https://jira.corp.adobe.com/browse/PWA-2967

[4120]: https://github.com/magento/pwa-studio/pull/4120
[]: <>
[4094]: https://github.com/magento/pwa-studio/pull/4094
[4103]: https://github.com/magento/pwa-studio/pull/4103
[4086]: https://github.com/magento/pwa-studio/pull/4086
[4112]: https://github.com/magento/pwa-studio/pull/4112
[4092]: https://github.com/magento/pwa-studio/pull/4092
[4100]: https://github.com/magento/pwa-studio/pull/4100
[4111]: https://github.com/magento/pwa-studio/pull/4111
[4040]: https://github.com/magento/pwa-studio/pull/4040
[4086]: https://github.com/magento/pwa-studio/pull/4086

[4124]: https://github.com/magento/pwa-studio/pull/4124
[4123]: https://github.com/magento/pwa-studio/pull/4123
[134]: https://github.com/magento-commerce/pwa-studio-cicd/pull/134
[4121]: https://github.com/magento/pwa-studio/pull/4121
[4104]: https://github.com/magento/pwa-studio/pull/4104
[4104]: https://github.com/magento/pwa-studio/pull/4104
[4109]: https://github.com/magento/pwa-studio/pull/4109
[8110]: https://github.com/magento-commerce/magento2ce/pull/8110
[4114]: https://github.com/magento/pwa-studio/pull/4114
[4118]: https://github.com/magento/pwa-studio/pull/4118
[4102]: https://github.com/magento/pwa-studio/pull/4102
[4060]: https://github.com/magento/pwa-studio/pull/4060
[4115]: https://github.com/magento/pwa-studio/pull/4115
[]: <>
[4083]: https://github.com/magento/pwa-studio/pull/4083
[4075]: https://github.com/magento/pwa-studio/pull/4075
[4084]: https://github.com/magento/pwa-studio/pull/4084

[PWA Studio releases]: https://github.com/magento/pwa-studio/releases
