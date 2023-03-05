// 좋아요, 게시글
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PaddingOutlined } from "@mui/icons-material";
const columns = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "content", headerName: "Content", flex: 2 },
];
const posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
];

export const SummaryActivityCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          boxShadow: "0px 3px 6px #00000029",
        }}
      >
        <Typography variant="h6" sx={{ padding: "20px" }}>
          게시물
        </Typography>
        <DataGrid rows={posts} columns={columns} autoHeight={true} />
      </Box>
      <Box sx={{ boxShadow: "0px 3px 6px #00000029" }}>
        <Typography variant="h6" sx={{ padding: "20px" }}>
          여행동행
        </Typography>
        <DataGrid rows={posts} columns={columns} autoHeight={true} />
      </Box>
      <Box sx={{ boxShadow: "0px 3px 6px #00000029" }}>
        <Typography variant="h6" sx={{ padding: "20px" }}>
          좋아요
        </Typography>
        <DataGrid rows={posts} columns={columns} autoHeight={true} />
      </Box>
    </Box>
  );
};
