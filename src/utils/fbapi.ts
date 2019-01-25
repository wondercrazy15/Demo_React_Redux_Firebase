// import * as Actions from '../store/users/actions';

export async function fbcallApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(url + '/api' + path, {
    method,
    headers: {
      Accept:
        'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}
