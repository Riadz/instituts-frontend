import config from '@/config';
import req from '@/services/req';

class Specialty {
  constructor(
    public id: number,
    public code: number,
    public name: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static empty() {
    return new this(0, 0, '', new Date(), new Date());
  }

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['code'],
      data['name'],
      new Date(data['created_at']),
      new Date(data['updated_at'])
    );
  }

  static fromJsonArray(data_array: any) {
    return (data_array as Array<Specialty>).map((data) =>
      this.fromJson(data)
    );
  }

  static async all() {
    try {
      let res = await req.get(`${config.apiUrl}/specialty`);
      return this.fromJsonArray(res.data.reverse());
    } catch (error) {
      throw new Error('specialty all error: ' + error);
    }
  }
}

export default Specialty;
