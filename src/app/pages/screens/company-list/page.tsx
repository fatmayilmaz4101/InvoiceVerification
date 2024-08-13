"use client";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import PopUp from "../../components/pop-up/page";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Controller, useForm } from "react-hook-form";
import { UseCompanyLists } from "@/app/hooks/useCompanyLists";
import { postCompanyList } from "@/app/services/CompanyListService";
import { Dropdown } from "primereact/dropdown";
import {
  InvoiceCurrency,
  InvoiceCurrencyOptions,
} from "@/app/enums/InvoiceUnitEnum";
import { CompanyListType } from "@/types/service";
import { Currency, CurrencyOptions } from "@/app/enums/CurrencyEnum";

const CompanyList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: companies = [], isLoading, error, refetch } = UseCompanyLists();
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      CompanyCode: "",
      CompanyName: "",
      PaymentTerm: Currency.TRY,
      InvoiceCurrency: InvoiceCurrency.DovizFaturaAlisKuru,
      Description: "",
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button onClick={togglePopup} label="Add" raised />
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
        field="PaymentTerm"
        header="Payment Term"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="InvoiceCurrency"
        header="Invoice Currency"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="Description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={5}
      />,
      <Column
        field="CreatedDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={4}
      />,
    ];
  };
  const header = renderHeader();
  const onSubmit = async (data: CompanyListType) => {
    const newData = {
      ...data,
      CreatedDate: new Date().toUTCString(),
    };
    postCompanyList(newData);
  };
  return (
    <>
      <GenericDataTable
        value={companies}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Firma Ekle</h2>
        <div className="p-fluid formgrid grid">
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="CompanyCode">Company Account Code</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="CompanyCode"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="CompanyName">Company Account Name</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="CompanyName"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12">
                <span className="p-float-label">
                  <FloatLabel>
                    <Dropdown
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      checkmark={true}
                      highlightOnSelect={false}
                      options={CurrencyOptions}
                      optionLabel="label"
                    />
                    <label htmlFor="PaymentTerm">Payment Term</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="PaymentTerm"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12">
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
                    <label htmlFor="InvoiceCurrency">Invoice Unit</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="InvoiceCurrency"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12">
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
            name="Description"
          />
          <div className="flex justify-center items-center">
            <Button onClick={handleSubmit(onSubmit)} outlined>
              Ekle
            </Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};
export default CompanyList;
