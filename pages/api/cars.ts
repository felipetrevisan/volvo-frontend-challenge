import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../public/api/cars.json";
import { Car } from "../../src/types/cars";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car[]>
) {
  res.status(200).json(data);
}
