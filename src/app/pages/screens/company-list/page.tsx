"use client";
import { Button } from "primereact/button";
import { useEffect, useMemo, useRef, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import PopUp from "../../components/pop-up/page";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Controller, useForm } from "react-hook-form";
import { postCompanyList } from "@/app/services/CompanyListService";
import { Dropdown } from "primereact/dropdown";
import { InvoiceCurrencyOptions } from "@/app/enums/InvoiceCurrencyEnum";
import { CompanyListType } from "@/types/service";
import { InputNumber } from "primereact/inputnumber";
import { UseCompanyList } from "@/app/hooks/UseCompanyLists";
import { DataTablePageEvent } from "primereact/datatable";
import { Toast } from "primereact/toast";

const CompanyList = () => {
  const toast = useRef<Toast>(null);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { data, isLoading, refetch } = UseCompanyList(page);
  const CompanyLists = useMemo(() => {
    return data?.companyLists || [];
  }, [data]);
  const TotalCount = data?.totalCount || 0;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyCode: "",
      companyName: "",
      paymentTerm: 0,
      invoiceCurrency: "",
      description: "",
    },
  });

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
    console.log("useeefc", CompanyLists);
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
        field="description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={5}
      />,
      <Column
        field="createdDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={4}
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
          <Controller
            control={control}
            rules={{
              required: "",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="CompanyCode">Company Code</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="companyCode"
          />
          <Controller
            control={control}
            rules={{
              required: "",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="CompanyName">Company Name</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="companyName"
          />
          <Controller
            control={control}
            rules={{
              required: "",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputNumber
                      onBlur={onBlur}
                      value={value}
                      onValueChange={(e) => onChange(e.value)}
                      id="PaymentTerm"
                    />
                    <label htmlFor="PaymentTerm">Payment Term</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="paymentTerm"
          />
          <Controller
            control={control}
            rules={{
              required: "",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <Dropdown
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      checkmark={true}
                      highlightOnSelect={false}
                      options={InvoiceCurrencyOptions}
                      optionLabel="label"
                    />
                    <label htmlFor="InvoiceCurrency">Invoice Currency</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="invoiceCurrency"
          />
          <Controller
            control={control}
            rules={{
              required: "",
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="Description">Description</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="description"
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
