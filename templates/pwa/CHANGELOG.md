# PWA Studio Release [RELEASEVERSION]

**NOTE:**
_This changelog only contains release notes for PWA Studio and Venia [RELEASEVERSION]_
_For older release notes, see_ [PWA Studio releases][].

## Highlights

[HIGHLIGHTS]

## Code changes

[SUMMARY_TABLE]

## Documentation changes

**[ADD DOCUMENTATION CHANGES AND ADDITIONS]**

## Known issues

**[ADD KNOWN ANY ISSUES FOR THIS RELEASE]**

## [RELEASEVERSION] Lighthouse scores

With each new release of PWA Studio, we perform Lighthouse audits of four Venia page types, each representing a different level of complexity. Shown below are the Lighthouse scores for the [RELEASEVERSION] release of these pages on desktop and mobile devices.

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

Use the steps outlined in this section to update your [scaffolded project][] from [PREVIOUSVERSION] to [RELEASEVERSION].
See [Upgrading versions][] for more information about upgrading between PWA Studio versions.

[scaffolded project]: https://developer.adobe.com/commerce/pwa-studio/tutorials/
[upgrading versions]: https://developer.adobe.com/commerce/pwa-studio/guides/upgrading-versions/

### Updated package dependencies

Open your `package.json` file and update the PWA Studio package dependencies to the versions associated with this release.
The following table lists the latest versions of each package as of [RELEASEVERSION]. The **bolded** versions with an asterisk (*) are the packages that were updated from PWA Studio [PREVIOUSVERSION].

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


[JIRA_LINKS]
[GITHUB_LINKS]
[GITHUB_RELEASES_LINK]