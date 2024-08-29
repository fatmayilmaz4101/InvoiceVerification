import { useEffect, useState } from "react";
import PopUp from "../pop-up/page";
import { FormField } from "../form-field/page";
import { UnitOptions } from "@/app/enums/UnitEnum";
import { Button } from "primereact/button";
import {
  ArticleListType,
  CompanyListType,
  CompanyPriceListType,
} from "@/types/service";
import { useForm } from "react-hook-form";
import { getArticleById } from "@/app/services/ArticleListService";
import { getCompanyById } from "@/app/services/CompanyListService";
import { getCompanyPriceById } from "@/app/services/CompanyPriceListService";

export const EditColumn = (dataId: number) => {
  const [currentArticle, setCurrentArticle] = useState<ArticleListType>();
  const [currentCompany, setCurrentCompany] = useState<CompanyListType>();
  const [currentCompanyPrice, setCurrentCompanyPrice] =
    useState<CompanyPriceListType>();
  const [showArticlePopup, setShowArticlePopup] = useState(false);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [showCompanyPricePopup, setShowCompanyPricePopup] = useState(false);

  const { control, handleSubmit, reset } = useForm<ArticleListType>({});
  const currentPath = window.location.pathname;

  useEffect(() => {
    // Fetch data based on current path
    const fetchData = async () => {
      switch (currentPath) {
        case "/pages/screens/article-list":
          await getArticle();
          break;
        case "/pages/screens/company-list":
          await getCompany();
          break;
        case "/pages/screens/company-price-list":
          await getCompanyPrice();
          break;
        default:
          break;
      }
    };
    fetchData();
  }, [currentPath]);

  const getArticle = async () => {
    try {
      const article = await getArticleById(dataId);
      reset(article);
      setCurrentArticle(article);
    } catch (error) {
      console.error("Failed to fetch article:", error);
    }
  };

  const getCompany = async () => {
    try {
      const company = await getCompanyById(dataId);
      reset(company);
      setCurrentCompany(company);
    } catch (error) {
      console.error("Failed to fetch company:", error);
    }
  };

  const getCompanyPrice = async () => {
    try {
      const companyPrice = await getCompanyPriceById(dataId);
      reset(companyPrice);
      setCurrentCompanyPrice(companyPrice);
    } catch (error) {
      console.error("Failed to fetch company price:", error);
    }
  };

  const articleUpdate = () => (
    <PopUp show={showArticlePopup} onClose={() => setShowArticlePopup(false)}>
      <h2 className="text-center">Update Article</h2>
      <div className="p-fluid formgrid grid gap-4">
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
        <div className="flex justify-center items-center">
          <Button onClick={handleSubmit(onSubmit)}>Update</Button>
        </div>
      </div>
    </PopUp>
  );

  const companyUpdate = () => (
    <PopUp show={showCompanyPopup} onClose={() => setShowCompanyPopup(false)}>
      <h2 className="text-center">Update Company</h2>
    </PopUp>
  );

  const companyPriceUpdate = () => (
    <PopUp
      show={showCompanyPricePopup}
      onClose={() => setShowCompanyPricePopup(false)}
    >
      <h2 className="text-center">Update Company Price</h2>
    </PopUp>
  );

  const onSubmit = async (data: ArticleListType) => {
    // Handle form submission
  };

  const handleClick = () => {
    console.log("Row ID:", dataId);
    switch (currentPath) {
      case "/pages/screens/article-list":
        setShowArticlePopup(true);
        break;
      case "/pages/screens/company-list":
        setShowCompanyPopup(true);
        break;
      case "/pages/screens/company-price-list":
        setShowCompanyPricePopup(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <i
        onClick={handleClick}
        className="pi pi-pen-to-square"
        style={{ cursor: "pointer" }}
      ></i>
      {showArticlePopup && articleUpdate()}
      {showCompanyPopup && companyUpdate()}
      {showCompanyPricePopup && companyPriceUpdate()}
    </>
  );
};
