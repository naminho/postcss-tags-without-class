const fs = require('fs')
const postcss = require('postcss')
const tagsWithoutClass = require('./../index')

const applyPostCSSWithPlugin = (content, expect) => new Promise(resolve => {
  postcss([tagsWithoutClass])
    .process(content, {from: undefined})
    .then(result => resolve(result.css))
})

const getCase = (testCase) => fs.readFileSync(`./test/cases/${testCase}.css`, 'utf8')

test('adds the opt out selector to the tag', async () => {
  const result = await applyPostCSSWithPlugin('button {color: red;}')
  expect(result).toMatchSnapshot()
})

test('adds the opt out selector to the tag from external file', async () => {
    const result = await applyPostCSSWithPlugin(getCase('basic'))
    expect(result).toMatchSnapshot()
})

test('adds it to each chained tag', async () => {
  const result = await applyPostCSSWithPlugin(getCase('chained'))
  expect(result).toMatchSnapshot()
})

test('adds it to multiple tags', async () => {
  const result = await applyPostCSSWithPlugin(getCase('multiple'))
  expect(result).toMatchSnapshot()
})

test('adds it between the tag and further pseudo tags', async () => {
  const result = await applyPostCSSWithPlugin(getCase('pseudo'))
  expect(result).toMatchSnapshot()
})
