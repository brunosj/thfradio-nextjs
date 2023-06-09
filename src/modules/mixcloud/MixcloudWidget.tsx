import { useEffect, useState } from 'react';

const MixcloudWidget = () => {
  const [selectedShowUrl, setSelectedShowUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleShowChange = (url: string) => {
      setSelectedShowUrl(url);
    };

    document.addEventListener('mixcloud-show-change', (event: any) => {
      handleShowChange(event.detail.url);
    });

    return () => {
      document.removeEventListener('mixcloud-show-change', (event: any) =>
        handleShowChange(event.detail.url)
      );
    };
  }, []);

  useEffect(() => {
    if (selectedShowUrl) {
      const iframe = document.getElementById(
        'mixcloud-widget-iframe'
      ) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
          selectedShowUrl
        )}`;
      }
    }
  }, [selectedShowUrl]);

  return (
    <div className='mixcloud-widget fixed bottom-0 left-0 w-full  flex items-end justify-center bg-transparent z-0'>
      {selectedShowUrl && (
        <iframe
          id='mixcloud-widget-iframe'
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
            selectedShowUrl
          )}`}
          frameBorder='0'
          width='100%'
          height='60'
        ></iframe>
      )}
    </div>
  );
};

export default MixcloudWidget;
