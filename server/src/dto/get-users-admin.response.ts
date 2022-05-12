import { Role } from '../entities/AuthData'

export default class GetUsersAdminResponse {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly nickname: string
  readonly phone?: string
  readonly tags: string[] = []
  readonly showFirstName?: boolean
  readonly showLastName?: boolean
  readonly showPhone?: boolean
  readonly role: Role
  readonly login: string

  constructor(props: GetUsersAdminResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.nickname = props.nickname
    this.phone = props.phone
    this.tags = props.tags
    this.showFirstName = props.showFirstName
    this.showLastName = props.showLastName
    this.showPhone = props.showPhone
    this.role = props.role
    this.login = props.login
  }
}
