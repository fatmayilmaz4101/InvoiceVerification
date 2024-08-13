"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { CompanyPriceListService } from "@/app/services/CompanyPriceListService";
import { CompanyPriceListType } from "@/types/service";

const CompanyPriceList = () => {
  const [companyPriceList, setCompanyPriceList] = useState<
    CompanyPriceListType[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CompanyPriceListService.getCompanyList().then((data) =>
      setCompanyPriceList(data)
    );
    setLoading(false);
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex ">
        <Button label="Import" raised />
        <Button style={{ marginLeft: 5 }} label="Add" raised />
      </div>
    );
  };
  const Columns = () => {
    return [
      <Column
        field="CompanyCode"
        header="Company Code"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,

      <Column
        field="CompanyName"
        header="Company Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="ArticleNo"
        header="Article No"
        filterField="country.name"
        style={{ minWidth: "12rem" }}
        key={3}
      />,
      <Column
        field="ArticleName"
        header="Article Name"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="UnitPrice"
        header="Unit Price"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,
      <Column
        field="Unit"
        header="Unit"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="Currency"
        header="Currency"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="Description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={6}
      />,
      <Column
        field="CreatedDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={5}
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
