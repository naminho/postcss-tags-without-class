const postcss = require('postcss')
const selectorParser = require('postcss-selector-parser')

const addClassAttributeTo = selectors => selectors.walk(selector => {
  if (selector.type === 'tag') {
    selector.value = String(selector.value) + ':not([class])'
  }
})

module.exports = postcss.plugin('postcss-tags-without-class', (options = {}) => {
    return root => {
        root.walkRules(rule => {
            rule.selector = selectorParser(addClassAttributeTo)
              .processSync(rule.selector)
        })
    }
})
