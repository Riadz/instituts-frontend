import config from '@/config';
import req from '@/services/req';

class Formation {
  constructor(
    public id: number,
    public name: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static empty() {
    return new this(0, '', new Date(), new Date());
  }

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['name'],
      new Date(data['created_at']),
      new Date(data['updated_at'])
    );
  }

  static fromJsonArray(data_array: any) {
    return (data_array as Array<Formation>).map((data) =>
      this.fromJson(data)
    );
  }

  static async all() {
    try {
      let res = await req.get(`${config.apiUrl}/formation`);
      return this.fromJsonArray(res.data.reverse());
    } catch (error) {
      throw new Error('formation all error: ' + error);
    }
  }
}

export default Formation;
