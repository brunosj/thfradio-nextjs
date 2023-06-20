import React from 'react';

type AudioState = {
  isPlaying: boolean;
  volume: number;
  url: string;
  source: string | null;
  isMixcloudPlaying: boolean;
};

type AudioAction = {
  type: string;
  payload?: any;
};

const initialState: AudioState = {
  isPlaying: false,
  volume: 1,
  url: '',
  isMixcloudPlaying: false, // <-- add this
  source: null, // live or archive
};

export const AudioStateContext = React.createContext(initialState);
export const AudioDispatchContext = React.createContext(
  (() => {}) as React.Dispatch<AudioAction>
);

const reducer = (state: AudioState, action: AudioAction) => {
  switch (action.type) {
    case 'TOGGLE_PLAY': {
      if (state.isMixcloudPlaying) {
        return {
          ...state,
          isMixcloudPlaying: false,
          mixcloudUrl: null,
        };
      }
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    }
    case 'SET_VOLUME': {
      return {
        ...state,
        volume: action.payload,
      };
    }
    case 'SET_URL': {
      return {
        ...state,
        url: action.payload,
      };
    }
    case 'SET_SOURCE': {
      return {
        ...state,
        source: action.payload,
      };
    }
    case 'TOGGLE_MIXCLOUD_PLAY': {
      // <-- add this case
      return {
        ...state,
        isMixcloudPlaying: !state.isMixcloudPlaying,
      };
    }
    default:
      throw new Error('Bad Action Type');
  }
};

type AudioContextProviderProps = {
  children: React.ReactNode;
};

const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AudioStateContext.Provider value={state}>
      <AudioDispatchContext.Provider value={dispatch}>
        {children}
      </AudioDispatchContext.Provider>
    </AudioStateContext.Provider>
  );
};

export default AudioContextProvider;
