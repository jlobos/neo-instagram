# Instagram for Node.js

[![Build Status](https://travis-ci.org/jlobos/neo-disqus.svg?branch=master)](https://travis-ci.org/jlobos/neo-disqus)
[![Build status](https://ci.appveyor.com/api/projects/status/7uhpkttafxwwv6ff?svg=true)](https://ci.appveyor.com/project/jlobos/neo-instagram)
[![bitHound Code](https://www.bithound.io/github/jlobos/neo-instagram/badges/code.svg)](https://www.bithound.io/github/jlobos/neo-instagram)
[![bitHound Dependencies](https://www.bithound.io/github/jlobos/neo-instagram/badges/dependencies.svg)](https://www.bithound.io/github/jlobos/neo-instagram/master/dependencies/npm)

Simple client library for the [Instagram API](https://www.instagram.com/developer/).

## Install

```bash
$ npm install --save neo-instagram
```

## Usage

```js
const NeoInstagram = require('neo-instagram')

const client = new NeoInstagram({
  client_id: '',
  client_secret: ''
})

// Callback
client.get('users/self', { access_token: '' }, (err, user) => { console.log(err, user) })

// Promise
client.get('users/self', { access_token: '' }).then(user => console.log(user))
```

Supported options:

- `access_token` (`string`)
- `client_id` (`string`)
- `client_secret` (`string`)
- `redirect_uri` (`string`)

## Authentication

Direct your user to Instagram authorization URL

```js
const url = client.getAuthorizationUrl({
  redirect_uri: 'http://your-redirect-uri.com/',
  response_type: 'code',
  scope: 'basic+likes',
  state: ''
})
```

Request the `access_token`

```js
// Callback
client.getToken({ code: '', redirect_uri: '' }, callback)

// Promise
client.getToken({ code: '', redirect_uri: '' }).then().catch()
```

## REST API

You simply need to pass the endpoint and parameters to one of convenience methods.  Take a look at the [documentation site](https://www.instagram.com/developer/endpoints/) to reference available endpoints.

```js
// Callback
client.get(path, params, callback)
client.post(path, params, callback)
client.delete(path, params, callback)

// Promise
client.get(path, params).then().catch()
client.post(path, params).then().catch()
client.delete(path, params).then().catch()
```

Example, [get the most recent media published by the owner of the access_token](https://www.instagram.com/developer/endpoints/users/#get_users_media_recent_self):

```js
// Callback
client.get('users/self/media/recent', { access_token: '', count: 1 }, (error, media) => {
  console.log(error, media)
})

// Promise
client.get('users/self/media/recent', { access_token: '', count: 1 }).then(media => {
  console.log(media)
}).catch(console.error)
```

## License

MIT
