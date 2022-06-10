export class AuthData {
  login: string
  password: string
  token?: string
  userId?: number
  role: Role

  public constructor(props: AuthData) {
    this.login = props.login
    this.password = props.password
    this.token = props.token
    this.userId = props.userId
    this.role = props.role
  }
}

export enum Role {
  reader,
  writer,
  admin
}

export function getRole(role: Role): string {
  if (role === Role.reader) {
    return 'reader'
  }
  if (role === Role.writer) {
    return 'writer'
  }
  if (role === Role.admin) {
    return 'admin'
  }
}