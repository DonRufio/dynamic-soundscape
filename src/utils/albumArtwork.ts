import axios from 'axios';

const LASTFM_API_KEY = '211e0402ad2fa10ced1738ea836909df';
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const fetchAlbumArtwork = async (artist: string, track: string): Promise<string> => {
  try {
    console.log('Fetching album artwork for:', { artist, track });
    
    const response = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: 'track.getInfo',
        api_key: LASTFM_API_KEY,
        artist,
        track,
        format: 'json'
      }
    });

    console.log('Last.fm API response:', response.data);

    const artwork = response.data?.track?.album?.image;
    if (artwork && Array.isArray(artwork)) {
      const largeImage = artwork[artwork.length - 1]['#text'];
      if (largeImage) {
        console.log('Found album artwork:', largeImage);
        return largeImage;
      }
    }

    console.log('No album artwork found, using placeholder');
    return '/placeholder.svg';
  } catch (error) {
    console.error('Error fetching album artwork:', error);
    return '/placeholder.svg';
  }
};