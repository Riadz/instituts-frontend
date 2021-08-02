import config from '@/config';
import req from '@/services/req';

class Institute {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public emails: Array<string>,
    public numbers: Array<string>,
    public country_state_id: number,
    public created_at: string,
    public updated_at: string,
    public pin_code?: string
  ) {}

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['name'],
      data['type'],
      data['emails'],
      data['numbers'],
      data['country_state_id'],
      data['created_at'],
      data['updated_at'],
      data['pin_code']
    );
  }

  static fromJsonArray(data_array: any) {
    return (data_array as Array<Institute>).map((data) => this.fromJson(data));
  }

  static async all() {
    try {
      let res = await req.get(`${config.apiUrl}/institute`);
      return this.fromJsonArray(res.data.data);
    } catch (error) {
      throw new Error('institute all error: ' + error);
    }
  }
}

export default Institute;
