"use client";
import { Button } from "primereact/button";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { ArticleListService } from "@/app/services/ArticleListService";
import { ArticleListType } from "@/types/service";

const ArticleList = () => {
  const [articleList, setArticleList] = useState<ArticleListType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ArticleListService.getArticleList().then((data) => setArticleList(data));
    setLoading(false);
  }, []);

  // const formatDate = (value: Date) => {
  //   return value.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button label="Add" raised />
      </div>
    );
  };
  const Columns = () => {
    return [
      <Column
        field="ArticleNo"
        header="Article No"
        style={{ minWidth: "12rem" }}
        key={1}
      />,
      <Column
        field="ArticleName"
        header="Article Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="Unit"
        header="Unit"
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

  return (
    <>
      <GenericDataTable
        value={articleList}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
    </>
  );
};
export default ArticleList;
