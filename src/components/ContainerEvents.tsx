import React, { useEffect } from 'react';
import GenericStepper from './Stepper';

const ContainerEvents = ({ containerEvent, selectedDate }: { containerEvent: any, selectedDate?: Date | null }) => {

  // Prepare the steps data for the stepper
  const steps = Object.entries(containerEvent).map(([location, data]: [string, any]) => ({
    location,
    events: data.events,
    actual: data.actual, // Pass actual status
  }));

  // Function to find the latest past event relative to the current date and time
  const getLatestAccessibleStep = () => {
    const now = selectedDate;
    
    for (let i = steps.length - 1; i >= 0; i--) {
      const latestEvent = steps[i].events[0];
      // Parse the date (MM/DD/YYYY format)
      const [day, month, year] = latestEvent.eventDate.split('/').map(Number);

      // Parse the time (HH:MM format)
      const [hours, minutes] = latestEvent.eventTime.split(':').map(Number);

      // Create a new Date object using the parsed values
      const eventDateTime = new Date(year, month - 1, day, hours, minutes);
      
      if (now !== null && now !== undefined && eventDateTime <= now) {
        return i;
      }
    }
    return 0;
  };

  const latestAccessibleStep = getLatestAccessibleStep();

  return (
      <GenericStepper steps={steps} orientation="vertical" latestAccessibleStep={latestAccessibleStep} selectedDate={selectedDate} />
  );
};

export default ContainerEvents;
