import axios from "../axios";

export const postFetcher = async (
  url: string,
  { arg }: { arg: any },
) => {
  const res = await axios.post(url, arg);
  return res.data;
};

export const patchFetcher = async (
  url: string,
  { arg }: { arg: { id: string; data: any } },
) => {
  const { id, data } = arg;

  const res = await axios.patch(`${url}/${id}`, data);

  return res.data;
};
