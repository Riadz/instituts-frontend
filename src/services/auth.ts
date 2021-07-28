import req from '@/services/req';
import settings from '@/settings';

export async function login(
  email: string,
  password: string
): Promise<loginRes> {
  let res = await req.post(`${settings.apiUrl}/`, {
    email: email,
    password: password,
  });

  if (res.status != 200)
    return {
      success: false,
      data: null,
    };

  return {
    success: true,
    data: res.data,
  };
}

interface loginRes {
  success: boolean;
  data: any;
}
