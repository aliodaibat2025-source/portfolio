"use client";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { gallery } from "@/types/index";

type GalleryApiResponse = {
  data: gallery[];
};

type GalleryProps = {
  galleryimages: GalleryApiResponse;
};

export default function Gallery({ galleryimages }: GalleryProps) {
  const t = useTranslations("gallery"); // استخدم مساحة الترجمة "gallery"
  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  const images = galleryimages.data || [];

  if (!images.length) {
    return
  }

  // حالة وجود صور
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800 px-12 py-20 flex items-center justify-center">
      <div className="w-[90%] max-w-7xl">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          {t("heading")}
        </h2>

        <Carousel opts={{ loop: false }} plugins={[autoplay.current]}>
          <CarouselContent className="flex -ml-1 py-6 w-full">
            {images.map((item, idx) => (
              <CarouselItem key={item.id} className="p-3 lg:basis-1/3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer overflow-hidden bg-transparent border-0 p-0 hover:scale-105 transition-transform duration-300">
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={item.image}
                          alt={`${t("image_alt")} ${idx + 1}`}
                          fill
                          className="object-cover block"
                        />
                      </div>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-full w-full h-auto md:max-w-4xl bg-transparent border-none rounded-lg">
                    <DialogTitle className="hidden">
                      <VisuallyHidden>
                        {t("image_alt")} {idx + 1}
                      </VisuallyHidden>
                    </DialogTitle>

                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={item.image}
                        alt={`${t("image_alt")} ${idx + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
