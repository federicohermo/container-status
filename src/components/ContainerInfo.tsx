import React from 'react';
import Card from './Card';
import ContainerMap from './ContainerMap';
import '../styles/ContainerInfo.css'; // Additional styling if needed
import ContainerEvents from './ContainerEvents';
import { useTheme } from '../hooks/useTheme';

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
            <Card key={card.id} title={card.title} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
              <p><strong>Country:</strong> {containerData[card.gridArea+"_location"].country}</p>
              <p><strong>City:</strong> {containerData[card.gridArea+"_location"].name}</p>
              <p><strong>State:</strong> {containerData[card.gridArea+"_location"].state}</p>
            </Card>
          )
        }
        else if (card.title.includes("Info")) {
          // Card for Container Information 
          return(
            <Card key={card.id} title={card.title} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
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
            <Card key={card.id} title={card.title} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
              <ContainerEvents containerEvent={event.events} selectedDate={selectedDate} />
            </Card>
          )
        }
        else if (card.title.includes("Route")) {
          // Card for Map 
          return(
          <Card key={card.id} title={card.title} gridArea={filteredCard.length < 4 ? null : card.gridArea}>
            <ContainerMap 
              route={containerData.route_data.route}
              firstCoordinateFacility={containerData.containers[0].events[0].facility.name} // This should come from route probably but I could only extract it from events
              lastCoordinateFacility={containerData.containers[0].events[containerData.containers[0].events.length -1].facility.name} // Same here
            />
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
