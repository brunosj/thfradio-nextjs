import create from 'zustand';

interface AudioState {
  isPlaying: boolean;
  volume: number;
  url: string;
  source: string | null;
  isMixcloudPlaying: boolean;
}

interface AudioActions {
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setUrl: (url: string) => void;
  setSource: (source: string | null) => void;
  setMixcloudPlay: (isPlaying: boolean) => void;
}

type AudioStore = AudioState & AudioActions;

const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: false,
  volume: 1,
  url: '',
  source: null,
  isMixcloudPlaying: false,

  togglePlay: () => {
    set((state) => {
      if (state.isPlaying) {
        // If currently playing, stop the audio only
        return {
          ...state,
          isPlaying: false,
        };
      } else {
        // If not playing, start the audio
        return {
          ...state,
          isPlaying: true,
          isMixcloudPlaying: false, // Stop the Mixcloud show
          url: '', // Clear the Mixcloud URL
        };
      }
    });
  },
  setVolume: (volume) => {
    set((state) => ({ volume }));
  },

  setUrl: (url) => {
    set((state) => ({ url }));
  },

  setSource: (source) => {
    set((state) => ({ source }));
  },

  setMixcloudPlay: (isPlaying) => {
    set((state) => ({ isMixcloudPlaying: isPlaying }));
  },
}));

export default useAudioStore;
