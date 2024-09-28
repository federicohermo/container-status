import React from 'react';
import Card from './Card';
import '../styles/ContainerInfo.css'; // Additional styling if needed
import ContainerEvents from './ContainerEvents';
import { useTheme } from '../hooks/useTheme';

const LazyMap = React.lazy(() => import('./ContainerMap'));

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
      position: [event.location.latitude, event.location.longitude],
      facility: event.facility ? (event.facility.name !== null ? event.facility.name : 'null') : 'null'
    });
    
    // If this event is marked as actual, set the location as actual
    if (event.actual) {
      acc[locationName].actual = true;
    }

    return acc;
  }, {});
};

interface ContainerInfoProps {
  containerData: any;
  filteredCard: any,
  selectedDate?: Date | null
}

const ContainerInfo: React.FC<ContainerInfoProps> = ({ containerData, filteredCard, selectedDate }) => {  
  const { isDarkMode } = useTheme()

  return (
    <div className={`container-info ${isDarkMode ? 'dark-mode' : ''}`} style={filteredCard.length < 4 ? (filteredCard > 1 ? {gridTemplateAreas: "inherit"}: {gridTemplateAreas: "inherit", gridTemplateColumns: '1fr 1fr'}) : {}}>
      {filteredCard && filteredCard.map((card:any) => {
        if (card.title.includes("Details") ) {
          // Card for Container Details 
          return(
            <Card key={card.id} title={card.title.replace("Details", "")} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
              <p><strong>Country:</strong> {containerData[card.gridArea+"_location"].country}</p>
              <p><strong>City:</strong> {containerData[card.gridArea+"_location"].name}</p>
              <p><strong>State:</strong> {containerData[card.gridArea+"_location"].state}</p>
            </Card>
          )
        }
        else if (card.title.includes("Info")) {
          // Card for Container Information 
          return(
            <Card key={card.id} title={card.title.replace("Container ", "")} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
              <p><strong>Container Shipment Number:</strong> {containerData.shipment_number}</p>
              <p><strong>Status:</strong> 
              {containerData.status.split("_").map((str: string) => {
                  return " " + str[0] + str.slice(1).toLowerCase() 
              })}</p>
              <p><strong>Importer:</strong> {containerData.importer}</p>
              <p><strong>Invoice Amount:</strong> ${containerData.invoice_amount}</p>
              <p><strong>Estimated Arrival:</strong> {new Date(containerData.eta).toLocaleString()}</p>
            </Card>
          )
        }
        else if (card.title.includes("Event")) {
          // Card for Container Events
          return containerData.containers.map((event:any) => 
            <Card key={card.id} title={"Shipment Status"} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
              <ContainerEvents containerEvent={groupEventsByLocation(event.events)} selectedDate={selectedDate} />
            </Card>
          )
        }
        else if (card.title.includes("Route")) {
          // Card for Map 
          return(
          <Card key={card.id} title={"My Container's Route"} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
            <div>

            <LazyMap 
              route={containerData.route_data.route}
              facilities={groupEventsByLocation(containerData.containers[0].events)}
              selectedDate={selectedDate}
            />
            </div>
          </Card>)
        } 
        else {
          return null
        }
      })}
    </div>
  );
};

export default ContainerInfo;
