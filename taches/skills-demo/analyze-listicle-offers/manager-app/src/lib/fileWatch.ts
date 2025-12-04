// Note: File watching doesn't work in browser environment
// This is a placeholder for future Electron or Node.js implementation

export interface FileDetectionEvent {
  filePath: string;
  fileName: string;
  content: string;
  timestamp: Date;
}

export type FileDetectionCallback = (event: FileDetectionEvent) => void;

export function startFileWatcher(_onNewFile: FileDetectionCallback): { close: () => void } {
  console.warn('File watching is not supported in browser environment');
  return {
    close: () => {
      // No-op
    }
  };
}

export async function stopFileWatcher(_watcher: { close: () => void }): Promise<void> {
  // No-op
}

export function getOutputDirectory(): string {
  return '~/.claude/listicle-outputs';
}

export async function checkOutputDirectory(): Promise<boolean> {
  return false;
}

export async function ensureOutputDirectory(): Promise<void> {
  console.warn('Cannot create directories in browser environment');
}
