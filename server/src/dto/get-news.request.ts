import Pagination from './Pagination'
export type GetNewsRequest = NewsFilter & NewsSortBy & Pagination

export interface NewsFilter {
  tags?: string
  noTagsNoNews?: boolean
  onlyNew?: string
  author?: string
  header?: string
  offset?: string
  limit?: string
}

export type NewsSortBy = {
  field: 'publicationDate' | 'header'
  order: 'asc' | 'desc'
}
