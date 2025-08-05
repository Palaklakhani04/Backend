import React, { useEffect, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import BookTable from "../components/BookTable";
import { Snackbar } from "@mui/material";
import axios from "axios";

const HomePage = () => {
  const [renderData, setRenderData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await axios.get("http://localhost:3000/books");
      setRenderData(data);
    };
    fetchApi();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ActionButtons setRenderData={setRenderData} setOpen={setOpen} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Data Not Found"
      />
      <BookTable tableDataJson={renderData} />
    </div>
  );
};

export default HomePage;
