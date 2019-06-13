import React, { useState, useEffect } from 'react';
import highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { API_URL } from '../../config';

const HighChartMain = () => {
  const [state, setStateFunc] = useState([]);


  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((results) => results.json())
      .then((data) => {
        const statesValue = [];
      
        data.forEach((value) => {
          statesValue.push(value.Object);
        });
        setStateFunc(statesValue);
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
          categories: state,
        },
        credits: {
          enabled: false,
        },
        series: [{
          name: 'Green',
          data: state,
          color: 'lightgreen',
        }, {
          name: 'Yellow',
          data: state,
          color: 'yellow',
        }, {
          name: 'Red',
          data: state,
          color: 'red',
        }],
      }}
    />
  );
};

export default HighChartMain;
