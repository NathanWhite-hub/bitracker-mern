import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import { useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { getUserName } from "../../api/dashboardRoutes";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  headerText: {
    fontSize: 24,
    marginRight: 20,
    padding: 1,
    justifyContent: "flex-end",
  },
  generatedByText: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  body: {
    fontSize: 16,
    margin: 10,
    paddingTop: 35,
    paddingBottom: 25,
  },
  breakDownText: {
    fontSize: 14,
    margin: 10,
  },
  footNote: {
    fontSize: 12,
    marginLeft: 50,
    paddingBottom: 20,
  },
  logo: {
    width: "30%",
    height: "auto",
    padding: "5",
    justifyContent: "flex-start",
  },
  graph: {
    width: "60%",
    height: "auto",
    padding: "5",
    justifyContent: "flex-start",
  },
});

function PDFCartReport() {
  let location = useLocation();

  const [textData] = useState({
    totalCartsRounded:
      location.state.cartData[0].value + location.state.cartData[1].value,
    numOfCartsDamaged: location.state.cartData[0].value,
    numOfCartsNotDamaged: location.state.cartData[1].value,
    numOfPowerCordDamaged: location.state.typeOfDamage[0].powerCordDamaged,
    numOfFuseBlown: location.state.typeOfDamage[0].fuseBlown,
    numOfInverterBad: location.state.typeOfDamage[0].inverterBad,
    numOfPhysicalDamage: location.state.typeOfDamage[0].physicalDamage,
    numOfInterfaceMembraneBad:
      location.state.typeOfDamage[0].interfaceMembraneDamaged,

    monthOf: moment(location.state.today).format("MMMM YYYY"),
    quarterOf: moment(location.state.today).format("Q"),
    dayGenerated: moment(location.state.today).format("MMMM Do, YYYY"),
  });

  console.log(location.state.typeOfDamage[0]);

  const [userGeneratingReport, setUserGeneratingReport] = useState();

  useEffect(() => {
    getUserName()
      .then((response) => {
        setUserGeneratingReport(
          response.data.firstName + " " + response.data.lastName
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid container justifyContent="center">
      <PDFViewer width={600} height={800} showToolbar={true}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={{ flexDirection: "row", flexWrap: "no-wrap" }}>
              <Image
                src="../../../assets/bitrackerLogo.png"
                fixed
                style={styles.logo}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.headerText}>WOW Cart Program</Text>
                <Text style={styles.headerText}>
                  <strong>{textData.monthOf} Report</strong>
                </Text>
                <Text style={styles.headerText}>
                  <strong>Quarter {textData.quarterOf}</strong>
                </Text>
              </View>
            </View>
            <Text style={styles.body}>
              During {textData.monthOf}, {textData.totalCartsRounded} WOW carts
              were rounded across the HOSPITAL NAME HERE. Technicians found{" "}
              {textData.numOfCartsDamaged} to have damage of varying degree and{" "}
              {textData.numOfCartsNotDamaged} to have no damage.
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Image
                style={styles.graph}
                src={location.state.cartDamagedPieGraph}
              />
              <Text style={[styles.footNote, { textAlign: "flex-start" }]}>
                Pie Chart of Carts found damaged vs. not
              </Text>
            </View>
            <Text style={styles.breakDownText}>
              Out of the {textData.numOfCartsDamaged} damaged WOW carts:
            </Text>
            <Text style={styles.breakDownText}>
              {textData.numOfPowerCordDamaged} were found to have damaged power
              cords
            </Text>
            <Text style={styles.breakDownText}>
              {textData.numOfFuseBlown} were found to have fuses blown.
            </Text>
            <Text style={styles.breakDownText}>
              {textData.numOfInverterBad} were found to have bad inverters.
            </Text>
            <Text style={styles.breakDownText}>
              {textData.numOfInterfaceMembraneBad} were found to have damaged
              Interface Membranes.
            </Text>
            <Text style={styles.breakDownText}>
              {textData.numOfPhysicalDamage} were found to some sort of physical
              damage.
            </Text>
            <Text style={styles.generatedByText}>
              This report was generated by {userGeneratingReport} on{" "}
              {textData.dayGenerated}.
            </Text>
          </Page>
        </Document>
      </PDFViewer>
    </Grid>
  );
}

export default PDFCartReport;
