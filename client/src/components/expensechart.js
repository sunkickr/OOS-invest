import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell,  } from "recharts";
import { MainContext } from "../context/MainContext";

const COLORS = ['blue', 'green', 'violet', 'orange', 'teal', 'red', 'purple']

export default ({data}) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        labelLine={false}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          console.log("handling label?");
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor="middle"
              dominantBaseline="central"
            >
            </text>
          );
        }}
      >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
    </PieChart>
  </ResponsiveContainer>
);
