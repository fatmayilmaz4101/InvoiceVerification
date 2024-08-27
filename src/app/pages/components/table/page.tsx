import {
  DataTable,
  DataTableHeaderTemplateType,
  DataTablePageEvent,
  DataTableValueArray,
} from "primereact/datatable";
interface DataTableType {
  value: DataTableValueArray;
  header: DataTableHeaderTemplateType<DataTableValueArray>;
  loading: boolean;
  ColumnArray: () => React.JSX.Element[];
  onPage: (event: DataTablePageEvent) => void;
  totalRecords: number;
}
const GenericDataTable = ({
  value,
  header,
  loading,
  ColumnArray,
  onPage,
  totalRecords,
}: DataTableType) => {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <DataTable
            lazy
            size="small"
            value={value}
            paginator
            onPage={onPage}
            header={header}
            totalRecords={totalRecords}
            rows={10}
            dataKey="id"
            loading={loading}
            emptyMessage="No datas found."
            pageLinkSize={10}
          >
            {ColumnArray()}
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default GenericDataTable;
