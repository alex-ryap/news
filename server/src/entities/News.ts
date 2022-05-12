
export default class News {
  id: number = 0
  header: string
  description: string
  tags: Set<string>
  state: State
  publicationDate?: Date
  author: number

  constructor(props: Omit<News, 'id'>) {
    this.header = props.header
    this.description = props.description
    this.tags = props.tags
    this.state = props.state
    this.publicationDate = props.publicationDate
    this.author = props.author
  }
}

export enum State {
  draft = 'draft',
  published = 'published'
}
