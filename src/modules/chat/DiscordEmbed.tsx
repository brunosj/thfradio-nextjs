import WidgetBot from '@widgetbot/react-embed';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  DISCORD_SERVER_ID,
  DISCORD_CHANNEL_ID,
  DISCORD_INVITE_URL,
} from '@/utils/constants';

export default function DiscordEmbed() {
  const [window, setWindow] = useState<boolean>(false);

  // need to design a few basic avatars

  // const avatars = [
  //   'https://thfradio.de/images/chat-avatar.png',
  //   'https://thfradio.de/images/chat-avatar_1.png',
  //   'https://thfradio.de/images/chat-avatar_2.png',
  //   'https://thfradio.de/images/chat-avatar_3.png',
  //   'https://thfradio.de/images/chat-avatar_6.png',
  //   'https://thfradio.de/images/chat-avatar_7.png',
  //   'https://thfradio.de/images/chat-avatar_8.png',
  //   'https://thfradio.de/images/chat-avatar_9.png',
  //   'https://thfradio.de/images/chat-avatar_10.png',
  //   'https://thfradio.de/images/chat-avatar_11.png',
  // ];

  // const avatar = avatars[Math.floor(Math.random() * avatars.length)];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindow(true);
    }
  }, [window]);

  if (window) {
    return (
      <WidgetBot
        className='h-full w-full'
        server={DISCORD_SERVER_ID}
        channel={DISCORD_CHANNEL_ID}
        // avatar={avatar}
      />
    );
  }
}
