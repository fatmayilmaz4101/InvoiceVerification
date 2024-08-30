import { useEffect, useState } from "react";
import PopUp from "../pop-up/page";
import { FormField } from "../form-field/page";
import { UnitOptions } from "@/app/enums/UnitEnum";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InvoiceCurrencyOptions } from "@/app/enums/InvoiceCurrencyEnum";
import { getArticleById } from "@/app/services/ArticleListService";
import { getCompanyById } from "@/app/services/CompanyListService";
import { getCompanyPriceById } from "@/app/services/CompanyPriceListService";
import { CurrencyOptions } from "@/app/enums/CurrencyEnum";
import { CompanyPriceListType, UpdateType } from "@/types/service";

export const EditColumn = (dataId: number) => {
  const [currentData, setCurrentData] = useState<any>({});
  const [showPopup, setShowPopup] = useState(false);
  const { control, handleSubmit, reset } = useForm<any>({});
  const currentPath = window.location.pathname;
  useEffect(() => {
    reset(currentData);
  }, [currentData, reset]);

  useEffect(() => {
    const fetchData = async () => {
      let data: UpdateType;
      switch (currentPath) {
        case "/pages/screens/article-list":
          data = await getArticleById(dataId);
          break;
        case "/pages/screens/company-list":
          data = await getCompanyById(dataId);
          break;
        case "/pages/screens/company-price-list":
          data = await getCompanyPriceById(dataId);
          data.currency = CurrencyOptions.find(
            (option) => option.label === data.currency
          )?.value;
          break;
        default:
          return;
      }
      setCurrentData(data);
    };
    fetchData();
  }, [currentPath, dataId]);

  const renderFormFields = () => {
    switch (currentPath) {
      case "/pages/screens/article-list":
        return (
          <>
            <FormField
              type="text"
              control={control}
              required="Article No field is required"
              name="articleNo"
              label="Article No"
            />
            <FormField
              type="text"
              control={control}
              required="Article Name field is required"
              name="articleName"
              label="Article Name"
            />
            <FormField
              type="dropdown"
              control={control}
              required="Unit field is required"
              options={UnitOptions}
              name="unit"
              label="Unit"
            />
            <FormField
              type="text"
              control={control}
              name="minPrice"
              label="Min Price"
            />
            <FormField
              type="text"
              control={control}
              name="maxPrice"
              label="Max Price"
            />
            <FormField type="text" control={control} name="cost" label="Cost" />
            <FormField
              type="text"
              control={control}
              name="description"
              label="Description"
            />
          </>
        );
      case "/pages/screens/company-list":
        return (
          <>
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
          </>
        );
      case "/pages/screens/company-price-list":
        return (
          <>
            <FormField
              type="autocomplete"
              control={control}
              required="Company Code field is required"
              name="companyCode"
              label="Company Code"
            />
            <FormField
              type="autocomplete"
              control={control}
              required="Article No field is required"
              name="articleNo"
              label="Article No"
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
          </>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: any) => {};

  const handleClick = () => {
    console.log("currentData: ", currentData);
    setShowPopup(true);
  };

  return (
    <>
      <i
        onClick={handleClick}
        className="pi pi-pen-to-square"
        style={{ cursor: "pointer" }}
      ></i>
      <PopUp show={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="text-center">
          {currentPath.includes("article-list")
            ? "Update Article"
            : currentPath.includes("company-list")
            ? "Update Company"
            : "Update Company Price"}
        </h2>
        <div className="p-fluid formgrid grid gap-4">{renderFormFields()}</div>
        <div className="flex justify-center items-center">
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </PopUp>
    </>
  );
};
