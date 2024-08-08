"use client";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import GenericDataTable from "../../components/table/page";
import { Column } from "primereact/column";
import { CompanyDefinitionService } from "@/app/services/CompanyDefinitionService";

const CompanyDefinition = () => {
  const [companyDefinition, setCompanyDefinition] = useState<
    Services.CompanyDefinition[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CompanyDefinitionService.getCompanyDefinition().then((data) =>
      setCompanyDefinition(data)
    );
    setLoading(false);
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button label="İçeri aktar" raised />
      </div>
    );
  };
  const Columns = () => {
    return [
      <Column
        field="firma_cari_kodu"
        header="Firma Cari Kodu"
        dataType="numeric"
        style={{ minWidth: "10rem" }}
        key={1}
      />,
      <Column
        field="firma_cari_adi"
        header="Firma Cari Adı"
        style={{ minWidth: "12rem" }}
        key={2}
      />,
      <Column
        field="vade"
        header="Vade"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="fatura_birimi"
        header="Fatura Birimi"
        style={{ minWidth: "14rem" }}
        key={3}
      />,
      <Column
        field="tarih"
        header="Tarih"
        dataType="date"
        style={{ minWidth: "10rem" }}
        key={4}
      />,
      <Column
        field="aciklama"
        header="Açıklama"
        style={{ minWidth: "14rem" }}
        key={5}
      />,
    ];
  };
  const header = renderHeader();

  return (
    <>
      <GenericDataTable
        value={companyDefinition}
        header={header}
        loading={loading}
        ColumnArray={() => Columns()}
      ></GenericDataTable>
    </>
  );
};
export default CompanyDefinition;
