import { State } from '../entities/News'

export default class GetMyNewsResponse {
  header: string
  description: string
  tags: string[]
  state: State
  publicationDate?: Date

  constructor(props: GetMyNewsResponse) {
    this.header = props.header
    this.description = props.description
    this.tags = props.tags
    this.state = props.state
    this.publicationDate = props.publicationDate
  }
}
