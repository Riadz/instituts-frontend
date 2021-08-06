import config from '@/config';
import req from '@/services/req';
import CountryState from '@/services/models/CountryState';

class Institute {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public emails: Array<string>,
    public numbers: Array<string>,
    public country_state_id: number,
    public country_state: CountryState,
    public created_at: Date,
    public updated_at: Date,
    public pin_code?: string
  ) {}

  static empty() {
    return new this(
      0,
      '',
      '',
      [],
      [],
      0,
      CountryState.empty(),
      new Date(),
      new Date()
    );
  }

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['name'],
      data['type'],
      data['emails'],
      data['numbers'],
      data['country_state_id'],
      CountryState.fromJson(data['country_state']),
      new Date(data['created_at']),
      new Date(data['updated_at']),
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

  static async patch(id: number, data) {
    try {
      let res = await req.patch(`${config.apiUrl}/institute/${id}`, data);
      return Institute.fromJson(res.data);
    } catch (error) {
      throw new Error('institute patch error: ' + error);
    }
  }

  static async delete(id: number) {
    try {
      await req.delete(`${config.apiUrl}/institute/${id}`);
      return true;
    } catch (error) {
      throw new Error('institute delete error: ' + error);
    }
  }
}

export default Institute;
