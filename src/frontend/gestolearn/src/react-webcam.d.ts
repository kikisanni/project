declare module 'react-webcam' {
    import React from 'react';
    interface WebcamProps {
      audio?: boolean;
      ref?: React.RefObject<any>;
      videoConstraints?: {
        facingMode?: "user" | "environment" | { exact: "user" | "environment" };
        [key: string]: any; // Allow for other potential videoConstraints properties
      };
      screenshotFormat?: string;
      // Add other props as needed
    }
  
    const Webcam: React.ComponentType<WebcamProps>;
    export default Webcam;
  }

  