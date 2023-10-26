import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";


 interface Bus  {
    title: string;
    code: number;
    time: string;


  }

const SchoolRoute: React.FC = () => {
  const [busTime, setBusTime] = useState<string>("");
  const [busTime2, setBusTime2] = useState<string>("");
  const [publicCode, setPublicCode] = useState<number>(0);
  const [publicCode2, setPublicCode2] = useState<number>(0);



 

  const fetchData = () => {
    const query = `{
      trip(
        from: {
          place: "NSR:StopPlace:6735"
        },
        to: {
          place: "NSR:StopPlace:58366"
        },
        modes: {
          accessMode: foot
          egressMode: foot
          transportModes: [{
            transportMode: bus
            transportSubModes: [localBus]
          }]
        }
      ) {
        tripPatterns {
          duration
          walkDistance
          legs {
            expectedStartTime
            expectedEndTime
            transportSubmode
            mode
            distance
            line {
              id
              publicCode
            }
          }
        }
      }
    }`;

    fetchBusData(query, setBusTime);
  };

  const fetchBusData = (query: string, setData: React.Dispatch<React.SetStateAction<string>>) => {
    fetch('https://api.entur.io/journey-planner/v3/graphql', {
      method: 'POST',
      headers: {
        'ET-Client-Name': 'awesomecompany-awesomeapp',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((stopPlaceData) => {
        setPublicCode(parseInt(stopPlaceData.data.trip.tripPatterns[0].legs[0].line.publicCode));
        setPublicCode2(parseInt(stopPlaceData.data.trip.tripPatterns[0].legs[1].line.publicCode));

        const expectedStartTime = new Date(stopPlaceData.data.trip.tripPatterns[0].legs[0].expectedStartTime);
        const norwayTimeOptions = { timeZone: 'Europe/Oslo', hour12: false };
        const formattedTime = expectedStartTime.toLocaleTimeString('sv-SE', norwayTimeOptions);

        const expectedStartTime2 = new Date(stopPlaceData.data.trip.tripPatterns[0].legs[1].expectedStartTime);
        const norwayTimeOptions2 = { timeZone: 'Europe/Oslo', hour12: false };
        const formattedTime2 = expectedStartTime2.toLocaleTimeString('sv-SE', norwayTimeOptions2);

        setBusTime(formattedTime);
        setBusTime2(formattedTime2);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Section title="From Me to Oslo" code={publicCode} time={busTime} />
      <Section title="From Me to Oslo" code={publicCode2} time={busTime2} />
    </View>
  );
};

const Section = (bus: Bus) => {
  return (
    <View style={styles.section}>
      <View style={styles.titleViewBox}>
        <Text style={styles.destinationTitle}>{bus.title}</Text>
      </View>
      <View style={styles.busroute}>
        <Text style={styles.publicCode}>{bus.code}</Text>
        <Text style={styles.busTime}>Arriving: {bus.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  publicCode: {
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: 'red',
    padding: 10,
    textAlign: 'center',
  },
  busroute: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'cyan',
    margin: 10,
    borderRadius: 10,
  },
  busTime: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  destinationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  titleViewBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'cyan',
  },
});

export default SchoolRoute;
