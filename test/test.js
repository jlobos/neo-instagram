
import test from 'ava'
import NeoInstagram from '../lib/index'

let defaults = {}

test.before(t => {
  defaults = {
    access_token: null,
    rest_base: 'https://api.instagram.com/v1/'
  }
})

test('create new instance', t => {
  const client = new NeoInstagram()
  t.true(client instanceof NeoInstagram)
})

test('has default options', t => {
  const client = new NeoInstagram()
  t.is(Object.keys(defaults).length, Object.keys(client.options).length)
  t.deepEqual(Object.keys(defaults), Object.keys(client.options))
})

test.cb('GET users/self', t => {
  const client = new NeoInstagram({
    access_token: ''
  })

  client.get('users/self', (e, r) => {
    t.falsy(r)
    t.is(typeof e, 'object')
    t.is(e.meta.code, 400)
    t.end()
  })
})
