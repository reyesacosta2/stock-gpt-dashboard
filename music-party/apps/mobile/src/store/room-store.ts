import { create } from 'zustand';

export interface QueueItem {
  id: string;
  title: string;
  artist: string;
  status: string;
  votes: number;
  addedBy: string;
}

interface RoomState {
  roomId?: string;
  joinCode?: string;
  queue: QueueItem[];
  setRoom: (roomId: string, joinCode: string) => void;
  addQueueItem: (item: QueueItem) => void;
  vote: (id: string, delta: number) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  queue: [],
  setRoom: (roomId, joinCode) => set({ roomId, joinCode }),
  addQueueItem: (item) => set((state) => ({ queue: [...state.queue, item] })),
  vote: (id, delta) =>
    set((state) => ({
      queue: state.queue.map((item) => (item.id === id ? { ...item, votes: item.votes + delta } : item)),
    })),
}));
