import create from 'zustand';

export const useStore = create((set) => ({
  uploadedImages: [],
  setUploadedImages: (imgs) => {
    set(() => ({ uploadedImages: imgs }));
  },
  clearUploadedImages: () => {
    set(() => ({ uploadedImages: [] }));
  },
}));
