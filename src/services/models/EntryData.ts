import config from '@/config';
import req from '@/services/req';
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
    public updated_at: Date
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
      new Date(data['updated_at'])
    );
  }
  static fromJsonArray(data_array: any) {
    return (data_array as Array<EntryData>).map((data) => this.fromJson(data));
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
