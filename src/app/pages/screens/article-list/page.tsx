"use client";
import { Button } from "primereact/button";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseArticleList } from "@/app/hooks/UseArticleList";
import { Controller, useForm } from "react-hook-form";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import PopUp from "../../components/pop-up/page";
import { UnitOptions } from "@/app/enums/UnitEnum";
import { ArticleListType } from "@/types/service";
import { postArticleList } from "@/app/services/ArticleListService";
import { DataTablePageEvent } from "primereact/datatable";
import { Toast } from "primereact/toast";

const ArticleList = () => {
  const toast = useRef<Toast>(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = UseArticleList(page);
  const ArticleLists = useMemo(() => {
    return data?.articleLists || [];
  }, [data]);
  const TotalCount = data?.totalCount || 0;
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      articleNo: "",
      articleName: "",
      unit: "",
      description: "",
    },
  });
  useEffect(() => {
    refetch();
  }, [page, ArticleLists, refetch]);

  const onSubmit = async (data: ArticleListType) => {
    const newData = {
      ...data,
      createdDate: new Date(),
    };
    try {
      await postArticleList(newData);
      refetch();
      showSuccess();
      setShowPopup(false);
    } catch (error) {
      showError();
    }
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
        field="articleNo"
        header="Article No"
        style={{ minWidth: "12rem" }}
        key={1}
      />,
      <Column
        field="articleName"
        header="Article Name"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="unit"
        header="Unit"
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
  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} />
      <GenericDataTable
        value={ArticleLists}
        header={header}
        onPage={onPage}
        totalRecords={TotalCount}
        loading={isLoading}
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
            name="articleNo"
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
            name="articleName"
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
            name="unit"
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
export default ArticleList;
