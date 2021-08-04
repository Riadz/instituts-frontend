import config from '@/config';
import req from '@/services/req';

class CountryState {
  constructor(
    public id: number,
    public code: number,
    public name: string,
    public name_ar: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['code'],
      data['name'],
      data['name_ar'],
      new Date(data['created_at']),
      new Date(data['updated_at'])
    );
  }

  static fromJsonArray(data_array: any) {
    return (data_array as Array<CountryState>).map((data) =>
      this.fromJson(data)
    );
  }
}

export default CountryState;
