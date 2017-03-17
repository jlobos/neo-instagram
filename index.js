/* eslint-disable camelcase */

const fetch = require('node-fetch')
const qs = require('qs')
const query = require('query-string')

module.exports = class {
  constructor (options = {}) {
    this.options = Object.assign({
      // Client options
      access_token: undefined,
      client_id: undefined,
      client_secret: undefined,
      redirect_uri: undefined,

      // Instagram urls
      oauth_url: 'https://api.instagram.com/oauth',
      rest_base: 'https://api.instagram.com/v1'
    }, options)
  }

  getAuthorizationUrl ({
    redirect_uri,
    response_type = 'code',
    scope = 'basic',
    state = ''
  }) {
    const { client_id, oauth_url } = this.options
    const uri = redirect_uri || this.options.redirect_uri

    return `${oauth_url}/authorize/?client_id=${client_id}&redirect_uri=${uri}&response_type=${response_type}&scope=${scope}&state=${state}`
  }

  getToken ({ code, redirect_uri } = {}, callback) {
    return new Promise((resolve, reject) => {
      const { client_id, client_secret, oauth_url } = this.options
      const uri = redirect_uri || this.options.redirect_uri

      const form = qs.stringify({
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': uri
      })

      fetch(`${oauth_url}/access_token`, {
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => res.json())
      .then(res => {
        // error
        if (res.code >= 400) {
          return (callback) ? callback(res) : reject(res)
        }

        (callback) ? callback(undefined, res) : resolve(res)
      })
    })
  }

  _r (method, path, params = {}, callback) {
    if (typeof params === 'function') {
      callback = params
    }

    let url = `${this.options.rest_base}/${path}`
    let payload = { method: method }
    const access_token = params.access_token || this.options.access_token

    if (method === 'GET' || method === 'DELETE') {
      params = query.stringify(Object.assign({ access_token }, params))
      url = `${url}?${params}`
    }

    if (method === 'POST') {
      payload = Object.assign({
        body: qs.stringify(Object.assign({ access_token }, params)),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, payload)
    }

    return new Promise((resolve, reject) => {
      fetch(url, payload)
      .then(res => res.json())
      .then(res => {
        // error
        if (res.meta.code >= 400) {
          return (callback) ? callback(res) : reject(res)
        }

        (callback) ? callback(undefined, res) : resolve(res)
      })
    })
  }

  get (url, params, callback) { return this._r('GET', url, params, callback) }

  post (url, params, callback) { return this._r('POST', url, params, callback) }

  delete (url, params, callback) { return this._r('DELETE', url, params, callback) }
}
