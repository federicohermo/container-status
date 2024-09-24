import React, { useEffect } from 'react';
import GenericStepper from './Stepper';

const groupEventsByLocation = (events: any) => {
  return events.reduce((acc: any, event: any) => {
    const locationName = event.location.name + ", " + event.location.country;
    if (!acc[locationName]) {
      acc[locationName] = { events: [], actual: false };
    }
    
    acc[locationName].events.push({
      description: event.description,
      eventDate: new Date(event.event_date).toLocaleDateString(),
      eventTime: new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    
    // If this event is marked as actual, set the location as actual
    if (event.actual) {
      acc[locationName].actual = true;
    }

    return acc;
  }, {});
};

const ContainerEvents = ({ containerEvent, selectedDate }: { containerEvent: any, selectedDate?: Date | null }) => {
  const groupedEvents = groupEventsByLocation(containerEvent);

  // Prepare the steps data for the stepper
  const steps = Object.entries(groupedEvents).map(([location, data]: [string, any]) => ({
    location,
    events: data.events,
    actual: data.actual, // Pass actual status
  }));

  // Function to find the latest past event relative to the current date and time
  const getLatestAccessibleStep = () => {
    const now = selectedDate;
    
    for (let i = steps.length - 1; i >= 0; i--) {
      const latestEvent = steps[i].events[steps[i].events.length - 1];
      // Parse the date (MM/DD/YYYY format)
      const [day, month, year] = latestEvent.eventDate.split('/').map(Number);

      // Parse the time (HH:MM format)
      const [hours, minutes] = latestEvent.eventTime.split(':').map(Number);

      // Create a new Date object using the parsed values
      const eventDateTime = new Date(year, month - 1, day, hours, minutes);
      
      if (now !== null && now !== undefined && eventDateTime < now) {
        return i;
      }
    }
    return 0;
  };

  const latestAccessibleStep = getLatestAccessibleStep();

  return (
      <GenericStepper steps={steps} orientation="vertical" latestAccesibleStep={latestAccessibleStep} selectedDate={selectedDate} />
  );
};

export default ContainerEvents;
