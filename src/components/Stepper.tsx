import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/system';
import { useTheme } from '../hooks/useTheme';
import '../styles/Stepper.css'; // Ensure external CSS handles most styles

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
  latestAccessibleStep?: number;
  selectedDate?: Date | null;
}

// Custom Connector Style
const CustomConnector = styled(StepConnector)({
  '& .MuiStepConnector-line': {
    borderColor: '#00a76f', // Customize the connector line color
  },
});

// Custom StepLabel for the active state
const CustomStepLabel = styled(StepLabel)<{ active: boolean }>(({ active }) => ({
  color: 'white',  // Change text color based on active state
  fontWeight: active ? 'bold' : 'normal',
}));

const GenericStepper: React.FC<GenericStepperProps> = React.memo(({
  steps,
  orientation = 'vertical',
  latestAccessibleStep = 0,
  selectedDate
}) => {
  const [activeStep, setActiveStep] = useState(latestAccessibleStep);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Reset active step based on the selected date
    setActiveStep(latestAccessibleStep);
  }, [selectedDate, latestAccessibleStep]);

  const handleNext = () => {
    setActiveStep((prevStep: number) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep: number) => prevStep - 1);
  };

  return (
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
              sx={{
                '& .MuiStepLabel-label': activeStep >= index ? { color: isDarkMode ? 'white' : 'black', fontSize: '1rem' } : { color: isDarkMode ? '#ccc' : 'var(--secondary-color)' },
                '& .MuiStepIcon-text': activeStep >= index ? { fill: 'var(--light-color)' } : { fill: 'var(--dark-color)' }
              }}
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
                    className={`mui-stepper-back-button ${isDarkMode ? 'dark-mode' : ''}`}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep >= latestAccessibleStep && activeStep !== steps.length - 1}
                    className={`mui-stepper-next-button ${isDarkMode ? 'dark-mode' : ''}`}
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
  );
});

export default GenericStepper;
