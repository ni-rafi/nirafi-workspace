import React, { useState, useEffect, useRef } from 'react';
import { Video } from 'lucide-react';

interface PresentationRecorderProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
  lectureId: string;
}

export const PresentationRecorder: React.FC<PresentationRecorderProps> = ({
  isRecording,
  onRecordingChange,
  lectureId,
}) => {
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Format seconds to MM:SS
  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer counter for recording duration
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (isRecording) {
      timerId = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRecording]);

  // Handle start/stop operations
  useEffect(() => {
    const startRecording = async () => {
      chunksRef.current = [];
      try {
        // Request screen sharing capture
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true, // option to share system tab sound
        });

        // Request microphone sound inputs (optional fallback)
        const audioStream = await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .catch(() => null);

        const tracks: MediaStreamTrack[] = [...displayStream.getVideoTracks()];

        // Merge audio tracks from screen sharing and mic
        const displayAudioTracks = displayStream.getAudioTracks();
        if (displayAudioTracks.length > 0) {
          tracks.push(...displayAudioTracks);
        }
        if (audioStream) {
          tracks.push(...audioStream.getAudioTracks());
        }

        const combinedStream = new MediaStream(tracks);
        streamRef.current = combinedStream;

        // Detect if user stops screen sharing from browser native bar
        displayStream.getVideoTracks()[0]?.addEventListener('ended', () => {
          onRecordingChange(false);
        });

        const recorder = new MediaRecorder(combinedStream, {
          mimeType: 'video/webm;codecs=vp9',
        });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `lecture_${lectureId}_recording_${Date.now()}.webm`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        };

        recorder.start(1000); // chunk buffer every 1s
      } catch (err) {
        console.warn('Failed to start recording stream:', err);
        onRecordingChange(false);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isRecording, lectureId, onRecordingChange]);

  if (!isRecording) return null;

  return (
    <div
      className="absolute top-20 left-6 z-40 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 font-mono text-xs text-red-500 shadow-xl backdrop-blur-md select-none"
      data-presentation-recorder
    >
      <Video className="h-4 w-4 text-red-500 animate-pulse" />
      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping mr-1" />
      <span className="font-bold">REC {formatDuration(duration)}</span>
    </div>
  );
};

export default PresentationRecorder;
