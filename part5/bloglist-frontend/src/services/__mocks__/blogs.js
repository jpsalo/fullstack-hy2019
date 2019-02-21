const blogs = [
  {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 16,
    'user': {
      'username': 'jpqs',
      'name': 'jp salo',
      'id': '5c6be4a295442f14363b50c5'
    },
    'id': '5c69e01e7027427014f40d98'
  },
  {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 9,
    'user': {
      'username': 'jpqs',
      'name': 'jp salo',
      'id': '5c6be4a295442f14363b50c5'
    },
    'id': '5c69e01e7027427014f40d99'
  },
  {
    'title': 'asd',
    'author': 'foo',
    'url': 'bar',
    'likes': 8,
    'user': {
      'username': 'jpqs',
      'name': 'jp salo',
      'id': '5c6be4a295442f14363b50c5'
    },
    'id': '5c6c46559f446960d0a10af1'
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = token => {
  token.toString()
}

export default { getAll, setToken }
