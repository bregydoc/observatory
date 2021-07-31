import { Box, Flex } from "@chakra-ui/react";
import { HelloWorld } from "components/ui/HelloWorld";
import { useObservePetriDishSubscription } from "integration/graphql";
import { useEffect, useRef } from "react";

const HomePageContent = () => {
  const [{ data, fetching, error, operation, stale }] = useObservePetriDishSubscription({
    variables: { id: "f6b04f13-f569-44f7-bd3b-c11666f9eab8" },
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    // console.log(ctx);
    if (ctx === null || ctx === undefined) return;

    var image = new Image();
    image.src = "data:image/gif;base64," + data?.observer?.data;
    image.onload = () => ctx?.drawImage(image, 0, 0);
  }, [data]);

  return (
    <Flex h="100vh" alignItems={"center"}>
      <Flex justifyContent={"center"} w={"100%"}>
        <Box maxWidth={72}>
          {/* <HelloWorld /> */}
          {/* <img alt="observer" src={"data:image/jpeg;base64," + data?.observer?.data} /> */}
          <canvas ref={canvasRef} width="256" height="256"></canvas>
        </Box>
      </Flex>
    </Flex>
  );
};

export { HomePageContent };
