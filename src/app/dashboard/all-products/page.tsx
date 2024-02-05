"use client";
import React, { useEffect } from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/thunks/productThunk";

const page = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log("products", products);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center gap-12 w-full pt-28 pb-16 px-16">
        <Box sx={{ height: 800, width: "100%" }}>
          <DataGrid
            className="dark:bg-slate-800 dark:text-white border-none"
            rows={products}
            columns={columns}
            classes={{
              columnHeader: "dark:text-white",
              footerContainer: "dark:text-white",
              pinnedRows: "dark:text-white",
              panelFooter: "dark:text-white",
              row: "dark:text-white",
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </DashboardLayout>
  );
};

export default page;

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    renderCell: (params: any) => (
      <img
        src={params.row.images[0] as string}
        alt={`Image ${params.row.id}`}
        style={{ width: 45, height: 45, borderRadius: "50%" }}
      />
    ),
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    renderCell(params) {
      return (
        <strong>
          ${params.row.rangePrice.minPrice}{" "}
          {params.row.rangePrice.maxPrice &&
            ` - $${params.row.rangePrice.maxPrice}`}
        </strong>
      );
    },
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    renderCell(params) {
      return <strong>{params.row.categories[0].name}...</strong>;
    },
    width: 110,
    editable: true,
  },
];

// const rows = [
//   {
//     id: 1,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Snow",
//     firstName: "Jon",
//     age: 14,
//   },
//   {
//     id: 2,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Lannister",
//     firstName: "Cersei",
//     age: 31,
//   },
//   {
//     id: 3,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Lannister",
//     firstName: "Jaime",
//     age: 31,
//   },
//   {
//     id: 4,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Stark",
//     firstName: "Arya",
//     age: 11,
//   },
//   {
//     id: 5,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Targaryen",
//     firstName: "Daenerys",
//     age: null,
//   },
//   {
//     id: 6,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Melisandre",
//     firstName: null,
//     age: 150,
//   },
//   {
//     id: 7,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Clifford",
//     firstName: "Ferrara",
//     age: 44,
//   },
//   {
//     id: 8,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Frances",
//     firstName: "Rossini",
//     age: 36,
//   },
//   {
//     id: 9,
//     image: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
//     name: "Roxie",
//     firstName: "Harvey",
//     age: 65,
//   },
// ];
