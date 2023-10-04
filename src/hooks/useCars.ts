import { useEffect, useState } from "react";
import { Car } from "../types/cars";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function getCars() {
      const response = await fetch('api/cars');
      const data = await response.json();

      setCars(data);
    }
    
    getCars();
  }, []);

  return {
    cars
  }
}