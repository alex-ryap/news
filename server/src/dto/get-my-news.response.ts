import { State } from '../entities/News';

export default class GetMyNewsResponse {
  id: number;
  header: string;
  description: string;
  tags: string[];
  state: State;
  publicationDate?: Date;

  constructor(props: GetMyNewsResponse) {
    this.id = props.id;
    this.header = props.header;
    this.description = props.description;
    this.tags = props.tags;
    this.state = props.state;
    this.publicationDate = props.publicationDate;
  }
}
