import { useEffect, useState } from "react";
import { Car } from "../types/cars";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [carsBodyType, setCarsBodyType] = useState<string[]>([]);

  useEffect(() => {
    async function getCars() {
      const response = await fetch('api/cars');
      const data: Car[] = await response.json();

      const bodiesType = new Set(data.map(car => car.bodyType));

      setCars(data);
      setCarsBodyType(Array.from(bodiesType));
    }
    
    getCars();
  }, []);

  return {
    cars,
    carsBodyType
  }
}