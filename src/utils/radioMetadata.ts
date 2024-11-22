export interface RadioMetadata {
  title: string;
  artist: string;
}

export const fetchRadioMetadata = async (): Promise<RadioMetadata> => {
  try {
    console.log('Fetching radio metadata...');
    const response = await fetch('https://therock-airserv.radioca.st/currentsong?sid=1');
    const text = await response.text();
    
    console.log('Raw metadata:', text);
    
    const [artist, title] = text.split(' - ');
    
    if (artist && title) {
      console.log('Metadata parsed:', { artist, title });
      return {
        artist: artist.trim(),
        title: title.trim()
      };
    }
    
    return {
      artist: 'The Rock Radio',
      title: 'Loading...'
    };
  } catch (error) {
    console.error('Error fetching radio metadata:', error);
    return {
      artist: 'The Rock Radio',
      title: 'Loading...'
    };
  }
};