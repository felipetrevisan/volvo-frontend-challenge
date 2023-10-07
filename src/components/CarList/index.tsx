"use client";

import { useSpringCarousel } from "react-spring-carousel";
import { IconButton, TabNav, TabNavItem, Text, View } from "vcc-ui";
import { useEffect, useState } from "react";
import { Car } from "../../types/cars";
import { CarDetails } from "../CarDetails";

type Props = {
  data: Car[];
  types: string[];
  itemsPerPage?: number;
};

export function CarList({ data, types, itemsPerPage = 4 }: Props) {
  const [activeItem, setActiveItem] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [items, setItems] = useState(data);
  const [isPaginated, setIsPaginated] = useState(false);

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    gutter: activeTab !== null ? 20 : 0,
    shouldResizeOnWindowResize: true,
    slideWhenThresholdIsReached: true,
    itemsPerSlide: itemsPerPage,
    initialActiveItem: 0,
    items: items.map((item, index) => ({
      id: index,
      renderItem: <CarDetails key={item.id} {...item} />,
    })),
  });

  useListenToCustomEvent((event: any) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(event.nextItem.id);
    }
  });

  useEffect(() => {
    setActiveItem(0);
    
    if (activeTab === null) {
      setItems(data);
      return;
    }

    setItems(data.filter((car) => car.bodyType === activeTab));
  }, [activeTab]);

  useEffect(() => {
    if (items.length <= itemsPerPage) {
      setIsPaginated(false);
      return;
    }

    setIsPaginated(true);
  }, [items, itemsPerPage]);

  return (
    <div className="flex flex-col md:items-center gap-2 p-4">
      <div className="max-w-[1000.4px] md:max-w-[1132.4px] lg:max-w-[1110.4px] xl:max-w-[1232.4px]">
        <View display="flex" spacing={5}>
          <Text
            variant="ootah"
            subStyle="emphasis"
            as="h2"
            extend={{ textAlign: "center" }}
          >
            Todos os modelos Recharge
          </Text>
          <View
            display="flex"
            justifyContent="center"
            direction="row"
            className="filter"
          >
            <TabNav enableLineTransition>
              <TabNavItem
                isActive={activeTab === null}
                onClick={() => setActiveTab(null)}
              >
                Todos
              </TabNavItem>
              {types.map((value, key) => (
                <TabNavItem
                  key={key}
                  isActive={activeTab === value}
                  onClick={() => setActiveTab(value)}
                >
                  {value.toLocaleUpperCase()}
                </TabNavItem>
              ))}
            </TabNav>
          </View>
          <div className="flex overflow-hidden">{carouselFragment}</div>
        </View>
      </div>
      {isPaginated && (
        <>
          <div className="lg:flex lg:justify-end gap-2 mt-2 mr-2 hidden w-full">
            <View direction="row" justifyContent="space-between" spacing={4}>
              <IconButton
                aria-label="Previous Item"
                iconName="navigation-chevronback"
                bleed={true}
                onClick={slideToPrevItem}
                variant="outline"
                disabled={activeItem === 0}
              />
              <IconButton
                aria-label="Next Item"
                iconName="navigation-chevronforward"
                bleed={true}
                onClick={slideToNextItem}
                variant="outline"
                disabled={activeItem === itemsPerPage}
              />
            </View>
          </div>
          <div className="flex justify-center gap-2 mt-2 mr-2 lg:hidden">
            <View direction="row" justifyContent="space-between" spacing={1}>
              {Array.from({
                length: Math.ceil((data.length - itemsPerPage) / 1) + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => slideToItem(index)}
                  className="w-2 h-2 bg-[#ebebeb] rounded-full data-[active=true]:bg-[#000000f5]"
                  type="button"
                  data-active={activeItem === index}
                />
              ))}
            </View>
          </div>
        </>
      )}
    </div>
  );
}
