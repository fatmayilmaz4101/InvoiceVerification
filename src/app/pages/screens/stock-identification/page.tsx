"use client";
import { Button } from "primereact/button";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { StockIdentificationService } from "@/app/services/StockIdentificationService";

const StockIdentification = () => {
  const [stockIdentification, setStockIdentification] = useState<
    Services.StockIdentification[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StockIdentificationService.getStockIdentification().then((data) =>
      setStockIdentification(data)
    );
    setLoading(false);
  }, []);

  // const formatDate = (value: Date) => {
  //   return value.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button label="İçeri aktar" raised />
      </div>
    );
  };
  const Columns = () => {
    return [
      <Column
        field="stok_kodu"
        header="Stok kodu"
        style={{ minWidth: "12rem" }}
        key={1}
      />,
      <Column
        field="stok_ismi"
        header="Stok ismi"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="birim"
        header="Birim"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="tarih"
        header="Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={4}
      />,
      <Column
        field="aciklama"
        header="Açıklama"
        style={{ minWidth: "14rem" }}
        key={5}
      />,
    ];
  };
  const header = renderHeader();

  return (
    <>
      <GenericDataTable
        value={stockIdentification}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
    </>
  );
};
export default StockIdentification;
