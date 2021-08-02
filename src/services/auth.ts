import config from '@/config';
import req from '@/services/req';

export async function login(
  email: string,
  password: string
): Promise<loginRes> {
  let res;
  try {
    res = await req.post(`${config.apiUrl}/login`, {
      email: email,
      password: password,
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response.data,
    };
  }
}

interface loginRes {
  success: boolean;
  data: any;
}
