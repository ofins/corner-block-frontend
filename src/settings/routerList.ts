export const getRouterList = (type: string) => {
  const data = routerList.find((router) => router.routerName === type).data
  return data
}

const routerList = [
  {
    routerName: 'NavRouterList',
    data: [
      {
        name: '最新文章',
        href: 'newPost'
      },
      {
        name: '精選貼文',
        href: 'featuredPost'
      },
      {
        name: '服務介紹',
        href: 'services'
      }
    ]
  }
]
