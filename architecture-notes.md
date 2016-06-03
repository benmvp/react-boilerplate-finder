# Architecture Notes

**Bold**: Must-have features  
Normal: Should-have features  
_Italics_: Nice-to-have features

## Pre-processing step

- Get meta data for each package within [categories.js](app/constants/categories.js) and save to [packages.json](data/packages.json) lookup
  - **name**
  - latest version
- Get dependency information for each repo in [repos.json](data/repos.json) and save to [repos-info.json](data/repos-info.json)
  - **unique id**
  - **name** (from package.json)
  - **description**
  - _repo image / profile image_
  - matching dependencies map (package to semver)
  - num total dependencies (`dependencies` + `devDependencies`)
  - num stars
  - last commit date
  - _num commits_
  - _num clones_


## App

### Store

#### State
- **[Fixed] Array for list of all repos from [repos-info.json](data/repos-info.json)**
- **[Fixed] Array of categories/filters from [categories.js](app/constants/categories.js)**
- **[Fixed] Object lookup of packages info from [packages.json](data/packages.json)**
- **Object lookup of dependencies to match**
- Boolean for whether or not to allow outdated
- String for Sort option
- _Page number_
- [Derived] Array of filtered, sorted & _sliced_
  - Use [`semver`](https://github.com/npm/node-semver) to determine if a dependency is outdated
- _[Derived] Display string of filters_

#### Actions
- **Init**
- **Set dependency filter (includes category name + selection)**
- Set outdated
- Set sort
- _Set page_

#### Reducers
- **Init: sets initial/default values**
- **Filter: using the category name, figures out which old dependencies to remove and which to add**
- Outdated: flip outdated boolean
- Sort: updated sort string
- _Page: update page number_

### Form filter UI
- Form fields are built up from `packages` property in each category within [categories.js](app/constants/categories.js)
  - Doesn't matter
  - Any of the options
  - Explicitly none of the options
  - Radio buttons for each package in `packages` (`multi` is falsy)
  - Checkboxes for each package in `packages` (`multi` is `true`)
- Checkbox for whether or not to allow outdated dependencies
- _Presets (i.e. "Redux+Webpack")_

### Repos list

- Items
  - Display Name: Repo name (fallback to unique id)
  - Github link
  - Description
  - ☆ # of stars
  - 🗳# of dependencies
- Total matches
- Dropdown for sorting
  - _Most clones_
  - Most stars
  - Most recently updated
  - Least dependencies
  - Most dependencies
  - _Most commits_
- _Display string of filters_
- _Pagination_
