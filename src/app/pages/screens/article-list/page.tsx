"use client";
import { Button } from "primereact/button";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { UseArticleList } from "@/app/hooks/UseArticleList";
import { Controller, useForm } from "react-hook-form";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import PopUp from "../../components/pop-up/page";
import { UnitOptions } from "@/app/enums/UnitEnum";
import { ArticleListType } from "@/types/service";
import { postArticleList } from "@/app/services/ArticleListService";

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const { data: articles = [], isLoading } = UseArticleList();
  useEffect(() => {
    setLoading(false);
  }, []);
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
      ArticleNo: "",
      ArticleName: "",
      Unit: "",
      Description: "",
    },
  });
  const onSubmit = async (data: ArticleListType) => {
    const newData = {
      ...data,
      CreatedDate: new Date().toUTCString(),
    };
    console.log(newData);
    postArticleList(newData)
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button label="Add" raised onClick={togglePopup} />
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
        value={articles}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Add Article</h2>
        <div className="p-fluid formgrid grid gap-4">
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
                    <label htmlFor="ArticleNo">Article No</label>
                  </FloatLabel>
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
                  <FloatLabel>
                    <InputText
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <label htmlFor="ArticleName">Article Name</label>
                  </FloatLabel>
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
export default ArticleList;
