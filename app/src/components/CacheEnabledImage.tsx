import { Image, ImageProperties } from "@react-three/uikit";
import { useEffect, useState } from "react";
import { Texture, TextureLoader } from "three";

function replaceBase(original: string, replacementBasePath: string) {
  // Use a regular expression to extract the file name from the original URL
  const matchResult = original.match(/[^/]+$/);
  const fileName = matchResult ? matchResult[0] : '';

  // Combine the replacement base path and the file name
  const newUrl = `${replacementBasePath.replace(/\/+$/, '')}/${fileName}`;

  // Return the new URL
  return newUrl;
}

const CacheEnabledImage = (props: ImageProperties) => {
  const originalSrc = props.src as string;

  const [texture, setTexture] = useState<Texture>();

  useEffect(() => {
    const textureLoader = new TextureLoader();

    // If we did have this image cached, it would be here
    const hypotheticalCachedSrc = replaceBase(originalSrc, "logos/");

    const loadTexture = (url: string) => {
      return new Promise<Texture>((resolve, reject) => {
        textureLoader.load(
          url,
          (loadedTexture) => {
            resolve(loadedTexture);
          },
          undefined,
          (error) => {
            reject(error);
          }
        );
      });
    };

    loadTexture(originalSrc)
      .then((loadedTexture) => {
        setTexture(loadedTexture);
      })
      .catch((error) => {
        console.log('Failed to load originalSrc, trying hypotheticalCachedSrc:', error);
        loadTexture(hypotheticalCachedSrc)
          .then((loadedTexture) => {
            setTexture(loadedTexture);
          })
          .catch((secondError) => {
            console.error('Failed to load hypotheticalCachedSrc:', secondError);
          });
      });

  }, [originalSrc]);

  return (
    <Image {...props} src={texture}></Image>
  );
}

export default CacheEnabledImage;
