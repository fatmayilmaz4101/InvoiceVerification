"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import React, { useMemo, useRef, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { UseCompanyPriceLists } from "@/app/hooks/UseCompanyPriceList";
import PopUp from "../../components/pop-up/page";
import { useForm } from "react-hook-form";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { postCompanyPriceList } from "@/app/services/CompanyPriceListService";
import { DataTablePageEvent } from "primereact/datatable";
import {
  CompanyPriceListType,
  FormCompanyPriceListType,
} from "@/types/service";
import { getCompanyLists } from "@/app/services/CompanyListService";
import { getArticleLists } from "@/app/services/ArticleListService";
import { Toast } from "primereact/toast";
import { CurrencyOptions } from "@/app/enums/CurrencyEnum";
import { FileUpload } from "primereact/fileupload";
import { FormField } from "../../components/form-field/page";

type CompanyType = {
  id: number | undefined;
  companyCode: string;
};
type ArticleType = {
  id: number | undefined;
  articleNo: string;
};
const CompanyPriceList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = UseCompanyPriceLists(page);
  const CompanyPriceLists = useMemo(() => {
    return data?.companyPriceLists || [];
  }, [data]);
  const TotalCount = data?.totalCount || 0;

  const [filteredCompanyList, setFilteredCompanyList] =
    useState<CompanyType[]>();
  const [filteredArticleNo, setFilteredArticleNo] = useState<ArticleType[]>([]);
  const [articleNo, setArticleNo] = useState<ArticleType>();
  const [companyCode, setCompanyCode] = useState<CompanyType>();
  const [showPopup, setShowPopup] = useState(false);
  const toast = useRef<Toast>(null);
  const { control, handleSubmit } = useForm<FormCompanyPriceListType>();

  const onPage = (event: DataTablePageEvent) => {
    const currentPage = event.page !== undefined ? event.page + 1 : 1;
    setPage(currentPage);
    refetch();
  };

  const searchCompanyCode = async (event: AutoCompleteCompleteEvent) => {
    try {
      const query = event.query;
      const response = await getCompanyLists(page, query);
      const companies = response.companyLists.map((company) => {
        var companyInfo = {
          id: company.id,
          companyCode: company.companyCode,
        };
        return companyInfo;
      });
      setFilteredCompanyList(companies);
    } catch (error) {
      console.error("Filter company code error:", error);
    }
  };
  const searchArticleNo = async (event: AutoCompleteCompleteEvent) => {
    try {
      const query = event.query;
      const response = await getArticleLists(page, query);
      const articles = response.articleLists.map((article) => {
        var articleInfo = {
          id: article.id,
          articleNo: article.articleNo,
        };
        return articleInfo;
      });
      setFilteredArticleNo(articles);
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
      console.log(newData);
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
        key={5}
      />,
      <Column
        field="articleList.unit"
        header="Unit"
        style={{ minWidth: "14rem" }}
        key={6}
      />,
      <Column
        field="companyPriceList.currency"
        header="Currency"
        style={{ minWidth: "14rem" }}
        key={7}
      />,
      <Column
        field="articleList.minPrice"
        header="Min Price"
        style={{ minWidth: "14rem" }}
        key={8}
      />,
      <Column
        field="articleList.maxPrice"
        header="Max Price"
        style={{ minWidth: "14rem" }}
        key={9}
      />,
      <Column
        field="articleList.cost"
        header="Cost"
        style={{ minWidth: "14rem" }}
        key={10}
      />,
      <Column
        field="companyPriceList.createdDate"
        header="Created Date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        body={(rowData) => formatDate(rowData.companyPriceList.createdDate)}
        key={11}
      />,
      <Column
        field="companyPriceList.description"
        header="Description"
        style={{ minWidth: "14rem" }}
        key={12}
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
      />
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Add Company Price</h2>
        <div className="p-fluid formgrid grid gap-4">
          <FormField
            type="autocomplete"
            control={control}
            required="Company Code field is required"
            name="companyCode"
            label="Company Code"
            onChangeComplete={(e) => {
              setCompanyCode(e.value);
            }}
            suggestions={filteredCompanyList}
            completeMethod={searchCompanyCode}
          />
          <FormField
            type="autocomplete"
            control={control}
            required="Article No field is required"
            name="articleNo"
            label="Article No"
            onChangeComplete={(e) => {
              setArticleNo(e.value);
            }}
            suggestions={filteredArticleNo}
            completeMethod={searchArticleNo}
          />
          <FormField
            type="number"
            control={control}
            required="Unit Price field is required"
            name="unitPrice"
            label="Unit Price"
          />
          <FormField
            type="dropdown"
            control={control}
            required="Currency field is required"
            options={CurrencyOptions}
            name="currency"
            label="Currency"
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

export default CompanyPriceList;
