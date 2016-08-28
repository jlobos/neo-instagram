
import extend from 'deep-extend'
import query from 'query-string'
import qs from 'qs'

const fetch = (process.env.BROWSER)
  ? require('fetch-jsonp')
  : require('node-fetch')

class NeoInstagram {
  constructor (options) {
    this.options = extend({
      access_token: null,
      rest_base: 'https://api.instagram.com/v1/'
    }, options)
  }

  _r (method, path, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    let url = `${this.options.rest_base}${path}`
    let payload = { method: method }

    if (method === 'GET' || method === 'DELETE') {
      params = query.stringify(extend({
        access_token: this.options.access_token
      }, params))
      url = `${url}?${params}`
    }

    if (method === 'POST') {
      payload = extend({
        body: qs.stringify(extend({ access_token: this.options.access_token }, params)),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, payload)
    }

    fetch(url, payload)
    .then(r => r.json())
    .then(r => {
      if (r.meta.code >= 400) {
        callback(r)
      } else {
        callback(undefined, r)
      }
    })
    .catch(callback)
  }

  get (url, params, callback) { return this._r('GET', url, params, callback) }

  post (url, params, callback) { return this._r('POST', url, params, callback) }

  delete (url, params, callback) { return this._r('DELETE', url, params, callback) }
}

module.exports = NeoInstagram
