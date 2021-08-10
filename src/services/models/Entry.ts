import config from '@/config';
import req from '@/services/req';

class Entry {
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
}

export default Entry;
