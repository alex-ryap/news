import { Role } from './AuthData'

export default class User {
  id: number
  firstName: string
  lastName: string
  nickname: string
  phone?: string
  tags: string[] = []
  showFirstName?: boolean
  showLastName?: boolean
  showPhone?: boolean
  readNewsList: Set<number> = new Set<number>()
  myNewsList: number[] = []

  constructor(props: Omit<User, 'id'| 'readNewsList' | 'myNewsList'>) {
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.nickname = props.nickname
    this.phone = props.phone
    this.tags = props.tags
    this.showFirstName = props.showFirstName
    this.showLastName = props.showLastName
    this.showPhone = props.showPhone
  }
}
