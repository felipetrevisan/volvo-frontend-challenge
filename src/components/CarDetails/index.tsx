"use client";

import Image from "next/image";
import Link from "next/link";
import { Link as VccLink, Text } from "vcc-ui";
import { Car } from "../../types/cars";

type Props = Car;

export function CarDetails(car: Props) {
  const { imageUrl, modelName, modelType, bodyType } = car;

  return (
    <Link href="" passHref className="relative group/view">
      <div className="flex flex-col justify-between gap-1 group-hover/view:text-red-700"
        // direction="column"
        // justifyContent="space-between"
        // spacing={1}
        // extend={{
        //   ":hover *": {
        //     color: "#2a609d",
        //   },
        // }}
      >
        <Text variant="bates" subStyle="emphasis" extend={{ textTransform: "uppercase" }}>
          {bodyType}
        </Text>
        <div className="flex flex-col md:flex-row md:gap-2">
          <Text variant="amundsen">{modelName}</Text>
          <Text variant="columbus">{modelType}</Text>
        </div>
        <div className="overflow-hidden relative h-[210px] w-[270px]">
          <Image
            alt=""
            src={imageUrl}
            // width={290}
            // height={218}
            layout="fill"
            objectFit="contain"
            // sizes="(max-width: 640px) 70vw,
            //         (max-width: 1280px) 50vw,
            //         (max-width: 1536px) 33vw,
            //         50vw"
            className="group-hover/view:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex justify-center gap-4 items-center">
          <div>
            <VccLink href="" arrow="right">
              Learn
            </VccLink>
          </div>
          <div>
            <VccLink href="" arrow="right">
              Shop
            </VccLink>
          </div>
        </div>
      </div>
    </Link>
  );
}
