from youtube_transcript_api import YouTubeTranscriptApi
import re

def get_video_id(youtube_url):
    """Extracts the video ID from the YouTube URL."""
    return re.search(r"(?<=v=)[^&#]+", youtube_url).group()

def get_transcript(video_id):
    """Fetches the transcript for a given video ID."""
    try:
        return YouTubeTranscriptApi.get_transcript(video_id)
    except Exception as e:
        print(f"Error fetching transcript: {e}")
        return None

def create_chunks(transcript, chunk_length=20):
    """Splits the transcript into chunks of specified length (in seconds)."""
    chunks = []
    current_chunk = ""
    chunk_start_time = 0

    for entry in transcript:
        if entry['start'] < chunk_start_time + chunk_length:
            current_chunk += entry['text'] + " "
        else:
            chunks.append((chunk_start_time, current_chunk.strip()))
            chunk_start_time = entry['start']
            current_chunk = entry['text'] + " "

    # Add the last chunk
    if current_chunk:
        chunks.append((chunk_start_time, current_chunk.strip()))

    return chunks

def main(youtube_url):
    video_id = get_video_id(youtube_url)
    transcript = get_transcript(video_id)
    if transcript:
        chunks = create_chunks(transcript)
        for start_time, chunk in chunks:
            print(f"Start Time: {start_time}s, Transcript: {chunk}\n")

# Example Usage
youtube_url = "https://www.youtube.com/watch?v=L_Guz73e6fw"
main(youtube_url)
