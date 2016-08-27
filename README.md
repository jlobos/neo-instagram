# Instagram for Node.js and Browser

Simple client library for the [Instagram API](https://www.instagram.com/developer/) in server and browser ([Webpack](https://github.com/webpack/webpack)).

> Browser: only `get` method support (jsonp).

```js
import NeoInstagram from 'neo-instagram'

const client = new NeoInstagram({
  access_token: ''
})

client.get('users/self', (error, user) => {
  console.log(error, user)
})
```


## Installation

```
npm i neo-instagram
```

## REST API

You simply need to pass the endpoint and parameters to one of convenience methods.  Take a look at the [documentation site](https://www.instagram.com/developer/endpoints/) to reference available endpoints.

```js
client.get(path, params, callback)
client.post(path, params, callback)
client.delete(path, params, callback)
```

Example, [get the most recent media published by the owner of the access_token](https://www.instagram.com/developer/endpoints/users/#get_users_media_recent_self):

```js
client.get('users/self/media/recent', { count: 1 }, (error, media) => {
  console.log(error, media)
})
```

## Testing

```
npm i
npm test
```
