import { Grid, Row } from "vcc-ui";
import { useCars } from "../src/hooks/useCars";
import { CarList } from "../src/components/CarList";

export default function Home() {
  const { cars, carsBodyType } = useCars();

  return (
    <main className="flex min-h-screen flex-col justify-center mx-10">
       {/* <Grid>
        <Row align="center"> */}
          {cars.length > 0 && <CarList data={cars ?? []} types={carsBodyType} itemsPerPage={4} />}
        {/* </Row>
      </Grid> */}
    </main>
  );
}