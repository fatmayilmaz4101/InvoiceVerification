import {
  DataTable,
  DataTableHeaderTemplateType,
  DataTableValueArray,
} from "primereact/datatable";

interface DataTableType {
  value: DataTableValueArray;
  header: DataTableHeaderTemplateType<DataTableValueArray>;
  loading: boolean;
  ColumnArray: () => React.JSX.Element[];
}
const GenericDataTable = ({
  value,
  header,
  loading,
  ColumnArray,
}: DataTableType) => {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <DataTable
            size="small"
            value={value}
            paginator
            header={header}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            dataKey="id"
            loading={loading}
            emptyMessage="No datas found."
          >
            {ColumnArray()}
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default GenericDataTable;
