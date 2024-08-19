"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import React, { useMemo, useRef, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { UseCompanyPriceLists } from "@/app/hooks/UseCompanyPriceList";
import { FloatLabel } from "primereact/floatlabel";
import PopUp from "../../components/pop-up/page";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { postCompanyPriceList } from "@/app/services/CompanyPriceListService";
import { DataTablePageEvent } from "primereact/datatable";
import {
  CompanyPriceListType,
  FormCompanyPriceListType,
} from "@/types/service";
import { getCompanyLists } from "@/app/services/CompanyListService";
import { getArticleLists } from "@/app/services/ArticleListService";
import { Toast } from "primereact/toast";
import { Currency } from "@/app/enums/CurrencyEnum";
import { FileUpload } from "primereact/fileupload";

type CompanyType = {
  id: number | undefined;
  companyCode: string;
};
type ArticleNoType = {
  id: number | undefined;
  articleNo: string;
};
const CompanyPriceList = () => {
  const toast = useRef<Toast>(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = UseCompanyPriceLists(page);
  const CompanyPriceLists = useMemo(() => {
    return data?.companyPriceLists || [];
  }, [data]);
  const TotalCount = data?.totalCount || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [filteredCompanyList, setFilteredCompanyList] =
    useState<CompanyType[]>();
  const [companyCode, setCompanyCode] = useState<CompanyType>();

  const [filteredArticleNo, setFilteredArticleNo] = useState<ArticleNoType[]>(
    []
  );
  const [articleNo, setArticleNo] = useState<ArticleNoType>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      companyCode: "",
      articleNo: "",
      unitPrice: 0,
      currency: Currency.TRY,
      description: "",
    },
  });
  const onPage = (event: DataTablePageEvent) => {
    const currentPage = event.page !== undefined ? event.page + 1 : 1;
    setPage(currentPage);
    refetch();
  };

  const searchCompanyCode = async (event: AutoCompleteCompleteEvent) => {
    try {
      const query = event.query;
      const response = await getCompanyLists(page, query);
      const companyCodes = response.companyLists.map((company) => {
        var companyCode = {
          id: company.id,
          companyCode: company.companyCode,
        };
        return companyCode;
      });
      setFilteredCompanyList(companyCodes);
    } catch (error) {
      console.error("Filter company code error:", error);
    }
  };
  const searchArticleNo = async (event: AutoCompleteCompleteEvent) => {
    try {
      const query = event.query;
      const response = await getArticleLists(page, query);
      const allArticleNo = response.articleLists.map((article) => {
        var articleNo = {
          id: article.id,
          articleNo: article.articleNo,
        };
        return articleNo;
      });
      setFilteredArticleNo(allArticleNo);
    } catch (error) {
      console.error("Filter Article no error:", error);
    }
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
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
      detail: "There was a problem adding the company price",
      life: 3000,
    });
  };
  const onUpload = () => {
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
    refetch();
  };
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const renderHeader = () => {
    return (
      <div className="flex ">
        <FileUpload
          mode="basic"
          name="file"
          url="http://localhost:5027/api/PriceListMapping/upload"
          accept=".xlsx"
          //maxFileSize={1000000}
          onUpload={onUpload}
          auto
          chooseLabel="Upload"
        />

        <Button
          style={{ marginLeft: 5 }}
          label="Add"
          raised
          onClick={togglePopup}
        />
      </div>
    );
  };
  const onSubmit = async (data: FormCompanyPriceListType) => {
    const newData: CompanyPriceListType = {
      ...data,
      createdDate: new Date(),
      companyId: companyCode?.id ?? 0,
      articleId: articleNo?.id ?? 0,
      companyCode: companyCode?.companyCode ?? "",
      articleNo: articleNo?.articleNo ?? "",
    };
    try {
      await postCompanyPriceList(newData);
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
        field="companyList.companyCode"
        header="Company Code"
        style={{ minWidth: "10rem" }}
        key={1}
      />,

      <Column
        field="companyList.companyName"
        header="Company Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="articleList.articleNo"
        header="Article No"
        filterField="country.name"
        style={{ minWidth: "12rem" }}
        key={3}
      />,
      <Column
        field="articleList.articleName"
        header="Article Name"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="companyPriceList.unitPrice"
        header="Unit Price"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,
      <Column
        field="articleList.unit"
        header="Unit"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="companyPriceList.currency"
        header="Currency"
        style={{ minWidth: "14rem" }}
        key={4}
      />,
      <Column
        field="companyPriceList.createdDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        body={(rowData) => formatDate(rowData.companyPriceList.createdDate)}
        key={5}
      />,
      <Column
        field="companyPriceList.description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={6}
      />,
    ];
  };
  const header = renderHeader();
  return (
    <>
      <Toast ref={toast} />
      <GenericDataTable
        value={CompanyPriceLists}
        header={header}
        loading={isLoading}
        onPage={onPage}
        totalRecords={TotalCount}
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
                    onChange={(e) => {
                      onChange(e.value);
                      setCompanyCode(e.value);
                    }}
                    suggestions={filteredCompanyList}
                    completeMethod={searchCompanyCode}
                    field="companyCode"
                  ></AutoComplete>
                  <label htmlFor="CompanyCode">Company Code</label>
                </span>
              </div>
            )}
            name="companyCode"
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
                    onChange={(e) => {
                      onChange(e.value);
                      setArticleNo(e.value);
                    }}
                    suggestions={filteredArticleNo}
                    completeMethod={searchArticleNo}
                    field="articleNo"
                  ></AutoComplete>
                  <label htmlFor="ArticleNo">Article No</label>
                </span>
              </div>
            )}
            name="articleNo"
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
            name="unitPrice"
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
                      onValueChange={(e) => onChange(e.value)}
                      value={value}
                    />
                    <label htmlFor="Currency">Currency</label>
                  </FloatLabel>
                </span>
              </div>
            )}
            name="currency"
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

export default CompanyPriceList;
