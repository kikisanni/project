import { useEffect } from 'react';

function OutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    // Function to call when click is detected outside the element
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    // Add event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default OutsideClick;