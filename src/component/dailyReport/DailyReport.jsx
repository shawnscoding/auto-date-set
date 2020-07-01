import React, { useState } from "react";
import Input from "../input/Input";
import format from "date-fns/format";
import { addDays, isWeekend } from "date-fns";
import { Typography, Grid } from "@material-ui/core";

const checkIsWeekend = (tommorow) => {
  let nextDate = isWeekend(tommorow)
    ? format(addDays(new Date(), 3), "Mdd")
    : format(tommorow, "Mdd");

  return nextDate;
};

const handleFormatError = (arr, i) => {
  if (arr[i] === " " || isNaN(Number(arr[i])) === true) {
    return;
  }

  if (arr[i + 3] === " " || isNaN(Number(arr[i + 3])) === true) {
    return;
  }

  if (arr[i + 4] === " " || isNaN(Number(arr[i + 4])) === true) {
    return;
  }
  return true;
};

const DailyReport = () => {
  const [input, setInput] = useState("");

  const handlePaste = (e) => {
    const date = format(new Date(), "Mdd");

    const tommorow = addDays(new Date(), 1);
    const nextDate = checkIsWeekend(tommorow);

    const value = e.target.value;
    let first;
    let second;
    const arr = value.split("");
    for (let i = 0; i < value.length; i++) {
      if (isNaN(Number(arr[i])) !== true && Number(arr[i]) !== 0) {
        // check isNumber and not zero and space
        if (arr[i + 1] === "월") {
          // check if there is 월 after it
          if (first === undefined) {
            // first data represent next day
            const res = handleFormatError(arr, i);
            if (res === undefined) {
              alert("format error, please follow the format rule");

              return;
            }
            arr[i] = nextDate.charAt(0);
            arr[i + 3] = nextDate.charAt(1);
            arr[i + 4] = nextDate.charAt(2);
            first = "done";
          } else if (first === "done" && second === undefined) {
            // second data represent today
            const res = handleFormatError(arr, i);
            if (res === undefined) {
              alert("format error, please follow the format rule");

              return;
            }
            arr[i] = date.charAt(0);
            arr[i + 3] = date.charAt(1);
            arr[i + 4] = date.charAt(2);
            second = "done";
          } else if (first === "done" && second === "done") {
            // third data represent next day
            const res = handleFormatError(arr, i);
            if (res === undefined) {
              alert("format error, please follow the format rule");

              return;
            }
            arr[i] = nextDate.charAt(0);
            arr[i + 3] = nextDate.charAt(1);
            arr[i + 4] = nextDate.charAt(2);
            second = "done";
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
        placeholder="daily report... copy and paste here"
        input={input}
        handlePaste={handlePaste}
      />
      <Grid>
        <Typography gutterBottom variant="h6">
          Please follow this date format - > 6월 19일
        </Typography>
        <Typography gutterBottom variant="h6">
          Only one space is allowed after the word '월'
        </Typography>
        <Typography gutterBottom variant="h6">
          Do not put more than three formats
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default DailyReport;
