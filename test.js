import test from 'ava'
import Instagram from './index'

const insta = new Instagram({
  access_token: '',
  client_id: 'fb8e666c68d64b2ebbbaae439d7211db',
  client_secret: ''
})

test('getAuthorizationUrl', t => {
  const url = insta.getAuthorizationUrl({
    redirect_uri: 'http://your-redirect-uri.com/',
    response_type: 'code',
    scope: 'basic+likes',
    state: ''
  })

  t.is(url, 'https://api.instagram.com/oauth/authorize/?client_id=fb8e666c68d64b2ebbbaae439d7211db&redirect_uri=http://your-redirect-uri.com/&response_type=code&scope=basic+likes&state=')
})

test('getToken', async t => {
  try {
    await insta.getToken({ code: '' })
  } catch (err) {
    t.is(err.code, 400)
  }
})

test('GET', async t => {
  try {
    await insta.get('users/self', { access_token: '' })
  } catch (err) {
    t.is(err.meta.code, 400)
  }
})
