"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { CompanyPriceListService } from "@/app/services/CompanyPriceListService";

const CompanyPriceList = () => {
  const [companyPriceList, setCompanyPriceList] = useState<
    Services.CompanyPriceList[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CompanyPriceListService.getCompanyDefinition().then((data) =>
      setCompanyPriceList(data)
    );
    setLoading(false);
  }, []);

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
        field="firma_cari_kodu"
        header="Firma Cari Kodu"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,

      <Column
        field="firma_cari_adi"
        header="Firma Cari Adı"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="stok_kodu"
        header="Stok Kodu"
        filterField="country.name"
        style={{ minWidth: "12rem" }}
        key={3}
      />,
      <Column
        field="stok_ismi"
        header="Stok İsmi"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="birim_fiyat"
        header="Birim Fiyat"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,

      <Column
        field="birim"
        header="Birim"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="doviz_cinsi"
        header="Döviz Cinsi"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="tarih"
        header="Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={5}
      />,
      <Column
        field="aciklama"
        header="Açıklama"
        style={{ minWidth: "14rem" }}
        key={6}
      />,
    ];
  };
  const header = renderHeader();
  return (
    <>
      <GenericDataTable
        value={companyPriceList}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
    </>
  );
};

export default CompanyPriceList;
