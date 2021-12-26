import create from 'zustand';

export const useStore = create((set) => ({
  uploadedImages: [],
  sortedImagesAsZip: null,
  setUploadedImages: (imgs) => {
    set(() => ({ uploadedImages: imgs }));
  },
  clearUploadedImages: () => {
    set(() => ({ uploadedImages: [] }));
  },
  setSortedImages: (imgs) => {
    set(() => ({ sortedImagesAsZip: imgs }));
  },
  clearSortedImages: () => {
    set(() => ({ sortedImagesAsZip: null }));
  },
}));
