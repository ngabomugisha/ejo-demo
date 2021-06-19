import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import https from "../../../helpers/https";
import { useState } from "react";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

export const Review = ({ formData, navigation }) => {
  console.log("FORM DATA, ", formData);
  const { go } = navigation;
  const [alertMsg, setAlertMsg] = useState("");
  const {
    firstName,
    lastName,
    nickName,
    address,
    city,
    state,
    zip,
    phone,
    email,
  } = formData;
  // const onSubmit = async () => {
  //   await https
  //     .post("/lessonplan/", data, {
  //       headers: { Authorization: `Basic ${localStorage.token}` },
  //     })
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setAlertMsg("lesson paln submitted");
  //         setOpen(true);
  //       } else return alert("something went wrong");
  //     });
  // };

  return (
    <Container maxWidth="sm">
      {/* <h3>Review</h3>
      <RenderAccordion summary="Names" go={ go } details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },
        { 'Nick Name': nickName },
      ]} />
      <RenderAccordion summary="Address" go={ go } details={[
        { 'Address': address },
        { 'City': city },
        { 'State': state },
        { 'Zip': zip },
      ]} />
      <RenderAccordion summary="Contact" go={ go } details={[
        { 'Phone': phone },
        { 'Email': email },
      ]} /> */}

      <h3>Ready to submit </h3>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "1.5rem" }}
        onClick={() => go("submit")}
      >
        Submit
      </Button>
    </Container>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {summary}
    </AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
            <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
          );
        })}
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        >
          <EditIcon />
        </IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
);
