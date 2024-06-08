import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import Select from "@mui/material/Select";
import { IoMdDownload } from "react-icons/io";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);
  const [dateRange, setDateRange] = useState("allData");
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const adminId = localStorage.getItem("adminId");
        const email = localStorage.getItem("email");

        const res = await axios.get("http://localhost:8000/listUserData", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": token,
          },
          params: {
            adminId: adminId,
            isAllOrders: true,
            email: email,
            isAdmin: true,
          },
        });
        console.log(res.data.data);
        setCol([
          { field: "id", headerName: "ID" },
          { field: "name", headerName: "Name", flex: 0.5 },
          { field: "email", headerName: "Email", flex: 1 },
          { field: "email", headerName: "Email", width: "100%" },
          { field: "email", headerName: "Email", flex: 1 },
          { field: "email", headerName: "Email", flex: 1 },
          { field: "email", headerName: "Email", flex: 1 },
      
          { field: "phone", headerName: "Phone Number", flex: 0.5 },
          { field: "createdAt", headerName: "Date", flex: 0.5 },
        ]);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
        toast.error("Error fetching data. Redirecting to login page.");
        history("/login");
        setLoading(false);
      }
    };
    fetchData();
  }, [history]);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = col.map((column) => column.headerName);
    csvData.push(headers);

    newData.forEach((item) => {
      const row = col.map((column) => item[column.field]);
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Nuform_All_User.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleChangeDateRange = async (event) => {
    const selectedValue = event.target.value;

    setLoading(true);
    setDateRange(selectedValue);
    const token = localStorage.getItem("token");

    let res = await axios.get(
      `https://saboo-ezone-backend.onrender.com/filterData`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: selectedValue,
        },
      }
    );

    setCol([
      { field: "id", headerName: "ID" },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      {
        field: "model",
        headerName: "Model",
        flex: 1,
        renderCell: (params) => {
          return (
            <div className="flex items-center">
              <span
                className={`${
                  params.row.model === "Switch eLCV" && "text-[#505bfe]"
                }`}
              >
                {params.row.model}
              </span>
            </div>
          );
        },
      },
      { field: "date", headerName: "Date" },
      { field: "time", headerName: "Time" },
    ]);
    setData(res.data.data);
    setLoading(false);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="flex justify-between">
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </div>
        <div className="">
          <IconButton
            color="primary"
            onClick={handleDownloadCSV}
            sx={{
              marginRight: "6px",
              backgroundColor: "white",
              fontSize: "14px",
              minWidth: "auto",
              height: "25px",
              color: "#000000",
              "&:hover": {
                color: "#dc2625",
              },
            }}
          >
            <IoMdDownload className="mr-2" /> Download
          </IconButton>
          <Select
            native
            value={dateRange}
            onChange={handleChangeDateRange}
            className="h-10 p-1  rounded-full bg-[#02c6b7] text-white border-none foucs:outline-none"
          >
            <option value="allData">All Data</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="last12Months">Last 12 Months</option>
          </Select>
        </div>
      </GridToolbarContainer>
    );
  };

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="List of all users" />
      <Box
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            minWidth: "800px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "200px",
          },
          "& .MuiDataGrid-cell:hover": {
            overflow: "visible",
            whiteSpace: "normal",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full gap-4 text-xl ">
            <ImSpinner2 className="text-2xl animate-spin " />
            Wait fetching the data from backend.{" "}
          </div>
        ) : error ? (
          "Error ~ Something went wrong :)"
        ) : (
          <DataGrid
            rows={newData}
            columns={col}
            slots={{ toolbar: CustomToolbar }}
            sx={{
              backgroundColor: "white",
              fontSize: 15,
            }}
            autoHeight
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
