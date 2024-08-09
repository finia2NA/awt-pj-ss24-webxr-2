import { Container, Text } from "@react-three/uikit";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";
import TextInput from "../components/TextInput";
import { useMemo, useState } from "react";
import useKeyboardStore from "../hooks/useKeyboardStore.ts";
import useCurrentTime from "../hooks/useCurrentTime.ts";
import HomeSection from "../components/Home/HomeSection.tsx";
import { HomeRecommendationProps, homeRecommPropsFromService } from "../components/Home/HomeRecommendation.tsx";
import { Service } from "dvbi-lib/src/model/services.ts";
import { search } from "fast-fuzzy";

// Interface for the props passed to the HomeWindow component
interface HomeWindowProps {
  loading?: boolean; // Indicates if the data is loading
  error?: Error | null; // Holds any error that might occur
  hearted: HomeRecommendationProps[]; // List of hearted channels
  recent: HomeRecommendationProps[]; // List of recently watched channels
  services: Service[]; // List of services available for search
}

/**
 * HomeWindow component renders the home screen of the application.
 * It displays loading, error, hearted channels, recently watched channels, 
 * and search results based on the current state.
 */
const HomeWindow = ({ loading, error, hearted, recent, services }: HomeWindowProps) => {
  // State for the search string input by the user
  const [searchString, setSearchString] = useState("");
  // Hook to toggle the visibility of the on-screen keyboard
  const { toggleVisibility: toggleKeyboard } = useKeyboardStore();
  // Hook to get the current time string
  const timeString = useCurrentTime();

  // Memoized search results to optimize performance
  const searchResults = useMemo(() => {
    if (!searchString) return [];

    // Perform fuzzy search on services based on the search string
    const searchResultChannels = search(searchString, services, { keySelector: (service) => service.serviceName }).slice(0, 20); // Only load the first 20 to not run into performance problems for the first letter
    const searchResultHomeRecs = searchResultChannels.map(service => {
      return homeRecommPropsFromService(service, timeString);
    });
    return searchResultHomeRecs;
  }, [searchString, services])

  return (
    <Card alignSelf={"flex-start"} paddingY={14} paddingX={10} flexDirection={"column"} gap={20} width={600} height={380}
      backgroundColor={error ? "red" : undefined}>
      {/* Top Layout */}
      <Container justifyContent={"space-between"} marginX={10}>
        {/* Searching */}
        <Container>
          <GlyphButton type={ButtonType.Search} onClick={toggleKeyboard} />
          <TextInput placeholder="Search Channels" value={searchString} setValue={setSearchString} />
        </Container>
        {/* Time */}
        <Container alignItems={"center"} flexDirection={"row"} gap={10}>
          {searchString ?
            <>
              <GlyphButton type={ButtonType.Cross} onClick={() => setSearchString("")} />
              <Text fontSize={20} fontWeight={"medium"}>{timeString}</Text>
            </>
            :
            <Text fontSize={20} fontWeight={"medium"}>{timeString}</Text>
          }
        </Container>
      </Container>

      {/* Error Layout */}
      {error &&
        <Container margin={100} justifyContent={"center"}>
          <Text fontSize={20}> Error: {error.message}</Text>
        </Container >
      }

      {/* Loading Layout */}
      {!error && loading &&
        <Container margin={100} justifyContent={"center"}>
          <Text fontSize={20}> Loading...</Text>
        </Container >
      }

      {/* Content Layout */}
      {!error && !loading && !searchString &&
        <Container marginY={10} marginX={20} flexDirection={"column"} gap={20}>
          <HomeSection title="Your Favorite Channels" channels={hearted} altText="Heart Channels to display them here" />
          <HomeSection title="Recently watched channels" channels={recent} altText="Watch Channels to display them here" />
        </Container>
      }

      {/* Search Layout */}
      {!error && !loading && searchString &&
        <Container marginY={10} marginX={20} flexDirection={"column"} gap={20}>
          <HomeSection title="Search Results" channels={searchResults} altText="Try to adjust your search" />
        </Container>
      }
    </Card >
  );
}

export default HomeWindow;
