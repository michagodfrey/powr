import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Routine from "../components/Routine";
import CreatRoutine from "../components/CreateRoutine";
import { Tab, Tabs, Box, Container } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const WorkoutRoutines = ({ user }) => {
    const [allRoutines, setAllRoutines] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        const getRoutines = async () => {
            try {
                const docRef = doc(db, "users", `${user.uid}`);
                const docSnap = await getDoc(docRef);
                setAllRoutines(docSnap.data().routines);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoutines();
    }, [user]);

    return (
      <div className="min-h-[calc(100vh-192px)]">
        <Container component="main" maxWidth="xl">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                {Object.entries(allRoutines).map(([routineName], index) => (
                  <Tab key={routineName} label={routineName} index={index} />
                ))}
                <Tab label="Create New Routine" />
              </Tabs>
            </Box>
            {Object.entries(allRoutines).map(
              ([routineName, routineExercises], index) => {
                return (
                  <TabPanel key={routineName} value={value} index={index}>
                    <Routine
                      routine={routineName}
                      exercises={routineExercises}
                      user={user}
                    />
                  </TabPanel>
                );
              }
            )}
            <TabPanel value={value} index={Object.entries(allRoutines).length}>
              <CreatRoutine user={user} allRoutines={allRoutines} />
            </TabPanel>
          </Box>
        </Container>
      </div>
    );
}

export default WorkoutRoutines
