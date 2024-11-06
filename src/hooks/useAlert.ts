import { useState } from 'react';

export const useAlert = () => {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);
  return { isOverlapDialogOpen, setIsOverlapDialogOpen, overlappingEvents, setOverlappingEvents };
};
