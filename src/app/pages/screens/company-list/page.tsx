"use client";
import { Button } from "primereact/button";
import { useEffect, useMemo, useRef, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import PopUp from "../../components/pop-up/page";
import { useForm } from "react-hook-form";
import { postCompanyList } from "@/app/services/CompanyListService";
import { InvoiceCurrencyOptions } from "@/app/enums/InvoiceCurrencyEnum";
import { CompanyListType } from "@/types/service";
import { UseCompanyList } from "@/app/hooks/UseCompanyLists";
import { DataTablePageEvent } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { FormField } from "../../components/form-field/page";
import { formatDate } from "../company-price-list/page";

const CompanyList = () => {
  const toast = useRef<Toast>(null);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { data, isLoading, refetch } = UseCompanyList(page);
  const CompanyLists = useMemo(() => {
    return data?.companyLists || [];
  }, [data]);
  const TotalCount = data?.totalCount || 0;

  const { control, handleSubmit } = useForm<CompanyListType>();

  const onPage = (event: DataTablePageEvent) => {
    const currentPage = event.page !== undefined ? event.page + 1 : 1;
    setPage(currentPage);
    refetch();
  };

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Company added successfully",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "There was a problem adding the company",
      life: 3000,
    });
  };

  useEffect(() => {
    refetch();
  }, [page, CompanyLists, refetch]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button onClick={togglePopup} label="Add" raised />
      </div>
    );
  };
  const header = renderHeader();

  const onSubmit = async (data: CompanyListType) => {
    const newData = {
      ...data,
      createdDate: new Date(),
    };
    try {
      await postCompanyList(newData);
      refetch();
      showSuccess();
      setShowPopup(false);
    } catch (error) {
      showError();
    }
  };
  const Columns = () => {
    return [
      <Column
        field="companyCode"
        header="Company Code"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,
      <Column
        field="companyName"
        header="Company Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="paymentTerm"
        header="Payment Term"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="invoiceCurrency"
        header="Invoice Currency"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="createdDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        body={(rowData) => formatDate(rowData.createdDate)}
        key={4}
      />,
      <Column
        field="description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={5}
      />,
    ];
  };

  return (
    <>
      <Toast ref={toast} />

      <GenericDataTable
        value={CompanyLists}
        header={header}
        onPage={onPage}
        totalRecords={TotalCount}
        loading={isLoading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Add Company</h2>
        <div className="p-fluid formgrid grid gap-4">
          <FormField
            type="text"
            control={control}
            required="Company Code field is required"
            name="companyCode"
            label="Company Code"
          />
          <FormField
            type="text"
            control={control}
            required="Company Name field is required"
            name="companyName"
            label="Company Name"
          />
          <FormField
            type="number"
            control={control}
            required="Payment Term field is required"
            name="paymentTerm"
            label="Payment Term"
          />
          <FormField
            type="dropdown"
            control={control}
            required="Invoice Currency field is required"
            options={InvoiceCurrencyOptions}
            name="invoiceCurrency"
            label="Invoice Currency"
          />
          <FormField
            type="text"
            control={control}
            name="description"
            label="Description"
          />
          <div className="flex justify-center items-center">
            <Button onClick={handleSubmit(onSubmit)}>Add</Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};
export default CompanyList;
