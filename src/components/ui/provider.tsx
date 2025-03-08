import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { colors } from "@/theme";

const customConfig = defineConfig({
  globalCss: {
    html: { height: "100%" },
    body: { height: "100%" },
    "#root": {
      backgroundColor: colors.cream,
      height: "100%",
      color: colors.brown,
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} forcedTheme="light" />
    </ChakraProvider>
  );
}
