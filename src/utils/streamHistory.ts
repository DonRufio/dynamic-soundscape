export interface StreamHistoryEntry {
    time: string; // Time the song was played
    title: string; // Title of the song
  }
  
  export type StreamHistory = StreamHistoryEntry[]; // An array of stream history entries
  
  export const fetchStreamHistory = async (): Promise<StreamHistory> => {
    try {
      const response = await fetch('https://therock-airserv.radioca.st/played.html?sid=1');
      const html = await response.text();
  
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
  
      // Select rows in the history table
      const rows = doc.querySelectorAll('table tr');
  
      // Initialize an empty history array
      const history: StreamHistory = [];
  
      // Loop through table rows and extract song history data
      rows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const time = cells[0].textContent?.trim() || '';
          const title = cells[1].textContent?.trim() || '';
          history.push({ time, title });
        }
      });
  
      return history;
    } catch (error) {
      console.error('Failed to fetch stream history:', error);
      return [];
    }
  };
  