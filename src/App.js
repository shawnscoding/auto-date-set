import React, { useState } from "react";
import DailyReport from "./component/dailyReport/DailyReport";
import WeeklyReport from "./component/weeklyReport/WeeklyReport";
import { Box, Grid, ButtonGroup, Button } from "@material-ui/core";
import Header from "./component/header/Header";

const App = () => {
  const [dailyPage, setDailyPage] = useState(true);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Box m={1}>
        <Header />
      </Box>
      <Box mb={3}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => setDailyPage(true)}>Daily Report</Button>
          <Button onClick={() => setDailyPage(false)}>Weekly Report</Button>
        </ButtonGroup>
      </Box>
      {dailyPage ? <DailyReport /> : <WeeklyReport />}
    </Grid>
  );
};

export default App;
