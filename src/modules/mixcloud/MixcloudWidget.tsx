import React, { useEffect } from 'react';
import useAudioStore from '@/hooks/useAudioStore';

const MixcloudWidget = () => {
  const { url, isMixcloudPlaying, setMixcloudPlay } = useAudioStore();

  useEffect(() => {
    const handleShowChange = (url: string) => {
      useAudioStore.setState({ url, source: 'archive' });
      setMixcloudPlay(true);
    };

    document.addEventListener('mixcloud-show-change', (event: any) => {
      handleShowChange(event.detail.url);
    });

    return () => {
      document.removeEventListener('mixcloud-show-change', (event: any) =>
        handleShowChange(event.detail.url)
      );
    };
  }, [setMixcloudPlay]);

  useEffect(() => {
    if (url && isMixcloudPlaying) {
      const iframe = document.getElementById(
        'mixcloud-widget-iframe'
      ) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
          url
        )}`;
      }
    }
  }, [url, isMixcloudPlaying]);

  return (
    <div className='mixcloud-widget fixed bottom-0 left-0 w-full flex items-end justify-center bg-transparent z-0'>
      {url && isMixcloudPlaying && (
        <iframe
          id='mixcloud-widget-iframe'
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
            url
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
