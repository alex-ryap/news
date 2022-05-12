export default class GetAuthorResponse {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly nickname: string

  constructor(props: GetAuthorResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.nickname = props.nickname
  }
}
