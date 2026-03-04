import axios from "../axios";

type TArg = {
  arg: string;
};

export const deleteFetcher = async (url: string, { arg }: TArg) => {
  const res = await axios.delete(`${url}/${arg}`);

  return res.data;
};
