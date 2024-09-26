import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/system';
import { StyledEngineProvider } from '@mui/material/styles';
import { useTheme } from '../hooks/useTheme'
import '../styles/Stepper.css'

interface LocationEvents {
  location: string;
  events: {
    description: string;
    eventDate: string;
    eventTime: string;
  }[];
}

interface GenericStepperProps {
  steps: LocationEvents[];
  orientation?: 'horizontal' | 'vertical';
  latestAccessibleStep?: any;
  selectedDate?: Date | null;
}

const CustomConnector = styled(StepConnector)({
  '& .MuiStepConnector-line': {
    borderColor: '#00a76f', // Customize the connector line color
  },
});

const CustomStepLabel = styled(StepLabel)<{ active: boolean }>(({ active }) => ({
  color: 'white',  // Change text color based on active state
  fontWeight: active ? 'bold' : 'normal',  // Optional: Bold text for active step
}));

const GenericStepper: React.FC<GenericStepperProps> = ({
  steps,
  orientation = 'vertical',
  latestAccessibleStep,
  selectedDate
}) => {
  const [activeStep, setActiveStep] = useState(latestAccessibleStep);
  const {isDarkMode} = useTheme()

  useEffect(() => {
    // Reset the active step based on the selected date
    setActiveStep(latestAccessibleStep);
    console.log(latestAccessibleStep)
  }, [selectedDate, latestAccessibleStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep:any) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep:any) => prevActiveStep - 1);
  };

  return (
    <StyledEngineProvider injectFirst>
    <div>
      <Stepper
        activeStep={activeStep}
        orientation={orientation}
        connector={<CustomConnector />}
        className="mui-stepper"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <CustomStepLabel
              active={activeStep >= index}
              StepIconProps={{
                sx: {
                  color: activeStep >= index ? '#00a76f' : '#ccc', // Active step icon color
                },
              }}
              sx={{'& .MuiStepLabel-label': activeStep >= index ? (isDarkMode ? {color:'white', fontSize: '1rem'} : {color:'black', fontSize: '1rem'}) : (isDarkMode ? {color:'#ccc'}: {color:'var(--secondary-color)'}),
                  '& .MuiStepIcon-text': activeStep >= index ? {fill: 'var(--light-color)'}:  {fill: 'var(--dark-color)'}}}
            >
              {step.location}
            </CustomStepLabel>
            {orientation === 'vertical' && (
              <StepContent>
                <ul className="step-description">
                  {step.events.map((event, idx) => (
                    <li key={idx}>
                      <strong>{event.description}</strong> - {event.eventDate} at {event.eventTime}
                    </li>
                  ))}
                </ul>
                <div className="step-buttons">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: '#e0e0e0',
                      color: '#333',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      '&:hover': {
                        backgroundColor: '#ccc',
                      },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep >= latestAccessibleStep && activeStep !== steps.length - 1 }
                    sx={{
                      mt: 1,
                      backgroundColor: isDarkMode ? 'var(--secondary-color)' : 'var(--dark-color)',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      '&:hover': {
                        backgroundColor: 'var(--primary-color-hover)',
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                </div>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
    </div>
    </StyledEngineProvider>
  );
};

export default GenericStepper;
