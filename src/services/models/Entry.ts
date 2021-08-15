import config from '@/config';
import req from '@/services/req';
import EntryData from './EntryData';
import Institute from './Institute';

class Entry {
  constructor(
    public id: number,
    public state: string,
    public comment: string,
    public institute_id: number,
    public institute: Institute,
    public data: Array<EntryData>,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['state'],
      data['comment'],
      data['institute_id'],
      Institute.fromJson(data['institute']),
      EntryData.fromJsonArray(data['data']),
      new Date(data['created_at']),
      new Date(data['updated_at'])
    );
  }
  static fromJsonArray(data_array: any) {
    return (data_array as Array<Entry>).map((data) => this.fromJson(data));
  }

  static async all(state = 'pending') {
    try {
      let res = await req.get(`${config.apiUrl}/entry`, {
        params: { state },
      });
      return this.fromJsonArray(res.data);
    } catch (error) {
      throw new Error('institute all error: ' + error);
    }
  }

  static async create(data) {
    try {
      let res = await req.post(`${config.apiUrl}/entry`, data);
      return {
        success: true,
        ...res,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        ...error.response,
      };
    }
  }

  static async update(id: number, data) {
    try {
      let res = await req.patch(`${config.apiUrl}/entry/${id}`, data);
      return {
        success: true,
        ...res,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        ...error.response,
      };
    }
  }

  static async updateState(id: number, state: string) {
    return await this.update(id, { state });
  }

  //
  static states = ['pending', 'accepted', 'rejected'];
}

export default Entry;
