import { useState, useRef, useEffect } from "react";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { colors } from "@/theme";

type Props = {
  images: string[];
};

export const ImageCarousel = ({ images: productImgs }: Props) => {
  const images = productImgs.length ? productImgs : ["/puksilokok_logo.png"];

  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);

  const touchStartX = useRef<number>(null);
  const touchEndX = useRef<number>(null);

  const MIN_SWIPE_DISTANCE = 50;

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > MIN_SWIPE_DISTANCE) {
      next();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, [images.length]);

  return (
    <Box
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      width={"100%"}
      overflow={"hidden"}
      ref={ref}
    >
      <Flex
        transition="transform 0.4s ease"
        transform={`translateX(-${current * 100}%)`}
        width={`${images.length * 100}%`}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            flex="0 0 100%"
            borderRadius={"md"}
            display={"flex"}
            margin={"auto"}
          >
            <Image
              src={src || "/puksilokok_logo.png"}
              alt={`Slide ${index}`}
              aspectRatio={1 / 1}
              objectFit={"cover"}
              width={width}
              draggable={false}
              userSelect="none"
              borderRadius={"md"}
            />
          </Box>
        ))}
      </Flex>

      <Flex mt={2} justifyContent={"space-between"} alignContent={"center"}>
        <IconButton onClick={prev} aria-label="Previous" variant={"ghost"}>
          <HiChevronLeft />
        </IconButton>
        <Flex alignItems={"center"} gap={2}>
          {images.map((_, i) => (
            <Box
              key={i}
              bg={current === i ? colors.brown : colors.creamMedium}
              width={3}
              height={3}
              borderRadius={"full"}
              _hover={{ cursor: "pointer" }}
              onClick={() => setCurrent(i)}
            />
          ))}
        </Flex>
        <IconButton onClick={next} aria-label="Next" variant={"ghost"}>
          <HiChevronRight />
        </IconButton>
      </Flex>
    </Box>
  );
};
