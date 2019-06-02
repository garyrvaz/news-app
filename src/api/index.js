import axios from '@/utils/axios'

export const GET_ARTICLES = async ({ url, category='' }) => {
  const { data } = await axios.get(url, { params: { category } })
  return data.articles
}
