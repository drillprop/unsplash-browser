import { useEffect, useState } from 'react';
import { decode } from 'blurhash';

// found here https://gist.github.com/ngbrown/d62eb518753378eb0a9bf02bb4723235

export const useBlurhash = (
  blurhash: string | undefined | null,
  width: number = 32,
  height: number = 32,
  punch: number = 1
) => {
  punch = punch || 1;

  const [url, setUrl] = useState(null as string | null);

  useEffect(() => {
    let isCancelled = false;

    if (!blurhash) return;

    const pixels = decode(blurhash, width, height, punch);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const imageData = context!.createImageData(width, height);
    imageData.data.set(pixels);
    context!.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (!isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob);
        });
      }
    });

    return () => {
      isCancelled = true;
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
};
