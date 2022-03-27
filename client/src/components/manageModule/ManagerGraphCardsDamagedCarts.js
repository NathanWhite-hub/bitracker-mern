import { Fragment, useCallback } from "react";
import moment from "moment";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useCurrentPng } from "recharts-to-png";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";

const COLORS = ["#3eda77", "#ec5738"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ManagerGraphCardsDamagedCarts({
  data,
  currentDate,
  cartByTypeOfDamage,
}) {
  let navigate = useNavigate();

  const [getPng, { ref }] = useCurrentPng();

  const handleGenerateReport = useCallback(
    async (data, currentDate, cartByTypeOfDamage) => {
      const png = await getPng();
      // Verify that png is not undefined
      if (png) {
        navigate("report_cart_pdf", {
          state: {
            cartData: data,
            today: currentDate,
            typeOfDamage: cartByTypeOfDamage,
            cartDamagedPieGraph: png,
          },
          replace: true,
        });
      }
    },
    [getPng]
  );

  return (
    <Box sx={{ maxWidth: 450 }}>
      <Card variant="outlined">
        <Fragment>
          <CardContent justifyContent="center">
            <Typography sx={{ fontSize: 14 }}>
              Damage Statistics for {moment(currentDate).format("MMMM")}{" "}
              {moment(currentDate).format("YYYY")}{" "}
            </Typography>
            <PieChart width={400} height={400} ref={ref}>
              <Legend verticalAlign="top" height={2} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <Typography sx={{ fontSize: 20 }}>
              Carts Not Damaged: {data[0].value}
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              Carts Damaged: {data[1].value}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleGenerateReport(data, currentDate, cartByTypeOfDamage);
              }}
              startIcon={<ArticleIcon />}
            >
              Generate Monthly Report
            </Button>
          </CardContent>
        </Fragment>
      </Card>
    </Box>
  );
}

export default ManagerGraphCardsDamagedCarts;
