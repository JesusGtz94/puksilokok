import { colors } from "@/theme";
import { Flex, Image } from "@chakra-ui/react";

type Props = {
  size?: "s" | "m" | "l";
};

export const LogoWithBackground = ({ size = "m" }: Props) => {
  const large = size === "s" ? 25 : size === "m" ? 50 : 75;

  return (
    <Flex
      height={large + large * 0.07}
      width={large + large * 0.07}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={large}
      backgroundColor={colors.brandPink}
    >
      <Image src="/puksilokok_logo.png" height={large} resize={"both"} />
    </Flex>
  );
};
