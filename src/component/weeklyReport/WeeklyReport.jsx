import React, { useState } from "react";
import Input from "../input/Input";
import format from "date-fns/format";
import { addDays, addWeeks, startOfWeek, subDays, endOfWeek } from "date-fns";
import { Grid, Typography } from "@material-ui/core";

const getMondayToFriday = (data) => {
  const start = startOfWeek(data);
  const end = endOfWeek(data);

  const monday = format(addDays(start, 1), "MMdd").split("");
  const friday = format(subDays(end, 1), "MMdd").split("");
  monday.splice(2, 0, ".");
  friday.splice(2, 0, ".");
  return { monday, friday };
};

const handleFormatError = (arr, i) => {
  if (arr[i - 4] === " " || isNaN(Number(arr[i - 4])) === true) {
    return;
  }

  if (arr[i - 3] === " " || isNaN(Number(arr[i - 3])) === true) {
    return;
  }

  if (arr[i - 1] === " " || isNaN(Number(arr[i - 1])) === true) {
    return;
  }

  if (arr[i] === " " || isNaN(Number(arr[i])) === true) {
    return;
  }

  if (arr[i + 4] === " " || isNaN(Number(arr[i + 4])) === true) {
    return;
  }

  if (arr[i + 5] === " " || isNaN(Number(arr[i + 5])) === true) {
    return;
  }

  if (arr[i + 7] === " " || isNaN(Number(arr[i + 7])) === true) {
    return;
  }
  if (arr[i + 8] === " " || isNaN(Number(arr[i + 8])) === true) {
    return;
  }
  return true;
};

const WeeklyReport = () => {
  const [input, setInput] = useState("");

  const handlePaste = (e) => {
    const thisWeek = getMondayToFriday(new Date());
    const thisMonday = thisWeek.monday;
    const thisFriday = thisWeek.friday;

    const nextWeek = getMondayToFriday(addWeeks(new Date(), 1));
    const nextMonday = nextWeek.monday;
    const nextFriday = nextWeek.friday;

    const value = e.target.value;
    let isThisWeek = true;
    const arr = value.split("");
    for (let i = 0; i < value.length; i++) {
      if (isNaN(Number(arr[i])) !== true && Number(arr[i]) !== 0) {
        if (arr[i + 2] === "~") {
          if (isThisWeek) {
            const res = handleFormatError(arr, i);
            if (res === undefined) {
              alert("format error, please follow the format rule below");

              return;
            }
            arr[i - 4] = thisMonday[0];
            arr[i - 3] = thisMonday[1];
            arr[i - 2] = thisMonday[2];
            arr[i - 1] = thisMonday[3];
            arr[i] = thisMonday[4];

            arr[i + 4] = thisFriday[0];
            arr[i + 5] = thisFriday[1];
            arr[i + 6] = thisFriday[2];
            arr[i + 7] = thisFriday[3];
            arr[i + 8] = thisFriday[4];
            isThisWeek = false;
          } else {
            const res = handleFormatError(arr, i);
            if (res === undefined) {
              alert("format error, please follow the format rule below");
              return;
            }
            arr[i - 4] = nextMonday[0];
            arr[i - 3] = nextMonday[1];
            arr[i - 2] = nextMonday[2];
            arr[i - 1] = nextMonday[3];
            arr[i] = nextMonday[4];

            arr[i + 4] = nextFriday[0];
            arr[i + 5] = nextFriday[1];
            arr[i + 6] = nextFriday[2];
            arr[i + 7] = nextFriday[3];
            arr[i + 8] = nextFriday[4];
          }
        }
      }
    }
    const res = arr.join("");

    setInput(res);
  };
  return (
    <React.Fragment>
      <Input
        placeholder="weekly report... copy and paste here"
        input={input}
        handlePaste={handlePaste}
      />
      <Grid>
        <Typography gutterBottom variant="h6">
          Please follow this date format -> 06.01 ~ 06.05
        </Typography>
        <Typography gutterBottom variant="h6">
          Only one space is allowed on both sides of ' ~ ' mark
        </Typography>
        <Typography gutterBottom variant="h6">
          Do not put more than two formats
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default WeeklyReport;
