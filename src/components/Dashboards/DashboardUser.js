import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";
import Calendar from "../../components/SelectDate";
import SelectCarType from "../SelectCarType";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import useChart from "../../hooks/useChart";
import useAuth from "../../hooks/useAuth";
import { CapitalizeNames } from "../../utils/Capitalize";
import { Spinner } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import ChartsUser from "../Charts/ChartsUser";
import numeral from 'numeral';
import { ScrollView } from "react-native-gesture-handler";
import Filters from '../Filters';


const HomeUser = ({ navigation }) => {
  const { user } = useAuth();

  const {
    getSubstatusAgentChart,
    substatusAgentChart,
    getPieStatusChart,
    pieStatus,
    clearCharts,
    getTotalsDashboard,
    total,
    totalLeads,
    totalVisits,
    totalAppointments,
    totalSolds,
    loadingCharts,
    getLeadsMonthlyChart,
    leadsMonthlyChart,
  } = useChart();
  const [date, setDate] = useState(
    `&createdAt[gte]=${moment()
      .startOf("month")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`
  );
  const [carType, setCarType] = useState(false);
  const today = new Date();
  const curHr = today.getHours();
  const [filter, setFilter] = useState("month");
  const [custom, setCustom] = useState({
    date: `&createdAt[gte]=${moment()
      .startOf("year")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`,
    filter: "MMM",
  });
  const [query, setQuery] = useState(false);

  let greeting;


  if (curHr < 12) {
    greeting = "Buenos Dias";
  } else if (curHr < 18) {
    greeting = "Buenas Tardes";
  } else {
    greeting = "Buenas Noches";
  }

  useFocusEffect(
    React.useCallback(() => {
      if (user && user._id && query) {
        getTotalsDashboard(`${query}&agent=${user._id}`);
        getLeadsMonthlyChart(`${query}&agent=${user._id}`);
        getPieStatusChart(`${query}&agent=${user._id}`);
      }
    }, [query])
  );

  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Layout style={styles.subContainerText}>
          <Layout style={styles.subContainerLeft}>
          <Text
            category="label"
            style={{fontSize: 28, marginTop: 15 }}
          >{`${user && CapitalizeNames(user.name.split(' ')[0])}`}</Text>
          {loadingCharts ? (
            <Text category="p1" appearance="hint">{`. . .`}</Text>
          ) : (
            <Text
              category="p1"
              appearance="hint"
            >{`Tienes ${numeral(total).format(
              "0,0"
            )} leads acumulados`}</Text>
          )}
          </Layout>
          <Layout style={styles.subContainer}>
          <Filters filters={['date','carType','stores']} setQuery={setQuery}></Filters>
        </Layout>
        </Layout>
        <Divider />

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Leads
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="person-outline" size={25} color={"#673ab7"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalLeads).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Citas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="calendar-outline" size={25} color={"#33acee"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalAppointments).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Visitas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="home-outline" size={25} color={"#d81b60"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                  <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalVisits).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Ventas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="cash-outline" size={25} color={"#43a047"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                  <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalSolds).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      {/* ! error arriba */}

      <Layout style={styles.subContainerDivider}>
        {!leadsMonthlyChart || !pieStatus ? (
          <Layout style={styles.center}>
            <Spinner size="giant" />
          </Layout>
        ) : (
          <>
            <Divider />
            <ChartsUser leads={leadsMonthlyChart} status={pieStatus} />
          </>
        )}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 15,
  },
  container: {
    marginBottom: 20,
    flex: 1,
  },
  subContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems:'flex-start',
    // paddingRight:10,
    // backgroundColor:'blue',
    // width:'98%',
    // margin:'auto',
    marginTop:15
  },
  subContainerLeft: {
    flexDirection: "column",
    alignItems:'flex-start',
  },
  subContainerText: {
    display:'flex',
    flexDirection:'row',
    // backgroundColor:'yellow',
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 25,
    paddingBottom: 20,
  },
  subContainerDivider: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subContainerCards: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
  },
  card: {
    width: "50%",
    borderWidth: 1,
    flex: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    textAlignVertical: "center",
  },
});

export default HomeUser;
