"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { UseCompanyPriceLists } from "@/app/hooks/UseCompanyPriceList";
import { FloatLabel } from "primereact/floatlabel";
import PopUp from "../../components/pop-up/page";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { UnitOptions } from "@/app/enums/UnitEnum";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Country } from "@/types/service";
import { InputNumber } from "primereact/inputnumber";
import { postCompanyPriceList } from "@/app/services/CompanyPriceListService";

const CompanyPriceList = () => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]); //Serverdan gelen datalar

  const [loading, setLoading] = useState(true);
  const {
    data: companyPrices = [],
    isLoading,
    error,
    refetch,
  } = UseCompanyPriceLists();
  const [showPopup, setShowPopup] = useState(false);
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
      ArticleNo: "",
      ArticleName: "",
      Unit: "",
      UnitPrice: 0,
      Currency: "",
      Description: "",
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);
  const searchCountry = (event: AutoCompleteCompleteEvent) => {
    const filtered = [];
    const query = event.query;
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    setFilteredCountries(filtered);
  };

  const renderHeader = () => {
    return (
      <div className="flex ">
        <Button label="Import" raised />
        <Button
          style={{ marginLeft: 5 }}
          label="Add"
          raised
          onClick={togglePopup}
        />
      </div>
    );
  };
  const onSubmit = async (data: any) => {
    const newData = {
      ...data,
      CreatedDate: new Date().toUTCString(),
    };
    console.log(newData);
    postCompanyPriceList(newData);
  };

  const Columns = () => {
    return [
      <Column
        field="CompanyList.CompanyCode"
        header="Company Code"
        style={{ minWidth: "10rem" }}
        key={1}
      />,

      <Column
        field="CompanyList.CompanyName"
        header="Company Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="ArticleList.ArticleNo"
        header="Article No"
        filterField="country.name"
        style={{ minWidth: "12rem" }}
        key={3}
      />,
      <Column
        field="ArticleList.ArticleName"
        header="Article Name"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="CompanyPriceList.UnitPrice"
        header="Unit Price"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,
      <Column
        field="ArticleList.Unit"
        header="Unit"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="CompanyPriceList.Currency"
        header="Currency"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="CompanyPriceList.Description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={6}
      />,
      <Column
        field="CompanyPriceList.CreatedDate"
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
        value={companyPrices}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Add Company Price</h2>
        <div className="p-fluid formgrid grid gap-4">
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <AutoComplete
                    id="autocomplete"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    suggestions={filteredCountries}
                    completeMethod={searchCountry}
                  ></AutoComplete>
                  <label htmlFor="CompanyCode">Company Code</label>
                </span>
              </div>
            )}
            name="CompanyCode"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <AutoComplete
                    id="autocomplete"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    suggestions={filteredCountries}
                    completeMethod={searchCountry}
                  ></AutoComplete>
                  <label htmlFor="CompanyName">Company Name</label>
                </span>
              </div>
            )}
            name="CompanyName"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <AutoComplete
                    id="autocomplete"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    suggestions={filteredCountries}
                    completeMethod={searchCountry}
                  ></AutoComplete>
                  <label htmlFor="ArticleNo">Article No</label>
                </span>
              </div>
            )}
            name="ArticleNo"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <AutoComplete
                    id="autocomplete"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    suggestions={filteredCountries}
                    completeMethod={searchCountry}
                  ></AutoComplete>
                  <label htmlFor="ArticleName">Article Name</label>
                </span>
              </div>
            )}
            name="ArticleName"
          />

          <Controller
            control={control}
            rules={{}}
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
                      options={UnitOptions}
                      optionLabel="label"
                    />
                    <label htmlFor="Unit">Unit</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="Unit"
          />
          <Controller
            control={control}
            rules={{}}
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
                    <label htmlFor="UnitPrice">Unit Price</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="UnitPrice"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onBlur, onChange, value } }) => (
              <div className="field col-12 mb-1">
                <span className="p-float-label">
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="Currency">Currency</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="Currency"
          />
          <Controller
            control={control}
            rules={{}}
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
            name="Description"
          />
          <div className="flex justify-center items-center">
            <Button onClick={handleSubmit(onSubmit)}>Add</Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default CompanyPriceList;
