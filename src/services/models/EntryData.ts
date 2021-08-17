import config from '@/config';
import req from '@/services/req';
import Entry from './Entry';
import Formation from './Formation';
import Specialty from './Specialty';

class EntryData {
  constructor(
    public id: number,
    public quantity: number,
    public branch_code: string,
    public specialty_id: number,
    public specialty: Specialty,
    public formation_id: number,
    public formation: Formation,
    public created_at: Date,
    public updated_at: Date,
    public entry?: Entry
  ) {}

  static fromJson(data: any) {
    return new this(
      data['id'],
      data['quantity'],
      data['branch_code'],
      data['specialty_id'],
      Specialty.fromJson(data['specialty']),
      data['formation_id'],
      Formation.fromJson(data['formation']),
      new Date(data['created_at']),
      new Date(data['updated_at']),
      data['entry'] && Entry.fromJson(data['entry'])
    );
  }
  static fromJsonArray(data_array: any) {
    return (data_array as Array<EntryData>).map((data) => this.fromJson(data));
  }

  static async table() {
    try {
      let res = await req.get(`${config.apiUrl}/entry_data`);
      return this.fromJsonArray(res.data);
    } catch (error) {
      throw new Error('entry data table error: ' + error);
    }
  }

  //
  getQuantity(formation_id: number | null = null) {
    if (formation_id === null) {
      return this.quantity;
    }
    if (this.formation_id == formation_id) {
      return this.quantity;
    }

    return '';
  }
  // prettier-ignore
  static branch_codes = [
    'ACP', 'AGR', 'AIG', 'ART',
    'BAM', 'BTP', 'CIP', 'CML',
    'CMS', 'CPX', 'ELE', 'HRT',
    'IAA', 'INT', 'INP', 'MEE',
    'MES', 'MIC', 'MME', 'PEC',
    'TAG', 'TAV', 'THC',
  ];
}

export default EntryData;
