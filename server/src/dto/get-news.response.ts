export default class NewsResponse {
  header: string
  description: string
  tags: string[]
  authorNickname: string
  authorFirstName?: string
  authorLastName?: string

  constructor(props: NewsResponse) {
    this.header = props.header
    this.description = props.description
    this.tags = props.tags
    this.authorNickname = props.authorNickname
    this.authorFirstName = props.authorFirstName
    this.authorLastName = props.authorLastName
  }
}
