"use client";

import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export default function ReviewChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <PieChart width={241} height={241}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        innerRadius={85}
        outerRadius={110}
        paddingAngle={3}
      >
        {data.map((entry) => (
          <Cell
            key={entry.name}
            fill={entry.color}
            stroke={entry.color}
            style={{ outline: "none" }}
          />
        ))}
      </Pie>
      <Legend
        verticalAlign="middle"
        layout="vertical"
        iconSize={15}
        iconType="circle"
      />
      <Tooltip
        formatter={(v) => `${v}%`}
        contentStyle={{
          backgroundColor: "#0C141D", // primary-925
          borderRadius: "10px",
          border: "1px solid #1F2937", // primary-850
          padding: "10px",
        }}
        itemStyle={{
          fontWeight: "bolder",
          color: "#f7fbfb", // accent-50
        }}
      />
    </PieChart>
  );
}
