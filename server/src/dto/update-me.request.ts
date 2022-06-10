export default interface UpdateMeRequest {
  readonly firstName: string
  readonly lastName: string
  readonly nickname: string
  readonly phone?: string
  readonly showFirstName?: boolean
  readonly showLastName?: boolean
  readonly showPhone?: boolean
}
