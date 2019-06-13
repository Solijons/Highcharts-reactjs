import React, { useState, useEffect } from 'react';
import highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { API_URL } from '../../config';

const HighChartMain = () => {
  const [week, setWeek] = useState([]);
  const [ok, setOk] = useState([]);
  const [warn, setWarn] = useState([]);
  const [trouble, setTrouble] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((results) => results.json())
      .then((data) => {
        const weekValue = [];
        const okValues = [];
        const warnValues = [];
        const troubleValue = [];

        data.forEach((value) => {
          weekValue.push(value.week);
          okValues.push(value.ok);
          warnValues.push(value.warn);
          troubleValue.push(value.trouble);
        });
        setWeek(weekValue);
        setOk(okValues);
        setWarn(warnValues);
        setTrouble(troubleValue);
      });
  }, []);


  return (
    <HighchartsReact
      highcharts={highcharts}
      options={{
        chart: {
          type: 'area',
        },
        title: {
          text: 'Dashboard Charts',
        },
        xAxis: {
          categories: week,
        },
        credits: {
          enabled: false,
        },
        series: [{
          name: 'Green',
          data: ok,
          color: 'lightgreen',
        }, {
          name: 'Yellow',
          data: warn,
          color: 'yellow',
        }, {
          name: 'Red',
          data: trouble,
          color: 'red',
        }],
      }}
    />
  );
};

export default HighChartMain;
